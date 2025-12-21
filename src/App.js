import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import ReduxDebugger from './components/ReduxDebugger';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from './modules/user';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem("accessToken")
  const reduxData = useSelector((state) => state.user)

  useEffect(() => {
    if (accessToken) {
      const getProfile = async () => {
        const apiPath = '/private/users/me';
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const fullUrl = `${backendUrl}${apiPath}`;
        
        try {
          const response = await fetch(fullUrl, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
            method: "GET"
          });
          if (response.ok) {
            const datas = await response.json();
            const profile = datas.data;
            
            if (profile) {
              const userData = {
                id: profile.id || profile.userId || 0,
                userName: profile.userName || profile.name || "",
                userBirthday: profile.userBirthday || profile.birthday ? new Date(profile.userBirthday || profile.birthday) : new Date(),
                userEmail: profile.userEmail || profile.email || "",
                userPhone: profile.userPhone || profile.phone || "",
                userExp: profile.userExp || profile.exp || 0,
                userLevel: profile.userLevel || profile.level || 0,
                userThumbnailName: profile.userThumbnailName || profile.thumbnailName || "",
                userThumbnailUrl: profile.userThumbnailUrl || profile.thumbnailUrl || "",
                userNickname: profile.userNickname || profile.nickname || "",
                userProvider: profile.userProvider || profile.provider || "",
              };
              
              dispatch(setUser(userData));
              dispatch(setUserStatus(true));
              return;
            }
          } else {
            if (response.status === 401 || response.status === 403) {
              localStorage.removeItem("accessToken");
              dispatch(setUserStatus(false));
              return;
            }
          }
        } catch (error) {
          // 에러 발생 시 무시
        }
        
        dispatch(setUserStatus(true));
      }

      getProfile();
    } else {
      // accessToken이 없으면 로그아웃 상태
      dispatch(setUserStatus(false));
    }
  }, [accessToken, dispatch])
  return (
    <>
      <RouterProvider router={router} />
      {/* 개발 환경에서 Redux 상태 확인용 */}
      {/* {process.env.NODE_ENV === 'development' && <ReduxDebugger />} */}
    </>
  );
}

export default App;
