import styled from 'styled-components';
import { h3Light, h5Medium, h6Bold, h6Light } from '../../../../styles/common';

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

S.ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  width: 100%;
`

S.ButtonLogin = styled.div`
  width: 320px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #ffffff;
  ${h6Bold}
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`

S.ButtonMain = styled.div`
  width: 320px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.light};
  color: #666;
  ${h6Bold}
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`

export default S;
