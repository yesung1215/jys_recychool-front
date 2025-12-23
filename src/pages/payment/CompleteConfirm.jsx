import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import S from "./style";


const formatKoreanDate = (yyyyMMdd) => {
  if (!yyyyMMdd) return "-";
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
};

const formatRange = (start, end) => {
  if (!start) return "-";
  if (!end) return formatKoreanDate(start);
  return `${formatKoreanDate(start)} - ${formatKoreanDate(end)}`;
};

const CompleteConfirm = () => {
  const navigate = useNavigate();
  const { reserveId } = useParams();


  const data = useMemo(() => {
    const isParking = Number(reserveId) % 2 === 0;

    if (isParking) {
      return {
        reserveType: "PARKING",
        reserverName: "홍길동",
        schoolName: "강천초겸은분교장",
        startDate: "2025-01-01",
        endDate: "2025-02-01",
        price: 50000,
        statusText: "결제 완료",
      };
    }

    return {
      reserveType: "PLACE",
      reserverName: "홍길동",
      schoolName: "강천초겸은분교장",
      startDate: "2025-05-05",
      endDate: null,
      price: 50000,
      statusText: "결제 완료",
    };
  }, [reserveId]);

  const isParking = data.reserveType === "PARKING";

  const title = isParking ? "주차 예약 내역" : "장소 대여 예약 내역";
  const dateText = isParking
    ? formatRange(data.startDate, data.endDate)
    : formatKoreanDate(data.startDate);

  const leftButtonText = isParking ? "이용 내역 보러가기" : "예약 내역 보러가기";
// data 
//  data.type === "reserve" ? <>예약 랜더 </> : <> 주차랜더 </>
//  data.type === "reserve" ? <>예약 랜더 </> : data.type === "movie" ? <> 영화 랜더 </> : <>주차 랜더</>
  return (
    <S.Page>
      <S.CompleteWrap>
        <S.CompleteCard>
          <S.CompleteTitle>{title}</S.CompleteTitle>
          <S.CompleteDivider />

          <S.CompleteTable>
            <S.CompleteRow>
              <S.CompleteTh>사용자</S.CompleteTh>
              <S.CompleteTd>{data.reserverName}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>이용날짜</S.CompleteTh>
              <S.CompleteTd>{dateText}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>학교명</S.CompleteTh>
              <S.CompleteTd>{data.schoolName}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>이용요금</S.CompleteTh>
              <S.CompleteTd>{data.price.toLocaleString()}원</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>결제상태</S.CompleteTh>
              <S.CompleteTd>{data.statusText}</S.CompleteTd>
            </S.CompleteRow>
          </S.CompleteTable>

          <S.CompleteButtonRow>
            <S.CompletePrimaryButton type="button" onClick={() => navigate("/my-page")}>
              {leftButtonText}
            </S.CompletePrimaryButton>

            <S.CompleteSecondaryButton type="button" onClick={() => navigate("/")}>
              메인 페이지로 이동
            </S.CompleteSecondaryButton>
          </S.CompleteButtonRow>
        </S.CompleteCard>
      </S.CompleteWrap>
    </S.Page>
  );
};

export default CompleteConfirm;
