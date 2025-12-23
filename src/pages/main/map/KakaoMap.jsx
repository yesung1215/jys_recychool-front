import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map as KMap, MapMarker, Polygon, Polyline } from 'react-kakao-maps-sdk';
import S from './style';
import proj4 from 'proj4';
import { useQueries, useQuery } from '@tanstack/react-query';

proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

const toLatLng = ([x, y]) => {
    const [lng, lat] = proj4('EPSG:5179', 'EPSG:4326', [x, y]);
    return { lat, lng };
};
function parseGeoJSON5179ToRings(geo) {
    const out = [];
    const wrapRing = (ringCoords, props = {}) =>
        ringCoords.map(toLatLng);

    const handleGeom = (geometry, props = {}) => {
        if (!geometry) return;
        const { type, coordinates } = geometry;

        if (type === 'Polygon') {
            const outer = coordinates?.[0] ?? [];
            out.push({ ring: wrapRing(outer, props), props });
        } else if (type === 'MultiPolygon') {
            coordinates?.forEach((poly) => {
                const outer = poly?.[0] ?? [];
                out.push({ ring: wrapRing(outer, props), props });
            });
        }
    };
    if (geo?.type === 'FeatureCollection') {
        geo.features?.forEach((f) => handleGeom(f.geometry, f.properties || {}));
    } else if (geo?.type === 'Feature') {
        handleGeom(geo.geometry, geo.properties || {});
    } else {
        handleGeom(geo, {});
    }
    return out;
}

function buildBoundaryEdges(rings, precision = 6) {
    const fmt = (p) =>
        `${p.lat.toFixed(precision)},${p.lng.toFixed(precision)}`;
    const normKey = (a, b) => {
        const A = fmt(a), B = fmt(b);
        return A < B ? `${A}|${B}` : `${B}|${A}`;
    };

    const edgeMap = new Map();
    rings.forEach(({ ring }) => {
        if (!ring || ring.length < 2) return;
        for (let i = 0; i < ring.length; i++) {
            const p1 = ring[i];
            const p2 = ring[(i + 1) % ring.length];
            const key = normKey(p1, p2);
            const cur = edgeMap.get(key);
            if (cur) {
                cur.count += 1;
            } else {
                edgeMap.set(key, { count: 1, p1, p2 });
            }
        }
    });

    const internalEdges = [];
    const outerEdges = [];
    edgeMap.forEach(({ count, p1, p2 }) => {
        const seg = [p1, p2];
        if (count >= 2) internalEdges.push(seg);
        else outerEdges.push(seg);
    });
    return { internalEdges, outerEdges };
}

const Spinner = () => {
    <div style={{ textAlign: 'center', color: '#666' }}>지도 로딩중...</div>
}

