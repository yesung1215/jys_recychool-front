import React from "react";
import S from "./style";

const PaymentForm = ({ user, reserve, payType, setPayType }) => {

  console.log(user)

  return (
    <S.LeftWrap>
      {/* 이용자 정보 */}
      <S.Block>
        <S.BlockTitle>이용자 정보</S.BlockTitle>
        <S.BlockLine />

        <S.InfoGrid>
          <S.InfoLabel>이름</S.InfoLabel>
          <S.InfoValue>{user.name}</S.InfoValue>
          <S.InfoLabel>이메일</S.InfoLabel>
          <S.InfoValue>{user.email}</S.InfoValue>

          <S.InfoLabel>휴대폰</S.InfoLabel>
          <S.InfoValue>{user.phone}</S.InfoValue>
        </S.InfoGrid>
      </S.Block>

      {/* 결제 방법 선택 */}
      <S.Block>
        <S.BlockTitle>결제 방법 선택</S.BlockTitle>
        <S.BlockLine />

        <S.PayList>
          <S.PayRow onClick={() => setPayType("GENERAL")}>
            <S.PayLeft>
              <S.PayIcon aria-hidden>
                <S.PayIconImg
                  src="/assets/images/payment/general_Icon.png"
                  alt="일반결제"
                />
              </S.PayIcon>
              <S.PayText>일반결제</S.PayText>
            </S.PayLeft>

            <S.RadioOuter $checked={payType === "GENERAL"}>
              <S.RadioInner $checked={payType === "GENERAL"} />
            </S.RadioOuter>
          </S.PayRow>

          <S.PayRow onClick={() => setPayType("TOSS")}>
            <S.PayLeft>
              <S.PayIcon aria-hidden>
                <S.PayIconImg
                  src="/assets/images/payment/tossPay_Icon.png"
                  alt="토스페이"
                  data-pay="toss"
                />
              </S.PayIcon>
              <S.PayText>토스페이</S.PayText>
            </S.PayLeft>

            <S.RadioOuter $checked={payType === "TOSS"}>
              <S.RadioInner $checked={payType === "TOSS"} />
            </S.RadioOuter>
          </S.PayRow>

          <S.PayRow onClick={() => setPayType("KAKAO")}>
            <S.PayLeft>
              <S.PayIcon aria-hidden>
                <S.PayIconImg
                  src="/assets/images/payment/kakaoPay_Icon.png"
                  alt="카카오페이"
                  data-pay="kakao"
                />
              </S.PayIcon>
              <S.PayText>카카오페이</S.PayText>
            </S.PayLeft>

            <S.RadioOuter $checked={payType === "KAKAO"}>
              <S.RadioInner $checked={payType === "KAKAO"} />
            </S.RadioOuter>
          </S.PayRow>
        </S.PayList>
      </S.Block>

      {/* 환불 규정 */}
      <S.Block>
        <S.BlockTitle>환불 규정</S.BlockTitle>
        <S.BlockLine />

        <S.RefundGrid>
          <S.RefundLeft>100% 환불</S.RefundLeft>
          <S.RefundRight>이용 2일전 취소시</S.RefundRight>

          <S.RefundLeft>50% 환불</S.RefundLeft>
          <S.RefundRight>이용 1일전 취소시</S.RefundRight>

          <S.RefundLeft>취소 불가</S.RefundLeft>
          <S.RefundRight>이용 당일</S.RefundRight>
        </S.RefundGrid>
      </S.Block>
    </S.LeftWrap>
  );
};

export default PaymentForm;
