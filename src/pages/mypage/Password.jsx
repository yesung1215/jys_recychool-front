import React from "react";
import S from "./style";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const Password = ({
  editingField,
  setEditingField,
  currentPw,
  newPw,
  confirmPw,
  setCurrentPw,
  setNewPw,
  setConfirmPw,
}) => {
  const isEdit = editingField === "password";
  const isDisabled = editingField && editingField !== "password";

  const isNewPwInvalid = newPw && !passwordRegex.test(newPw);
  const isConfirmMismatch =
    confirmPw && newPw && newPw !== confirmPw;

  return (
    <S.Row>
      <S.RowHeader>
        {!isEdit && <S.Label>비밀번호</S.Label>}

        {!isEdit && (
          <S.EditBtn
            $disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => setEditingField("password")}
          >
            수정하기
          </S.EditBtn>
        )}
      </S.RowHeader>

      {isEdit ? (
        <>
          {/* 현재 비밀번호 */}
          <S.Label>현재 비밀번호</S.Label>
          <S.PasswordInputBox
            type="password"
            placeholder="현재 비밀번호"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
          />

          {/* 새 비밀번호 */}
          <S.Label>새 비밀번호</S.Label>
          <S.PasswordInputBox
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            $error={isNewPwInvalid}
          />

          {isNewPwInvalid && (
            <S.ErrorText>
              8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.
            </S.ErrorText>
          )}

          {/* 새 비밀번호 확인 */}
          <S.PasswordInputBox
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            $error={isConfirmMismatch}
          />

          {isConfirmMismatch && (
            <S.ErrorText>
              비밀번호가 일치하지 않습니다.
            </S.ErrorText>
          )}
        </>
      ) : (
        <S.UpdateBox>************</S.UpdateBox>
      )}
    </S.Row>
  );
};

export default Password;