const KakaoMap = ({ schoolRing = [], onSelect }) => {

    const [features, setFeatures] = useState([]);
    const [internalEdges, setInternalEdges] = useState([]);
    const [outerEdges, setOuterEdges] = useState([]);
    const [selected, setSelected] = useState(null);
    const [hoverId, setHoverId] = useState(null);
    const [modal, setModal] = useState('')
    const mapRef = useRef(null);


    const onMapCreate = useCallback((map) => {
        mapRef.current = map;

        try {
            map.setDraggable(true);
            map.setZoomable(true);
            map.setMinLevel(7);
            map.setMaxLevel(11)
        } catch (e) {
            console.warn('맵 생성 에러', e);
        }
    }, []);

    useEffect(() => {
        if(!mapRef.current) return;
        if(!Array.isArray(features) || features.length === 0) return;

        const { kakao } = window;
        const bounds = new kakao.maps.LatLngBounds();
        features.forEach(({ ring }) => {
            ring.forEach((ring) => bounds.extend(new kakao.maps.LatLng(ring.lat, ring.lng)));
        });

        try {
            mapRef.current.setBounds(bounds);
        } catch(e) {
            console.warn('바운딩 실패', e);
        }
    }, [features]);

    const normalSrc = '/assets/images/pink.png';
    const hoverSrc = '/assets/images/blue_marker.png';
    const selectedSrc = '/assets/images/blue_marker.png';

    const iwContent = '<div style="padding:5px;">Hello World!</div>';
    const handleMarkerMouseOver = useCallback((id, e) => {
        e?.stopPropagation?.();
        setHoverId(id);
    }, []);


    const handleMarkerMouseOut = useCallback((e) => {
        e?.stopPropagation?.();
        setHoverId(null);
    }, []);
    const handleMarkerClick = useCallback((school, e) => {
        e?.stopPropagation?.();
        onSelect?.({
            id: school.raw.id,
            title: school.title,
            address: school.raw.schoolAddress,
            phone: school.raw.schoolPhone,
            image: school.raw.schoolImagePath,
            raw: school.raw
        });
        setSelected(prev => (prev?.id === school.raw.id ? null : school.raw));
        
    }, []);
    const getPolygons = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/polygons/find`)
        if (!response.ok) throw new Error("불러오기 실패");
        const polygons = await response.json();
        return polygons
    }

    const { data: polygonData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['polygons'],
        queryFn: getPolygons,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        select: (raw) => {
            if (!raw) return [];

            const parsedGeoJsons = raw.map(item => {
                if (typeof item === 'string') {
                    try {
                        return JSON.parse(item);
                    } catch (e) {
                        console.warn('GeoJSON 파싱 실패', e)
                        return null;
                    }
                }
                return item;
            }).filter(Boolean);
            const allRings = parsedGeoJsons.flatMap(geo => parseGeoJSON5179ToRings(geo));
            return allRings;
        }
    });

    useEffect(() => {
        if (!polygonData || !Array.isArray(polygonData)) {
            setFeatures([]);
            setInternalEdges([]);
            setOuterEdges([]);
            return;
        }
        setFeatures(polygonData);

        const { internalEdges: inEdges, outerEdges: outEdges } = buildBoundaryEdges(polygonData);
        setInternalEdges(inEdges);
        setOuterEdges(outEdges);
    }, [polygonData]);

    const getSchools = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/school/find-all`)
        if (!response.ok) throw new Error("요청 실패");
        const schools = await response.json();
        return schools
    }

    const { data: schoolRings = [], refetch: schoolRefetch } = useQuery({
        queryKey: ['schools'],
        queryFn: getSchools,
        select: (raw) => {

            const arr = Array.isArray(raw?.data) ? raw.data : [];

            return arr
                .map(school => {
                    const latRaw = school.schoolLat ?? school.lat ?? school._Y;
                    const lonRaw = school.schoolLon ?? school.lon ?? school._X;
                    const lat = typeof latRaw === 'number' ? latRaw : (latRaw ? parseFloat(latRaw) : null);
                    const lng = typeof lonRaw === 'number' ? lonRaw : (lonRaw ? parseFloat(lonRaw) : null);
                    return {
                        title: school.schoolName ?? school.폐교명 ?? '학교',
                        lat,
                        lng,
                        raw: school
                    };
                })
                .filter(school => Number.isFinite(school.lat) && Number.isFinite(school.lng));
        },
        staleTime: 1000 * 60 * 5,
        retry: 1
    })

    const center = useMemo(() => {
        const all = features.flatMap((f) => Array.isArray(f?.ring) ? f.ring : []);
        if (!all.length) return { lat: 37.5665, lng: 126.9780 };
        const lat = all.reduce((s, p) => s + p.lat, 0) / (all.length || 1);
        const lng = all.reduce((s, p) => s + p.lng, 0) / (all.length || 1);
        return { lat: lat || 37.5665, lng: lng || 126.9780 };
    }, [features]);

    function buildOuterEdgesForGroup(rings, precision = 6) {
        const fmt = (p) =>
            `${p.lat.toFixed(precision)},${p.lng.toFixed(precision)}`;
        const normKey = (a, b) => {
            const A = fmt(a), B = fmt(b);
            return A < B ? `${A}|${B}` : `${B}|${A}`;
        };
        const edgeMap = new Map();
        rings.forEach(({ ring }) => {
            if (!ring || ring.length < 2) return;
            for (let i = 0; i < ring.length; i++) {
                const p1 = ring[i];
                const p2 = ring[(i + 1) % ring.length];
                const key = normKey(p1, p2);
                const cur = edgeMap.get(key);
                if (cur) cur.count += 1;
                else edgeMap.set(key, { count: 1, p1, p2 });
            }
        });

        const outerEdges = [];
        edgeMap.forEach(({ count, p1, p2 }) => {
            if (count === 1) outerEdges.push([p1, p2]);
        });
        return outerEdges;
    }

    const seoulGroup = useMemo(
        () => features.filter(({ props }) => {
            const code = props?.CTPRVN_CD ?? '';
            return typeof code === 'string' && code.slice(0, 2) === '11';
        }),
        [features]
    );
    const gyeonggiGroup = useMemo(
        () => features.filter(({ props }) => {
            const code = props?.CTPRVN_CD ?? '';
            return typeof code === 'string' && code.slice(0, 2) === '41';
        }),
        [features]
    );

    const seoulOuterEdges = useMemo(
        () => buildOuterEdgesForGroup(seoulGroup, 6),
        [seoulGroup]
    )
    const ggOuterEdges = useMemo(
        () => buildOuterEdgesForGroup(gyeonggiGroup, 6),
        [gyeonggiGroup]
    )

    const koreaMaskOuterRing = [
        { lat: 43.5, lng: 118.0 }, // 북서
        { lat: 43.5, lng: 135.0 }, // 북동
        { lat: 32.0, lng: 135.0 }, // 남동
        { lat: 32.0, lng: 118.0 }, // 남서
    ];

    const maskHoles = useMemo(() => {
        return features.map(({ ring }) => ring);
    }, [features])

    const memoCenter = useMemo(() => center, [center.lat, center.lng]);
    const memoFeatures = useMemo(() => features, [features?.length]);
    const memoSchoolRings = useMemo(() => schoolRings, [schoolRings?.length]);
    const memoInternalEdges = useMemo(() => internalEdges, [internalEdges?.length]);
    const memoMaskHoles = useMemo(() => maskHoles, [maskHoles?.length]);
    const memoKoreaMaskOuterRing = useMemo(() => koreaMaskOuterRing, [koreaMaskOuterRing?.length]);
    const memoSeoulOuterEdges = useMemo(() => seoulOuterEdges, [seoulOuterEdges?.length]);
    const memoGgOuterEdges = useMemo(() => ggOuterEdges, [ggOuterEdges?.length]);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!Array.isArray(memoFeatures) || memoFeatures.length === 0) {
            setReady(false);
            return;
        }

        let raf = null;
        let time = null;

        raf = requestAnimationFrame(() => {
            time = setTimeout(() => setReady(true), 0);
        });

        return () => {
            if (raf) cancelAnimationFrame(raf);
            if (time) clearTimeout(time);
        };
    }, [memoFeatures]);

    if (!ready) {
        return (
            <S.MapWrap style={{ width: 550, height: 550 }}>
                <Spinner />
            </S.MapWrap>
        );
    }

    return (
        <S.MapWrap style={{ width: 550, height: 550 }}>

            <KMap
                center={memoCenter}
                style={{ width: '100%', height: '100%' }}
                level={9}
                onCreate={onMapCreate}
            >
                {memoFeatures.map(({ ring, props }, idx) => {
                    const name = props?.SIG_KOR_NM ?? props?.name ?? `SGG-${idx}`;
                    const code = props?.SIG_CD ?? props?.code ?? '';
                    const seoulColor = String(props?.CTPRVN_CD ?? props?.code ?? '').startsWith('11')
                    return (
                        <Polygon
                            key={`sgg-fill-${idx}`}
                            path={ring}
                            strokeWeight={0.8}
                            strokeColor='#FFFFFF'
                            strokeOpacity={0.9}
                            fillColor={seoulColor ? '#FFEFFA' : '#EFFBEA'}
                            fillOpacity={0.85}
                            onClick={() => setSelected({ name, code, props })}
                        />
                    )
                })}

                {memoInternalEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-in-${idx}`}
                        path={seg}
                        strokeWeight={1.2}
                        strokeColor='#FFFFFF'
                        strokeOpacity={0.95}
                        zIndex={10}
                    />
                ))}
                {memoMaskHoles.length > 0 && (
                    <Polygon
                        path={[memoKoreaMaskOuterRing, ...memoMaskHoles]}
                        strokeWeight={0}
                        fillColor='#DFE4EA'
                        fillOpacity={1}
                        zIndex={5}
                    />
                )}
                {memoSeoulOuterEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-seoul-${idx}`}
                        path={seg}
                        strokeWeight={3}
                        strokeColor='#C5E4ED'
                        strokeOpacity={1}
                        zIndex={20}
                    />
                ))}
                {memoGgOuterEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-gg-${idx}`}
                        path={seg}
                        strokeWeight={3}
                        strokeColor='#C5E4ED'
                        strokeOpacity={1}
                        zIndex={20}
                    />
                ))}
                {memoSchoolRings.map((school, idx) => {
                    const id = school.raw?.id ?? `school-${idx}`;
                    const isSelected = selected?.id === id;
                    const isHovered = hoverId === id;
                    const size = isSelected ? 16 : isHovered ? 14 : 12;
                    const src = isSelected ? selectedSrc : isHovered ? hoverSrc : normalSrc;

                    const image = { src, size: { width: size, height: size } };

                    return (
                        <MapMarker
                            key={`school-${idx}`}
                            position={{ lat: school.lat, lng: school.lng }}
                            title={school.title}
                            image={image}
                            onMouseOver={(e) => handleMarkerMouseOver(id, e)}
                            onMouseOut={(e) => handleMarkerMouseOut(id, e)}
                            onClick={(e) => handleMarkerClick(school, e)}
                        />
                    )
                }

                )}
            </KMap>
        </S.MapWrap>

    );
};

export default KakaoMap;