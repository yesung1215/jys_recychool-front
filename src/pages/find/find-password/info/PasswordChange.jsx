import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const PasswordChange = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userPhone } = location.state || {};

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 비밀번호 유효성 검사
  const validatePassword = (passwordValue) => {
    const errors = {};

    if (!passwordValue) {
      return errors;
    }

    // 알파벳 포함 여부
    if (!/[a-zA-Z]/.test(passwordValue)) {
      errors.hasAlphabet = "알파벳을 포함해야 합니다.";
    }

    // 숫자 포함 여부
    if (!/[0-9]/.test(passwordValue)) {
      errors.hasNumber = "숫자를 포함해야 합니다.";
    }

    // 특수문자 포함 여부 (!@#$%^&*)
    if (!/[!@#$%^&*]/.test(passwordValue)) {
      errors.hasSpecialChar = "특수문자를 포함해야 합니다(!@#$%^&*).";
    }

    // 길이 체크
    if (passwordValue.length < 8) {
      errors.minLength = "비밀번호가 너무 짧습니다. 비밀번호는 8글자 이상이어야 합니다.";
    }

    // 형식 오류 (위 조건 중 하나라도 만족하지 않으면)
    if (Object.keys(errors).length > 0) {
      errors.formatError = "비밀번호의 형식의 오류가 있습니다.";
    }

    return errors;
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
    
    // 비밀번호 확인과 일치 여부 체크
    if (passwordConfirm) {
      setIsPasswordMatch(value === passwordConfirm);
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setIsPasswordMatch(password === value);
  };

  // 비밀번호 유효성 검사 통과 여부
  const isPasswordValid = () => {
    return Object.keys(passwordErrors).length === 0 && password.length >= 8;
  };

  // 완료하기 버튼 클릭
  const handleComplete = async () => {
    if (!email) {
      alert("이메일 정보가 없습니다. 이전 단계로 돌아가주세요.");
      return;
    }

    if (!password || !isPasswordValid()) {
      alert("비밀번호를 올바르게 입력해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/modify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userEmail: email,
            userPassword: password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "비밀번호 변경에 실패했습니다.");
        return;
      }

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/find-user/password/complete", {
        state: {
          email: email,
        }
      });
    } catch (error) {
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>정보 입력</S.H3>
        <S.H5>변경하실 비밀번호를 입력해주세요.</S.H5>
        <S.H6>이전에 사용한 비밀번호는 사용할 수 없습니다.</S.H6>
      </S.TextWrap>

      <S.InputWrap>
        <S.Label>비밀번호</S.Label>
        <S.Input 
          type={showPassword ? "text" : "password"}
          placeholder='비밀번호'
          value={password}
          onChange={handlePasswordChange}
        />
        {Object.keys(passwordErrors).length > 0 && (
          <S.ErrorWrap>
            {passwordErrors.hasAlphabet && (
              <S.ErrorText>{passwordErrors.hasAlphabet}</S.ErrorText>
            )}
            {passwordErrors.hasNumber && (
              <S.ErrorText>{passwordErrors.hasNumber}</S.ErrorText>
            )}
            {passwordErrors.hasSpecialChar && (
              <S.ErrorText>{passwordErrors.hasSpecialChar}</S.ErrorText>
            )}
            {passwordErrors.formatError && (
              <S.ErrorText>{passwordErrors.formatError}</S.ErrorText>
            )}
            {passwordErrors.minLength && (
              <S.ErrorText>{passwordErrors.minLength}</S.ErrorText>
            )}
          </S.ErrorWrap>
        )}
      </S.InputWrap>

      <S.InputWrap>
        <S.Label>비밀번호 확인</S.Label>
        <S.PasswordInputWrap>
          <S.Input 
            type={showPasswordConfirm ? "text" : "password"}
            placeholder='비밀번호 확인'
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <S.EyeIcon onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
            {showPasswordConfirm ? '👁️' : '👁️‍🗨️'}
          </S.EyeIcon>
        </S.PasswordInputWrap>
        {!isPasswordMatch && passwordConfirm && (
          <S.ErrorText>비밀번호가 일치하지 않습니다.</S.ErrorText>
        )}
      </S.InputWrap>

      <S.NextStep onClick={handleComplete}>
        완료하기
      </S.NextStep>
    </S.LayOut>
  );
};

export default PasswordChange;
