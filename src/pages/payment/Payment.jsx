import React, { useMemo, useState } from "react";
import S from "./style";
import PaymentForm from "./PaymentForm";
import PaymentSummary from "./PaymentSummary";
import * as PortOne from "@portone/browser-sdk/v2";

const Payment = () => {
  const [payType, setPayType] = useState("GENERAL");

  // 더미 데이터
  const user = { name: "장보고", email: "ABC@test.com", phone: "010-0000-0000" };
  const school = { name: "삼성초등학교", address: "서울시 종로구" };
  const reserve = { id: 3, reserveType: "PLACE", startDate: "2026-01-17" };

  const totalPrice = useMemo(() => {
    return reserve.reserveType === "PARKING" ? 300 : 500;
  }, [reserve.reserveType]);

  const getPortOnePayType = () => {
  if (payType === "GENERAL") {
    return {
      channelKey: process.env.REACT_APP_PORTONE_CHANNEL_CARD,
      payMethod: "CARD",
      easyPayProvider: null,
    };
  }

  if (payType === "KAKAO") {
    return {
      channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KAKAOPAY,
      payMethod: "EASY_PAY",
      easyPayProvider: "KAKAOPAY",
    };
  }

  if (payType === "TOSS") {
    return {
      channelKey: process.env.REACT_APP_PORTONE_CHANNEL_TOSSPAY,
      payMethod: "EASY_PAY",
      easyPayProvider: "TOSSPAY",
    };
  }

  throw new Error(`Unknown payType: ${payType}`);
};

  const handlePay = async () => {
    try {
      const paymentId = `payment-${Date.now()}`;

      const { channelKey, payMethod, easyPayProvider } = getPortOnePayType();

      if (!channelKey) {
        alert("channelKey가 없습니다. .env 설정을 확인하세요.");
        return;
      }


      const paymentRequest = {
        storeId: process.env.REACT_APP_PORTONE_STORE_ID,
        channelKey,
        paymentId,
        orderName: reserve.reserveType === "PARKING" ? "주차 예약 결제" : "장소 대여 결제",
        totalAmount: totalPrice,
        currency: "CURRENCY_KRW", 
        payMethod,
        customer: {
          fullName: user.name,      
          email: user.email,
          phoneNumber: user.phone,
        },
      };

      if (payMethod === "EASY_PAY") {
        paymentRequest.easyPay = { easyPayProvider };
      }

      const response = await PortOne.requestPayment(paymentRequest);

      if (!response) {
        alert("결제가 취소되었습니다.");
        return;
      }

      const impUid = response.paymentId; 
      const merchantUid = paymentId;

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/payment/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          reserveId: reserve.id,
          impUid,
          merchantUid,
          paymentType: payType,
        }),
      });

      if (!res.ok) {
        alert("결제 처리에 실패했습니다.");
        return;
      }

      const serverData = await res.json();
      console.log("서버 결제 완료 응답:", serverData);
      alert("결제가 완료되었습니다.");
    } catch (error) {
      console.error("결제 실패:", error);
      alert("결제가 실패(또는 취소)되었습니다.");
    }
  };

  return (
    <S.Page>
      <S.Grid>
        <S.Left>
          <PaymentForm user={user} reserve={reserve} payType={payType} setPayType={setPayType} />
        </S.Left>

        <S.Right>
          <PaymentSummary school={school} reserve={reserve} totalPrice={totalPrice} onClickPay={handlePay} />
        </S.Right>
      </S.Grid>
    </S.Page>
  );
};

export default Payment;
