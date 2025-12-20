import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import S from './components/style';
import FindPasswordComponent from './components/FindPasswordComponent';

const FindPassword = () => {
  const location = useLocation();
  const isInfoPage = location.pathname.includes('/info');
  const isCompletePage = location.pathname.includes('/complete');

  return (
    <>
      {!isInfoPage && !isCompletePage ? (
        <S.LayOut>
          <FindPasswordComponent />
        </S.LayOut>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default FindPassword;