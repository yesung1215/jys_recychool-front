import styled from "styled-components";
import {
  h3Medium,
  h4Light,
  h5Bold,
  h6Bold,
  h7Medium,
} from "../../styles/common";

const S = {};

S.All = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.Head = styled.div`
  ${h3Medium}
`;

S.MyPage = styled.div`
  width: 680px;
  margin-top: 30px;
`;

S.Title = styled.div`
  margin: 40px 0;
  ${h4Light}
`;

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

S.Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Label = styled.div`
  ${h6Bold}
`;

S.ReadOnlyBox = styled.div`
  background: #e0e0e0;
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #999999;
`;

S.UpdateBox = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #999999;
`;

S.InputBox = styled.input`
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;
  border: 1px solid #2d7cff;
  outline: none;

  &:focus {
    border-color: #2d7cff;
  }
`;

S.ErrorText = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: -6px;
`;

S.EditBtn = styled.button`
  all: unset;
  width: 80px;
  height: 32px;
  border-radius: 8px;
  ${h7Medium}

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { background-color: #5EA50B; }
  
  background-color: ${({ theme, $disabled }) =>
    $disabled ? "#EFFBEA" : theme.PALETTE.primary.green.main};

  color: ${({ theme, $disabled }) =>
    $disabled ? "#C1C1C1" : theme.PALETTE.neutral.white.main};

  cursor: ${({ $disabled }) =>
    $disabled ? "not-allowed" : "pointer"};

  pointer-events: ${({ $disabled }) =>
    $disabled ? "none" : "auto"};
`;

S.SubmitBtn = styled.button`
  margin-top: 40px;
  height: 52px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #ffffff;
  ${h5Bold}
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover { background-color: ${({ theme }) => theme.PALETTE.primary.green.dark}; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); transform: translateY(-2px); }
`;

S.PasswordInputBox = styled.input`
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;

  border: 1px solid
    ${({ $error }) => ($error ? "#E74C3C" : "#E0E0E0")};

  outline: none;

  &:focus {
    border-color: ${({ $error }) =>
      $error ? "#E74C3C" : "#2D7CFF"};
  }
`;


export default S;
