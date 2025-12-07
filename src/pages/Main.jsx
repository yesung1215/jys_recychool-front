import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../modules/user';

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
      메인 페이지
    </div>
  );
};

export default Main;