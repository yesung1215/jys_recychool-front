import React from 'react';
import PaymentForm from './PaymentForm';
import PaymentSummery from './PaymentSummery';
import S from './style';


const Payment = () => {

  return (
    <S.Page>
      <S.Grid>
        <S.Left>
          <PaymentForm />
        </S.Left>

        <S.Right>
          <PaymentSummery />
        </S.Right>
      </S.Grid>
    </S.Page>
  );
};

export default Payment;