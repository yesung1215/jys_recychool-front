import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const FindPasswordComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [isEmailCodeVerified, setIsEmailCodeVerified] = useState(false);
  
  // 전화번호 인증 관련
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  
  // 이메일 인증 타이머
  const initialTime = 3 * 60 * 1000; // 3분
  const [emailTimeLeft, setEmailTimeLeft] = useState(initialTime);
  const [isEmailRunning, setIsEmailRunning] = useState(false);
  
  // 전화번호 인증 타이머
  const [phoneTimeLeft, setPhoneTimeLeft] = useState(initialTime);
  const [isPhoneRunning, setIsPhoneRunning] = useState(false);

  // 이메일 타이머 포맷팅
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 이메일 타이머 useEffect
  useEffect(() => {
    let intervalId;
    if (isEmailRunning && emailTimeLeft > 0) {
      intervalId = setInterval(() => {
        setEmailTimeLeft(prevTime => prevTime - 1000);
      }, 1000);
    } else if (emailTimeLeft === 0) {
      setIsEmailRunning(false);
      alert("인증 시간이 만료되었습니다. 다시 인증요청을 눌러주세요.");
      setEmailTimeLeft(initialTime);
      setIsEmailCodeSent(false);
    }

    return () => clearInterval(intervalId);
  }, [isEmailRunning, emailTimeLeft, initialTime]);

  // 전화번호 타이머 useEffect
  useEffect(() => {
    let intervalId;
    if (isPhoneRunning && phoneTimeLeft > 0) {
      intervalId = setInterval(() => {
        setPhoneTimeLeft(prevTime => prevTime - 1000);
      }, 1000);
    } else if (phoneTimeLeft === 0) {
      setIsPhoneRunning(false);
      alert("인증 시간이 만료되었습니다. 다시 인증요청을 눌러주세요.");
      setPhoneTimeLeft(initialTime);
      setIsPhoneCodeSent(false);
    }

    return () => clearInterval(intervalId);
  }, [isPhoneRunning, phoneTimeLeft, initialTime]);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // 이메일 확인 (이미 있는 이메일인지 확인)
  const handleCheckExistEmail = async () => {
    if (!validateEmail(email)) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/exists/cehck-email?email=${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        // 이미 사용 중인 이메일 (비밀번호 찾기 가능)
        setEmailCheckMessage("비밀번호 변경이 가능합니다.");
        setEmailVerified(true);
        setEmailError("");
      } else {
        // 사용 가능한 이메일 (회원가입 유도)
        setEmailCheckMessage("가입된 회원이 없습니다.");
        setEmailVerified(false);
        setEmailError("");
        const goToSignUp = window.confirm("등록되지 않은 이메일입니다. 회원가입 페이지로 이동하시겠습니까?");
        if (goToSignUp) {
          navigate("/sign-up");
        }
      }
    } catch (error) {
      setEmailCheckMessage("이메일 확인 중 오류가 발생했습니다.");
      setEmailVerified(false);
    }
  };

  // 이메일 인증코드 발송
  const handleGetVerifyEmailCode = async () => {
    if (!validateEmail(email)) {
      return;
    }

    if (!emailVerified) {
      alert("이메일 확인을 먼저 진행해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/email?toEmail=${email}`,
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
        alert(result.message || "인증코드 전송에 실패했습니다.");
        return;
      }

      alert("입력하신 이메일로 인증코드가 발송되었습니다.");
      setIsEmailCodeSent(true);
      setIsEmailRunning(true);
      setEmailTimeLeft(initialTime);
    } catch (error) {
      alert("인증코드 전송 중 오류가 발생했습니다.");
    }
  };

  // 이메일 인증코드 확인
  const handleConfirmEmailCode = async () => {
    if (!emailVerificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${emailVerificationCode}`,
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
        setIsEmailCodeVerified(true);
        setIsEmailRunning(false);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert("인증번호가 일치하지 않습니다.");
        setEmailVerificationCode("");
      }
    } catch (error) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  // 다음 버튼 클릭 (전화번호 인증 단계로)
  const handleNextToPhoneVerification = () => {
    if (!emailVerified) {
      alert("이메일 확인을 먼저 진행해주세요.");
      return;
    }

    if (!isEmailCodeVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    setShowPhoneVerification(true);
  };

  // 전화번호 인증코드 발송
  const handleGetPhoneCode = async () => {
    if (!userPhone.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    } else if (!/^[0-9]{11}$/.test(userPhone)) {
      alert("전화번호는 하이픈 없이 11자리 숫자로 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/sms?phoneNumber=${userPhone}`,
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
        alert(result.message || "인증코드 전송에 실패했습니다.");
        return;
      }

      alert("회원님의 휴대폰으로 인증번호를 보냈습니다.");
      setIsPhoneCodeSent(true);
      setIsPhoneRunning(true);
      setPhoneTimeLeft(initialTime);
    } catch (error) {
      alert("인증코드 전송 중 오류가 발생했습니다.");
    }
  };

  // 전화번호 인증코드 확인
  const handleVerifyPhoneCode = async () => {
    if (!phoneVerificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${phoneVerificationCode}`,
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
        setIsPhoneVerified(true);
        setIsPhoneRunning(false);
        alert("인증이 완료되었습니다.");
        // 완료 페이지로 이동 (추후 구현)
        // navigate("/find-user/password/complete", { state: { email, userPhone } });
      } else {
        alert("인증번호가 일치하지 않습니다.");
        setPhoneVerificationCode("");
      }
    } catch (error) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  // 전화번호 인증 재요청
  const handleResendPhoneCode = async () => {
    if (!userPhone.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/sms?phoneNumber=${userPhone}`,
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
        alert(result.message || "인증코드 재전송에 실패했습니다.");
        return;
      }

      alert("인증번호가 재전송되었습니다.");
      setIsPhoneRunning(true);
      setPhoneTimeLeft(initialTime);
    } catch (error) {
      alert("인증코드 재전송 중 오류가 발생했습니다.");
    }
  };

  // 완료하기 버튼 클릭
  const handleComplete = () => {
    if (!isPhoneVerified) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    // 비밀번호 변경 페이지로 이동
    navigate("/find-user/password/info", {
      state: {
        email: email,
        userPhone: userPhone,
      }
    });
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 이메일 확인 섹션 */}
      <S.EmailInputWrap>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <S.Label>이메일 확인</S.Label>
          <S.VerifyButton onClick={handleCheckExistEmail} disabled={!email.trim()}>
            이메일 확인
          </S.VerifyButton>
        </div>
        <S.Input 
          placeholder='example@recychool.com'
          value={email}
          onChange={(e) => { 
            setEmail(e.target.value); 
            setEmailCheckMessage(''); 
            setEmailError(''); 
            setEmailVerified(false);
            setIsEmailCodeSent(false);
            setIsEmailCodeVerified(false);
          }}
          disabled={isEmailCodeVerified}
        />
        {emailError && <S.EmailErrorText>{emailError}</S.EmailErrorText>}
        {emailCheckMessage && !emailError && (
          <S.EmailCheckMessage $isAvailable={emailVerified}>
            {emailCheckMessage}
          </S.EmailCheckMessage>
        )}
      </S.EmailInputWrap>

      {/* 이메일 인증코드 섹션 */}
      {emailVerified && (
        <>
          <S.EmailInputWrap>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <S.Label>인증번호</S.Label>
              <S.VerifyButton 
                onClick={handleGetVerifyEmailCode}
                disabled={isEmailCodeSent && isEmailRunning}
              >
                인증받기
              </S.VerifyButton>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <S.Input 
                placeholder='인증번호를 입력해주세요'
                value={emailVerificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                  if (value.length <= 8) {
                    setEmailVerificationCode(value);
                  }
                }}
                maxLength={8}
                disabled={isEmailCodeVerified}
                style={{ flex: 1 }}
              />
              {!isEmailCodeVerified && isEmailCodeSent && (
                <S.VerifyButton 
                  onClick={handleConfirmEmailCode}
                  disabled={emailVerificationCode.length !== 8}
                >
                  인증 확인
                </S.VerifyButton>
              )}
            </div>
            {isEmailCodeSent && (
              <S.TimerWrap>
                <S.TimerText>
                  남은시간: {isEmailRunning && emailTimeLeft > 0 ? formatTime(emailTimeLeft) : '0:00'}
                </S.TimerText>
              </S.TimerWrap>
            )}
            {isEmailCodeVerified && <S.SuccessText>인증이 완료되었습니다.</S.SuccessText>}
          </S.EmailInputWrap>
        </>
      )}

      {/* 다음 버튼 (이메일 인증 완료 후) */}
      {!showPhoneVerification && isEmailCodeVerified && (
        <S.NextStep onClick={handleNextToPhoneVerification}>
          다음
        </S.NextStep>
      )}

      {/* 전화번호 인증 섹션 */}
      {showPhoneVerification && (
        <>
          <S.InputWrap>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <S.Label>전화번호</S.Label>
              <S.VerifyButton 
                onClick={handleGetPhoneCode}
                disabled={!userPhone.trim() || (isPhoneCodeSent && isPhoneRunning)}
              >
                인증 받기
              </S.VerifyButton>
            </div>
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
              disabled={isPhoneCodeSent}
            />
          </S.InputWrap>

          <S.InputWrap>
            <S.Label>인증번호 확인란</S.Label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <S.Input 
                placeholder='인증번호를 입력해주세요'
                value={phoneVerificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                  if (value.length <= 8) {
                    setPhoneVerificationCode(value);
                  }
                }}
                maxLength={8}
                disabled={isPhoneVerified}
                style={{ flex: 1 }}
              />
              {!isPhoneVerified && isPhoneCodeSent && (
                <S.VerifyButton 
                  onClick={handleVerifyPhoneCode}
                  disabled={phoneVerificationCode.length !== 8}
                >
                  인증 확인
                </S.VerifyButton>
              )}
            </div>
            <S.TimerWrap>
              <S.TimerText>
                남은시간: {isPhoneRunning && phoneTimeLeft > 0 ? formatTime(phoneTimeLeft) : '0:00'}
              </S.TimerText>
              <S.ResendButton onClick={handleResendPhoneCode}>
                인증 재요청
              </S.ResendButton>
            </S.TimerWrap>
            {isPhoneVerified && <S.SuccessText>인증이 완료되었습니다.</S.SuccessText>}
          </S.InputWrap>

          {/* 완료하기 버튼 */}
          <S.NextStep 
            onClick={handleComplete}
            disabled={!isPhoneVerified}
          >
            완료하기
          </S.NextStep>
        </>
      )}
    </div>
  );
};

export default FindPasswordComponent;
