import styled from 'styled-components';
import { h3Light, h5Medium, h6Bold, h6Light, h6Medium, h7Medium } from '../../../../styles/common';

const S = {};

S.LayOut = styled.div`
  width: 680px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: baseline;
  margin-top: 72px;
  position: relative;
`

S.H3 = styled.h3`
  ${h3Light}
`

S.H5 = styled.h5`
  ${h5Medium}
`

S.H6 = styled.h6`
  ${h6Light}
`

S.TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  width: 100%;
`

S.InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
`

S.Label = styled.p`
  ${h6Bold}
  margin: 0;
`

S.Input = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 12px;
  box-sizing: border-box;
  ${h7Medium}
  color: #333;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.green.main};
    outline: none;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
    cursor: not-allowed;
  }
`

S.PasswordInputWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`

S.EyeIcon = styled.span`
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
`

S.ErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

S.ErrorText = styled.div`
  color: ${({ theme }) => theme.PALETTE.warn.red.main};
  font-size: 12px;
  ${h6Light}
`

S.NextStep = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h6Bold}
  color: #fff;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  border-radius: 4px;
  cursor: pointer;
  margin-top: 24px;
  
  &:hover {
    opacity: 0.9;
  }
`

export default S;
