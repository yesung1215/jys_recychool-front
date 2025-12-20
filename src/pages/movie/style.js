import styled from "styled-components";
import { h5Bold, h5Medium, h6Bold, h6Medium, h7Bold, h7Medium, h8Light, h8Medium } from "../../styles/common";
import { Link } from "react-router-dom";


const S = {};


S.MainWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

S.BannerWrap = styled.div`
    background:
        url('/assets/images/mainbackground.png') bottom center / 1900px auto no-repeat,
        url('/assets/images/main.png') top center /  1900px auto no-repeat;
    min-height: 930px;     
    padding-top: 50px;
    padding-bottom: 180px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

S.ContentRow = styled.div`
    width: 1400px;
    display: flex;
`

S.MapPane = styled.div`
    flex: 0 0 494px;   
    height: 590px;
    border-radius: 16px;
    overflow: hidden;
`;
S.SidePane = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.InfoCard = styled.div`
    width: 330px;
    height: 390px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 18px 40px rgba(0,0,0,0.15);
`
S.InfoHeaderWrap = styled.div`
    display: flex;
`
S.InfoHeaderLeft = styled.div`
    width: 30px;
    height: 30px;
    margin: 20px 0px 0px 16px;
    border-radius: 20px;
    background-color: #2993F7;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        margin: 0px 0px 0px 1.5px;
        width: 18px;
        height: 18px;

    }
`
S.InfoCardMiddleWrap = styled.div`
    margin: 16px 0px 0px 0px;
    display: flex;
    justify-content: center;
    img {
        width: 148px;
        height: 220px;
    }
`
S.InfoCardFloorWrap = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 12px;        
    ${h6Medium}
`
S.InfoCardTitleWrap = styled.div`
    margin: 20px 0px 0px 0px;
    ${h5Bold}
`
S.InfoCardMovie = styled.div`
    margin: 20px 0px 0px 0px;

`
S.InfoCardTitle = styled.div`
    margin: 20px 0px 0px 0px;
  ${h6Medium}
  color: #222;
`;

S.ReservationCard = styled.div`
    width: 330px;
    height: 232px;
    border-radius: 20px;
    display: flex;
    margin: 30px;

    background: #fff;
    box-shadow: 0 18px 40px rgba(0,0,0,0.15);
`
S.ReservationTitle = styled.div`
    ${h6Medium}
`
S.ReservationCard = styled.div`
  width: 330px;
  height: 232px;
  margin-top: 18px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0,0,0,0.15);
  padding: 18px 18px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

S.ReservationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.ReservationDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #70C60C;
`;

S.ReservationTitle = styled.div`
  ${h6Bold}
  color: #222;
`;

S.ReservationBody = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

S.ReservationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.ReservationLabel = styled.span`
  ${h8Light}
  color: #666;
`;

S.ReservationValue = styled.span`
  ${h8Medium}
  color: #222;
`;

S.ReservationSelect = styled.select`
  width: 170px;
  height: 30px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 0 10px;
  ${h8Medium}
  color: #222;
  background: #fff;
  outline: none;
`;

S.ReservationSeat = styled.span`
  ${h8Medium}
  color: #2993F7;
`;

S.ReservationButton = styled.button`
  margin-top: 12px;
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 10px;
  background: #70C60C;
  color: #fff;
  ${h7Bold}
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;




export default S;