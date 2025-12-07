import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUserStatus, setUser } from "../../modules/user";

const OauthSuccess = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!key) {
      return;
    }

    const getAccessToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message || "OAuth 인증에 실패했습니다.");
          navigate("/sign-in");
          return;
        }

        const datas = await response.json();
        console.log("OAuth 응답 데이터:", datas); // 디버깅용
        const accessToken = datas.data?.accessToken;
        const userData = datas.data?.user;
        
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          dispatch(setUserStatus(true));
          
          // 사용자 정보가 있으면 Redux에 저장
          if (userData) {
            console.log("사용자 정보를 Redux에 저장합니다:", userData); // 디버깅용
            dispatch(setUser(userData));
          } else {
            console.warn("사용자 정보가 응답에 없습니다. 응답 구조:", datas);
          }
          
          navigate("/");
        } else {
          alert("토큰을 받아오지 못했습니다.");
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("OAuth 인증 오류:", error);
        alert("OAuth 인증 중 오류가 발생했습니다.");
        navigate("/sign-in");
      }
    };

    getAccessToken();
  }, [key, dispatch, navigate]);
  return <></>;
};

export default OauthSuccess;