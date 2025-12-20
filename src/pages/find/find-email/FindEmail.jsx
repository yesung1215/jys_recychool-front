import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import S from './components/style';
import FindEmailComponent from './components/FindEmailComponent';

const FindEmail = () => {
  const location = useLocation();
  const isCompletePage = location.pathname.includes('/complete');

  return (
    <>
      {!isCompletePage ? (
        <S.LayOut>
          <S.TapWrap>
            <S.TextWrap>
              <S.H3>본인확인</S.H3>
              <S.H5>고객님의 본인확인을 진행해주세요.</S.H5>
              <S.H6>리싸이쿨의 서비스 이용을 위해 본인확인이 필요합니다.</S.H6>
            </S.TextWrap>
          </S.TapWrap>
          <FindEmailComponent />
        </S.LayOut>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default FindEmail;