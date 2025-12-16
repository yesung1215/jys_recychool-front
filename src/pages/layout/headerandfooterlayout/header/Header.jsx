import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../../../modules/user';
import S from './style';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const { currentUser, isLogin } = user;
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
    <S.HeaderWrap>
      <S.InnerWrap>
        <Link to={"/"}>
          <img src='/assets/images/logofina.png' />
        </Link>



        <S.RightWrap>
          {isLogin ? (
            <>
              <S.MyPageWrap>
                <Link to={"/my-page"}>마이페이지</Link>
              </S.MyPageWrap>
              <S.LogOut>
                <div onClick={onLogout}>로그아웃</div>
              </S.LogOut>
            </>
          ) : (
            <>
              <S.loginWrap>
                <Link to={"/sign-in"}>
                  <span>로그인</span>
                </Link>

              </S.loginWrap>
              <S.SignInWrap>
                <Link to={"/sign-up"}>
                  <span>회원가입</span>
                </Link>
              </S.SignInWrap>
            </>
          )}
        </S.RightWrap>
      </S.InnerWrap>
    </S.HeaderWrap>

    
  );
};

export default Header;