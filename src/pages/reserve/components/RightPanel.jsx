import S from "../style";
import { useNavigate } from "react-router-dom";

// 날짜 포맷 함수
const formatDate = (date) => {
  if (!date) return "-";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const RightPanel = ({ data, type, selectedDate }) => {
  const navigate = useNavigate();
  const apiType = type.toLowerCase();

  const normalizedType = type?.toLowerCase();

  const isPlace = normalizedType === "place";
  const isParking = normalizedType === "parking";

  // 날짜 표시 로직
  const renderDate = () => {
    if (!selectedDate) return "-";

    if (isPlace) {
      // 장소대여: 하루
      return formatDate(selectedDate);
    }

    if (isParking) {
      // 주차: 한 달
      const endDate = new Date(selectedDate);
      endDate.setMonth(endDate.getMonth() + 1);

      return `${formatDate(selectedDate)} ~ ${formatDate(endDate)}`;
    }

    return "-";
  };

  const handleReserve = async () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/schools/${data.schoolId}/${apiType}/reserves`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            startDate: selectedDate.toISOString().slice(0, 10),
          }),
        }
      );

      const text = await res.text();
      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("JSON 파싱 실패:", text);
      }

      if (!res.ok) {
        alert(result.message || "예약에 실패했습니다.");
        return;
      }

      const reserveId = result.data.reserveId;
      navigate(`/payment/${reserveId}`);

    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };


  return (
    <S.RightPanel>
      <S.InfoRow>
        <span>주소</span>
        <p>{data.schoolAddress}</p>
      </S.InfoRow>

      <S.InfoRow>
        <span>면적</span>
        <p>{data.schoolArea}㎡</p>
      </S.InfoRow>

      <S.InfoRow>
        <span>연락처</span>
        <p>{data.schoolPhone}</p>
      </S.InfoRow>

      {isPlace && (
        <S.InfoRow>
          <span>보증금</span>
          <p>{data.deposit.toLocaleString()}원</p>
        </S.InfoRow>
      )}

      {isParking && (
        <S.InfoRow>
          <span>이용료</span>
          <p>30,000원/월</p>
        </S.InfoRow>
      )}

      <S.InfoRow>
        <span>이용 시간</span>
        <p>
          {isPlace && data.usageTime}
          {isParking && "18:00 ~ 08:00 (익일)"}
        </p>
      </S.InfoRow>

      <S.InfoRow $last>
        <span>날짜</span>
        <p>{renderDate()}</p>
      </S.InfoRow>

      <S.ReserveButton onClick={handleReserve}>
        예약하기
      </S.ReserveButton>
    </S.RightPanel>
  );
};

export default RightPanel;
