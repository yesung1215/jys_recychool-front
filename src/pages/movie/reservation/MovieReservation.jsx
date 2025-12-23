import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ;

const formatKoreanDate = (dateValue) => {
  if (!dateValue) return "-";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return String(dateValue);

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function MovieReservation() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user?.currentUser);
  const userId = currentUser?.id;
  const userName = currentUser?.userName;

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMyReservation = async () => {
    if (!userId) {
      setReservation(null);
      setError("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/reservations/my/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("서버 응답이 JSON이 아닙니다.");
      }

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "내 예약 조회 실패");

      const list = Array.isArray(json?.data) ? json.data : [];
      setReservation(list.length > 0 ? list[0] : null);
    } catch (e) {
      setReservation(null);
      setError(e?.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReservation();
  }, [userId]);

  const handleCancel = async () => {
    if (!reservation?.id) return;

    const ok = window.confirm("예약을 취소할까요?");
    if (!ok) return;

    try {
      const res = await fetch(`${BACKEND_URL}/reservations/${reservation.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("예약이 취소되었습니다.");
        fetchMyReservation();
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("예약 취소 실패");
      }

      const json = await res.json();
      throw new Error(json?.message || "예약 취소 실패");
    } catch (e) {
      alert(e?.message || "예약 취소 중 오류가 발생했습니다.");
    }
  };

  const goMain = () => navigate("/");

  return (
      <S.Body>
        <S.CenterWrap>
          <S.Title>영화 예약 정보</S.Title>

          {loading && <S.StateText>로딩중...</S.StateText>}
          {!loading && error && <S.StateText $error>{error}</S.StateText>}

          {!loading && !error && !reservation && (
            <>
              <S.StateText>예약 내역이 없습니다.</S.StateText>
              <S.ButtonRow>
                <S.SecondaryButton type="button" onClick={goMain}>
                  메인으로 이동
                </S.SecondaryButton>
              </S.ButtonRow>
            </>
          )}

          {!loading && !error && reservation && (
            <>
              <S.InfoTable>
                <tbody>
                  <tr>
                    <th>예약자</th>
                    <td>{userName || reservation.user?.userName || "-"}</td>
                  </tr>
                  <tr>
                    <th>예약일자</th>
                    <td>{formatKoreanDate(reservation.movieReservationDate)}</td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                    <td>{reservation.school?.schoolName || "-"}</td>
                  </tr>
                  <tr>
                    <th>영화</th>
                    <td>{reservation.movie?.movieTitle || "-"}</td>
                  </tr>
                  <tr>
                    <th>상영시간</th>
                    <td>{reservation.movie?.movieTime || "-"}</td>
                  </tr>
                  <tr>
                    <th>정원</th>
                    <td>{reservation.movie?.moviePeopleAll ?? "-"}</td>
                  </tr>
                </tbody>
              </S.InfoTable>

              <S.ButtonRow>
                <S.PrimaryButton type="button" onClick={handleCancel}>
                  취소하기
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={goMain}>
                  메인으로 이동
                </S.SecondaryButton>
              </S.ButtonRow>
            </>
          )}
        </S.CenterWrap>
      </S.Body>
  );
}
