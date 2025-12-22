import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const KakaoMap = ({ schoolRing = [], onSelect }) => {

    const [features, setFeatures] = useState([]);
    const [internalEdges, setInternalEdges] = useState([]);
    const [outerEdges, setOuterEdges] = useState([]);
    const [selected, setSelected] = useState(null);
    // const [schoolRings, setSchoolRings] = useState([]);
    const mapRef = useRef(null);

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url} 불러오기 실패: ${res.status}`);
        return res.json();
    }


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

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res = await fetch('/data/school_lat_lng.json');
    //             if (!res.ok) throw new Error(`학교 좌표를 찾을 수 없습니다 : ${res.status}`);
    //             const datas = await res.json();
    //             if (Array.isArray(datas)) {
    //                 setSchoolRings(
    //                     datas
    //                         .filter(data => typeof data.lat === 'number' && typeof data.lng === 'number')
    //                         .map(data => ({ title: data.title ?? '학교', lat: data.lat, lng: data.lng }))
    //                 );
    //             } else {
    //                 console.error(`학교 좌표는 JSON 배열이어야 합니다. 현재 : ${datas} `)
    //             }

    //         } catch (e) {
    //             console.error(e)
    //         }
    //     })();
    // }, [])

    const center = useMemo(() => {
        const all = features.flatMap((f) => Array.isArray(f?.ring) ? f.ring : []);
        if (!all.length) return { lat: 37.5665, lng: 126.9780 };
        const lat = all.reduce((s, p) => s + p.lat, 0) / (all.length || 1);
        const lng = all.reduce((s, p) => s + p.lng, 0) / (all.length || 1);
        return { lat: lat || 37.5665, lng: lng || 126.9780 };
    }, [features]);

    const onMapCreate = (map) => {
        mapRef.current = map;
        if (!features.length) return;
        const { kakao } = window;
        const bounds = new kakao.maps.LatLngBounds();
        features.forEach(({ ring }) => {
            ring.forEach((p) => bounds.extend(new kakao.maps.LatLng(p.lat, p.lng)));
        });
        map.setBounds(bounds);
        // map.setDraggable(false);
        map.setZoomable(true);
        map.setMinLevel(7);
        map.setMaxLevel(11)
    };

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
            const code = props?.SIG_CD ?? '';
            return typeof code === 'string' && code.slice(0, 2) === '11';
        }),
        [features]
    );
    const gyeonggiGroup = useMemo(
        () => features.filter(({ props }) => {
            const code = props?.SIG_CD ?? '';
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

    console.log("schoolRings", schoolRings.length, schoolRings[0]);
    return (
        <S.MapWrap style={{ width: 494, height: 550 }}>
            <KMap
                center={center}
                style={{ width: '100%', height: '100%' }}
                level={9}
                onCreate={onMapCreate}
            >
                {features.map(({ ring, props }, idx) => {
                    const name = props?.SIG_KOR_NM ?? props?.name ?? `SGG-${idx}`;
                    const code = props?.SIG_CD ?? props?.code ?? '';
                    const seoulColor = String(props?.SIG_CD ?? props?.code ?? '').startsWith('11')
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

                {internalEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-in-${idx}`}
                        path={seg}
                        strokeWeight={1.2}
                        strokeColor='#FFFFFF'
                        strokeOpacity={0.95}
                        zIndex={10}
                    />
                ))}
                {maskHoles.length > 0 && (
                    <Polygon
                        path={[koreaMaskOuterRing, ...maskHoles]}
                        strokeWeight={0}
                        fillColor='#DFE4EA'
                        fillOpacity={1}
                        zIndex={5}
                    />
                )}
                {seoulOuterEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-seoul-${idx}`}
                        path={seg}
                        strokeWeight={3}
                        strokeColor='#C5E4ED'
                        strokeOpacity={1}
                        zIndex={20}
                    />
                ))}
                {ggOuterEdges.map((seg, idx) => (
                    <Polyline
                        key={`edge-gg-${idx}`}
                        path={seg}
                        strokeWeight={3}
                        strokeColor='#C5E4ED'
                        strokeOpacity={1}
                        zIndex={20}
                    />
                ))}
                {schoolRings.map((school, idx) => (
                    <MapMarker
                        key={`school-${idx}`}
                        position={{ lat: school.lat, lng: school.lng }}
                        title={school.title}
                        image={{ src: '/assets/images/pink.png', size: { width: 9, height: 9 } }}
                        onClick={() => {
                            onSelect?.({
                                id: school.raw.id,
                                title: school.title,
                                address: school.raw.schoolAddress,
                                phone: school.raw.schoolPhone,
                                image: school.raw.schoolImagePath,
                                raw: school.raw
                            })
                        }}
                    />
                ))}
            </KMap>
        </S.MapWrap>

    );
};

export default KakaoMap;