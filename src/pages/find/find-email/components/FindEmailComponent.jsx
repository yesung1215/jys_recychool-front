import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const FindEmailComponent = () => {
  const navigate = useNavigate();
  const [defaultLayOut, setDefaultLayOut] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userEmails, setUserEmails] = useState([]);
  
  // 3분 타이머
  const initialTime = 3 * 60 * 1000; // 3분
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 타이머 useEffect
  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("인증 시간이 만료되었습니다. 다시 인증요청을 눌러주세요.");
      setTimeLeft(initialTime);
      setIsCodeSent(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, initialTime]);

  const handleNextStepCheckPhoneNumber = async () => {
    // 유효성 검사
    if (!userName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    
    if (!userPhone.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    } else if (!/^[0-9]{11}$/.test(userPhone)) {
      alert("전화번호는 하이픈 없이 11자리 숫자로 입력해주세요.");
      return;
    }

    try {
      // 이메일 찾기 요청
      const requestBody = {
        userName: userName,
        userPhone: userPhone,
      };
      
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/finds/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = "이메일 찾기에 실패했습니다.";
        
        if (result.message) {
          errorMessage = result.message;
        } else if (result.error) {
          errorMessage = result.error;
        }
        
        if (response.status === 500) {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
        
        alert(errorMessage);
        return;
      }

      // 응답에서 이메일 목록 저장
      if (result.data?.emails && Array.isArray(result.data.emails)) {
        setUserEmails(result.data.emails);
      }

      alert("회원님의 휴대폰으로 인증번호를 보냈습니다.");
      setDefaultLayOut(true);
      setIsCodeSent(true);
      setIsRunning(true);
      setTimeLeft(initialTime);
    } catch (error) {
      alert("이메일 찾기 중 오류가 발생했습니다.");
    }
  }

  const handleVerifyCodes = async () => {
    if (!verificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      // 이전 sign-up의 문자 인증 확인 경로 그대로 사용
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${verificationCode}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "인증 확인에 실패했습니다.");
        return;
      }

      if (result.data?.verified) {
        setIsVerified(true);
        setIsRunning(false);
        // 인증 완료 후 complete 페이지로 이동 (이메일 목록 전달)
        navigate("/find-user/email/complete", {
          state: {
            userName: userName,
            userPhone: userPhone,
            emails: userEmails,
          }
        });
      } else {
        alert("인증번호가 일치하지 않습니다.");
        setVerificationCode("");
      }
    } catch (error) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  }

  const handleResendCode = async () => {
    if (!userName.trim() || !userPhone.trim()) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }

    try {
      // 재전송 시에도 이메일 찾기 API를 다시 호출 (백엔드에서 인증코드 발송)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/finds/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userName: userName,
            userPhone: userPhone,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "인증코드 재전송에 실패했습니다.");
        return;
      }

      // 재전송 시에도 이메일 목록 저장
      if (result.data?.emails && Array.isArray(result.data.emails)) {
        setUserEmails(result.data.emails);
      }

      alert("인증번호가 재전송되었습니다.");
      setIsRunning(true);
      setTimeLeft(initialTime);
    } catch (error) {
      alert("인증코드 재전송 중 오류가 발생했습니다.");
    }
  }
  return (
    <div>
      <S.InputWrap>
        <S.Label>이름</S.Label>
        <S.Input 
          placeholder='홍길동'
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          disabled={isCodeSent}
        />
      </S.InputWrap>
      <S.InputWrap>
        <S.Label>전화번호</S.Label>
        <S.Input 
          placeholder='01012345678'
          value={userPhone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length <= 11) {
              setUserPhone(value);
            }
          }}
          maxLength={11}
          disabled={isCodeSent}
        />
      </S.InputWrap>
      {
      !defaultLayOut ? 
        <S.NextStep onClick={handleNextStepCheckPhoneNumber}>
          다음
        </S.NextStep>
        : 
        <>
          <S.InputWrap>
            <S.Label>인증번호 확인 란</S.Label>
            <S.Input 
              placeholder='인증번호를 입력해주세요'
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                if (value.length <= 8) {
                  setVerificationCode(value);
                }
              }}
              maxLength={8}
              disabled={isVerified}
            />
            <S.TimerWrap>
              <S.TimerText>
                남은시간: {isRunning && timeLeft > 0 ? formatTime(timeLeft) : '0:00'}
              </S.TimerText>
              <S.ResendButton onClick={handleResendCode}>
                인증 재요청
              </S.ResendButton>
            </S.TimerWrap>
          </S.InputWrap>
          <S.NextStep 
            onClick={handleVerifyCodes}
            disabled={!verificationCode || verificationCode.length !== 8}
          >
            인증 확인 후 다음 단계로
          </S.NextStep>
        </>
      }
      
    </div>
  );
};

export default FindEmailComponent;