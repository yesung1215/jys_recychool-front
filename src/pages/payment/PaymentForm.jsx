import React, { useState } from "react";
import S from "./style";

const PaymentForm = () => {
  // 피그마 기준: 토스페이 선택 상태
  const [payMethod, setPayMethod] = useState("toss"); // card | toss | kakao

  return (
    <S.LeftWrap>
      {/* =============================
       * 이용자 정보
       * ============================= */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>이용자 정보</S.SectionTitle>
          <S.SectionLine />
        </S.SectionHeader>

        <S.InfoList>
          <S.InfoRow>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>홍길동</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>hgd12345@gmail.com</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>휴대폰</S.InfoLabel>
            <S.InfoValue>010-2222-4444</S.InfoValue>
          </S.InfoRow>
        </S.InfoList>
      </S.Section>

      {/* =============================
       * 결제 방법 선택
       * ============================= */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>결제 방법 선택</S.SectionTitle>
          <S.SectionLine />
        </S.SectionHeader>

        <S.PayList>
          <S.PayRow>
            <S.PayLeft>
              <S.PayLogo>card</S.PayLogo>
              <S.PayText>일반결제</S.PayText>
            </S.PayLeft>

            <S.Radio
              type="radio"
              name="payMethod"
              checked={payMethod === "card"}
              onChange={() => setPayMethod("card")}
            />
          </S.PayRow>

          <S.PayRow>
            <S.PayLeft>
              <S.PayLogo>toss</S.PayLogo>
              <S.PayText>토스페이</S.PayText>
            </S.PayLeft>

            <S.Radio
              type="radio"
              name="payMethod"
              checked={payMethod === "toss"}
              onChange={() => setPayMethod("toss")}
            />
          </S.PayRow>

          <S.PayRow>
            <S.PayLeft>
              <S.PayLogo>kpay</S.PayLogo>
              <S.PayText>카카오페이</S.PayText>
            </S.PayLeft>

            <S.Radio
              type="radio"
              name="payMethod"
              checked={payMethod === "kakao"}
              onChange={() => setPayMethod("kakao")}
            />
          </S.PayRow>
        </S.PayList>
      </S.Section>

      {/* =============================
       * 환불 규정
       * ============================= */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>환불 규정</S.SectionTitle>
          <S.SectionLine />
        </S.SectionHeader>

        <S.PolicyList>
          <S.PolicyRow>
            <S.PolicyKey>100% 환불</S.PolicyKey>
            <S.PolicyValue>이용 2일전 취소시</S.PolicyValue>
          </S.PolicyRow>

          <S.PolicyRow>
            <S.PolicyKey>50% 환불</S.PolicyKey>
            <S.PolicyValue>이용 1일전 취소시</S.PolicyValue>
          </S.PolicyRow>

          <S.PolicyRow>
            <S.PolicyKey>취소 불가</S.PolicyKey>
            <S.PolicyValue>이용 당일</S.PolicyValue>
          </S.PolicyRow>
        </S.PolicyList>
      </S.Section>
    </S.LeftWrap>
  );
};

export default PaymentForm;
