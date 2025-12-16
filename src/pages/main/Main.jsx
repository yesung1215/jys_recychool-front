import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import S from './style';

const Main = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const key = searchParams.get('key');

  useEffect(() => {
    if (key) {
      const getAccessToken = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`;

          const response = await fetch(apiUrl, {
            method: 'GET',
          });

          if (!response.ok) {
            const result = await response.json();
            alert(result.message || 'OAuth 인증에 실패했습니다.');
            window.history.replaceState({}, '', '/');
            return;
          }

          const datas = await response.json();
          const accessToken = datas.data?.accessToken;
          const userData = datas.data?.user;

          if (accessToken) {
            try {
              localStorage.setItem('accessToken', accessToken);

              const immediateCheck = localStorage.getItem('accessToken');
              if (!immediateCheck) {
                alert('토큰 저장에 실패했습니다. 브라우저 설정을 확인해주세요.');
                return;
              }
            } catch (storageError) {
              alert('토큰 저장 중 오류가 발생했습니다: ' + storageError.message);
              return;
            }

            dispatch(setUserStatus(true));

            if (userData) {
              const formattedUserData = {
                id: userData.id || userData.userId || 0,
                userName: userData.userName || userData.name || "",
                userBirthday: userData.userBirthday || userData.birthday || new Date(),
                userEmail: userData.userEmail || userData.email || "",
                userPhone: userData.userPhone || userData.phone || "",
                userExp: userData.userExp || userData.exp || 0,
                userLevel: userData.userLevel || userData.level || 0,
                userThumbnailName: userData.userThumbnailName || userData.thumbnailName || "",
                userThumbnailUrl: userData.userThumbnailUrl || userData.thumbnailUrl || "",
                userNickname: userData.userNickname || userData.nickname || "",
                userProvider: userData.userProvider || userData.provider || "",
              };
              dispatch(setUser(formattedUserData));
            }

            window.history.replaceState({}, '', '/');
          } else {
            alert('토큰을 받아오지 못했습니다.');
            window.history.replaceState({}, '', '/');
          }
        } catch (error) {
          alert('OAuth 인증 중 오류가 발생했습니다: ' + error.message);
          window.history.replaceState({}, '', '/');
        }
      };

      getAccessToken();
    }
  }, [key, dispatch, searchParams]);

  return (
    <div>
      <S.MainWrap>
          <S.BannerWrap>
            <img src="/assets/images/main.png" alt="백그라운드 이미지" />
            <img id="middle-images"src='/assets/images/mainbackground.png' alt='백그라운드 이미지' />
          </S.BannerWrap>
        <S.MiddleWrap>
          <S.SearchWrap>
            <S.FieldItem>
              <label>지역</label>
              <input type="text" placeholder="서울/경기도" />
            </S.FieldItem>

            <S.Divider />

            <S.FieldItem>
              <label>날짜</label>
              <input type="text" placeholder="날짜 추가" />
            </S.FieldItem>

            <S.Divider />

            <S.FieldItem>
              <label>학교</label>
              <input type="text" placeholder="학교명 검색" />
            </S.FieldItem>

            <S.SearchButton aria-label="검색">
              {/* 간단한 돋보기 SVG 아이콘 */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21L16.65 16.65" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </S.SearchButton>
          </S.SearchWrap>
        </S.MiddleWrap>
        메인 페이지
      </S.MainWrap>
    </div>
  );
};

export default Main;