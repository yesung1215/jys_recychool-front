import styled from 'styled-components';
import { h2Bold, h3Bold, h3Light, h5Bold, h5Medium, h6Bold, h6Light, h6Medium, h7Medium } from '../../../../styles/common';

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
`
S.TapWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 36px 0;
  :hover{
    cursor: pointer;
  }
`
S.Tap = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 150px;
  height: 51px;
  & img{
    width: 30px;
  }
  :hover{
    cursor: pointer;
  }
`
S.NextStep = styled.div`
  width: 680px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h5Bold}
  color: #fff;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  border-radius: 4px;
  :hover{
    cursor: pointer;
  }
`

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`
S.InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
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

S.Label = styled.p`
  ${h6Bold}
  margin: 0;
`

S.TimerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`

S.TimerText = styled.span`
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  font-weight: bold;
  font-size: 14px;
`

S.ResendButton = styled.div`
  color: ${({ theme }) => theme.PALETTE.secondary.blue.main};
  cursor: pointer;
  font-size: 14px;
  ${h6Medium}
  
  &:hover {
    opacity: 0.8;
  }
`

S.NextStep = styled.div`
  width: 680px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h5Bold}
  color: #fff;
  background-color: ${({ theme, disabled }) => 
    disabled ? '#ccc' : theme.PALETTE.primary.green.main};
  border-radius: 4px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  margin-top: 24px;
  
  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.9};
  }
`

export default S;