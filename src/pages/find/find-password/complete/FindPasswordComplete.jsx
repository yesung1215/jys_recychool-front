import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const FindPasswordComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleMoveToLogin = () => {
    navigate("/sign-in");
  };
  
  const handleMoveToMain = () => {
    navigate("/");
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>변경 완료</S.H3>
        <S.H5>비밀번호가 변경되었습니다.</S.H5>
        <S.H6>가입한 이메일 계정: {email}</S.H6>
      </S.TextWrap>
      <S.ButtonWrap>
        <S.ButtonLogin onClick={handleMoveToLogin}>로그인 페이지로 이동하기</S.ButtonLogin>
        <S.ButtonMain onClick={handleMoveToMain}>메인 페이지로 이동하기</S.ButtonMain>
      </S.ButtonWrap>
    </S.LayOut>
  );
};

export default FindPasswordComplete;
