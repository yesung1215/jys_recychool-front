import styled from 'styled-components';
import { h2Bold, h3Bold, h5Medium, h6Bold, h6Light, h6Medium } from '../../../../styles/common';
import { Link } from 'react-router-dom';
const S = {};
S.LayOut = styled.div`
  width: 1160px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

S.Header = styled.span`
  ${h3Bold}
`
S.HeaderWrap = styled.div`
  width: 1160px;
  display: flex;
  align-items: baseline;
  ${h3Bold}
  margin: 72px 0px;
`
S.Tap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > .active {
      border-bottom: solid 2px ${({ theme }) => theme.PALETTE.secondary.blue.main};
    }
`
S.TapDiv = styled.div`
  width: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  ${h5Medium}
`

export default S;