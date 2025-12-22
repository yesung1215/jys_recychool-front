import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ReserveMap from "./components/ReserveMap";
import S from "./style";

const fetchReservePage = async ({ queryKey }) => {
  const [, schoolId, reserveType] = queryKey;

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/public/schools/${schoolId}/${reserveType.toLowerCase()}`
  );

  if (!res.ok) {
    throw new Error("예약 페이지 조회 실패");
  }

  return res.json();
};

const Reserve = ({ reserveType }) => {
  const { schoolId } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const [coord, setCoord] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservePage", schoolId, reserveType],
    queryFn: fetchReservePage,
  });

  const reserveData = data?.data;

  useEffect(() => {
    if (!reserveData?.schoolName) return;

    fetch("/data/school_lat_lng.json")
      .then((res) => res.json())
      .then((list) => {
        const found = list.find(
          (item) => item.title === reserveData.schoolName
        );

        if (found) {
          setCoord({ lat: found.lat, lng: found.lng });
        }
      });
  }, [reserveData]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

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
            type={reserveType}
            selectedDate={selectedDate}
          />
        </S.ContentRow>

        <S.MapSection>
          {coord && (
            <ReserveMap lat={coord.lat} lng={coord.lng} />
          )}
        </S.MapSection>
      </S.Container>
    </S.Page>
  );
};

export default Reserve;
