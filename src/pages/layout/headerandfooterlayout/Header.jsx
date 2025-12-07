import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../../modules/user';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  const { id } = currentUser
  
  const defaultUser = {
    id: 0,
    userName: "",
    userBirthday: new Date(),
    userEmail: "",
    userPhone: "",
    userNickname: "",
    userProvider: "",
  }

  const onLogout = (() => {
    localStorage.removeItem("accessToken")
    dispatch(setUser(defaultUser))
    dispatch(setUserStatus(false))
    navigate("/sign-in")
  }) 
  return (
    <div>
      헤더
      <div>
        로고
        {isLogin ? (
          <>
            <Link to={"/my-page"}>마이페이지</Link>
            <div onClick={onLogout}>로그아웃</div>
          </>
          ) : (
          <>
            <Link to={"/sign-up"}>
              회원가입
            </Link>
            <Link to={"/sign-in"}>
              로그인
            </Link>
          </>
          )}
      </div>
    </div>
  );
};

export default Header;