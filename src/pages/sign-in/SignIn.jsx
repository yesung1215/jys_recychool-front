import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
      로그인 페이지
      <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/kakao`}>
        카카오 로그인
      </Link>
      <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`}>
        구글 로그인
      </Link>
      <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/naver`}>
        네이버 로그인
      </Link>
      <Link to={"/find-user"}>아이디 / 비밀번호 찾기</Link>
      <Link to={"/sign-up"}>회원 가입</Link>
    </div>
  );
};

export default SignIn;