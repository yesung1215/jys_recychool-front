import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const FindEmailComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emails = location.state?.emails || [];
  const userName = location.state?.userName || '';
  const userPhone = location.state?.userPhone || '';

  const handleMoveToLogin = () => {
    navigate("/sign-in");
  };
  
  const handleMoveToMain = () => {
    navigate("/");
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>이메일 찾기 완료</S.H3>
        <S.H5>회원님의 이메일을 찾았습니다.</S.H5>
        {emails.length > 0 ? (
          <S.EmailListWrap>
            {emails.map((email, index) => (
              <S.EmailItem key={index}>
                {email}
              </S.EmailItem>
            ))}
          </S.EmailListWrap>
        ) : (
          <S.H6>등록된 이메일이 없습니다.</S.H6>
        )}
      </S.TextWrap>
      <S.ButtonWrap>
        <S.ButtonLogin onClick={handleMoveToLogin}>로그인 페이지로 이동하기</S.ButtonLogin>
        <S.ButtonMain onClick={handleMoveToMain}>메인으로 이동하기</S.ButtonMain>
      </S.ButtonWrap>
    </S.LayOut>
  );
};

export default FindEmailComplete;
