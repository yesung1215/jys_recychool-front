import React, { useEffect, useState } from 'react';
import S from './style';

const Movie = () => {

  const API = process.env.REACT_APP_BACKEND_URL;


// const res2 = await fetch(`${API}/reservations/count/${selectedSchoolId}`);

  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const [remainingSeats, setRemainingSeats] = useState(null);
  const [countLoading, setCountLoading] = useState(false);

  // 1) 처음 1번: 학교 목록 조회
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${API}/schools`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || '학교 목록 조회 실패');

        const list = Array.isArray(json.data) ? json.data : [];
        setSchools(list);

        if (list.length > 0) setSelectedSchoolId(list[0].id);
        else setSelectedSchoolId(null);
      } catch (e) {
        console.error(e);
        setSchools([]);
        setSelectedSchoolId(null);
      }
    };

    fetchSchools();
  }, []);

  // 2) 학교 선택될 때마다: 잔여좌석 조회
  useEffect(() => {
    if (selectedSchoolId == null) return;

    const fetchRemainingSeats = async () => {
      setCountLoading(true);
      try {
        const res = await fetch(`/reservations/count/${selectedSchoolId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || '좌석 조회 실패');

        setRemainingSeats(Number(json.data));
      } catch (e) {
        console.error(e);
        setRemainingSeats(null);
      } finally {
        setCountLoading(false);
      }
    };

    fetchRemainingSeats();
  }, [selectedSchoolId]);

  return (
    <div>
      <S.MainWrap>
        <S.BannerWrap>
          <S.ContentRow>
            <S.MapPane>
              <img src="/assets/images/school.png" alt="학교 지도" />
            </S.MapPane>

            <S.SidePane>
              <S.InfoCard>
                <S.InfoHeaderWrap>
                  <S.InfoHeaderLeft>
                    <img src="/assets/images/movie-icon.png" alt="영화 아이콘" />
                  </S.InfoHeaderLeft>
                  <S.InfoCardTitleWrap>
                    <p>이번달 영화</p>
                  </S.InfoCardTitleWrap>
                </S.InfoHeaderWrap>

                <S.InfoCardMiddleWrap>
                  <img src="/assets/images/movie1.png" alt="영화 포스터" />
                </S.InfoCardMiddleWrap>

                <S.InfoCardFloorWrap>
                  <S.InfoCardMovie><p>제목</p></S.InfoCardMovie>
                  <S.InfoCardTitle><p>코렐라인</p></S.InfoCardTitle>
                </S.InfoCardFloorWrap>
              </S.InfoCard>

              <S.ReservationCard>
                <S.ReservationTitle><p>행사</p></S.ReservationTitle>

                <S.ReservationRow>
                  <S.ReservationLabel>시간</S.ReservationLabel>
                  <S.ReservationSeat>18:00 ~ 19:41</S.ReservationSeat>
                </S.ReservationRow>

                <S.ReservationRow>
                  <S.ReservationLabel>학교</S.ReservationLabel>
                  <S.ReservationSelect
                    value={selectedSchoolId ?? ''}
                    onChange={(e) => setSelectedSchoolId(Number(e.target.value))}
                    disabled={schools.length === 0}
                  >
                    {schools.length === 0 ? (
                      <option value="">학교 없음</option>
                    ) : (
                      schools.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.schoolName ?? s.name ?? `학교(${s.id})`}
                        </option>
                      ))
                    )}
                  </S.ReservationSelect>
                </S.ReservationRow>

                <S.ReservationRow>
                  <S.ReservationLabel>좌석</S.ReservationLabel>
                  <S.ReservationSeat>
                    {countLoading ? '조회중...' : `${remainingSeats ?? '-'}석`}
                  </S.ReservationSeat>
                </S.ReservationRow>
              </S.ReservationCard>
            </S.SidePane>
          </S.ContentRow>
        </S.BannerWrap>
      </S.MainWrap>
    </div>
  );
};

export default Movie;
