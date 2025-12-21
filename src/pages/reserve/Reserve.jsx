import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import S from "./style";

/**
 * 예약 페이지 데이터 조회
 * @returns ApiResponseDTO<SchoolReservePageResponseDTO>
 */
const fetchReservePage = async ({ queryKey }) => {
  const [, schoolId, type] = queryKey;

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/public/schools/${schoolId}/${type}`
  );

  if (!res.ok) {
    throw new Error("예약 페이지 조회 실패");
  }

  return res.json();
};

const Reserve = () => {
  const schoolId = 1;
  const type = "place"; // "parking" 가능

  const [selectedDate, setSelectedDate] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservePage", schoolId, type],
    queryFn: fetchReservePage,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const reserveData = data.data;

  return (
    <S.Page>
      <S.Container>
        <S.ContentRow>
          <LeftPanel
            data={reserveData}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          <RightPanel
            data={reserveData}
            type={type}
            selectedDate={selectedDate}
          />
        </S.ContentRow>

        <S.MapSection />
      </S.Container>
    </S.Page>
  );
};

export default Reserve;
