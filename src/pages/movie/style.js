import styled from "styled-components";
import { h3Bold, h4Bold, h5Bold, h5Medium, h6Bold, h6Light, h6Medium, h7Bold, h7Medium, h8Light, h8Medium } from "../../styles/common";
import { Link } from "react-router-dom";

const S = {};


S.MainWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

S.BannerWrap = styled.div`
  background:
    url('/assets/images/mainbackground.png') bottom center / 1900px auto no-repeat,
    url('/assets/images/main.png') top center / 1900px auto no-repeat;
  min-height: 930px;
  padding-top: 50px;
  padding-bottom: 180px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

S.ContentRow = styled.div`
  width: 1400px;
  display: flex;
`;

S.MapPane = styled.div`
  flex: 0 0 494px;
  height: 590px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;
S.MapPin1 = styled.div`
  position: absolute; 
  transform: translate(800%, -1850%); 
  z-index: 2;
  img {
    width: 28px;   
    height: 28px;
    display: block;
  }
`;
S.MapPin2 = styled.div`
  position: absolute; 
  transform: translate(590%, -1185%); 
  z-index: 2;
  img {
    width: 28px;   
    height: 28px;
    display: block;
  }
`;
S.MapPin3 = styled.div`
  position: absolute; 
  transform: translate(850%, -380%); 
  z-index: 2;
  img {
    width: 28px;   
    height: 28px;
    display: block;
  }
`;
S.SidePane = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.InfoCard = styled.div`
  width: 330px;
  height: 360px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
`;

S.InfoHeaderWrap = styled.div`
  display: flex;
  gap: 5px;
`;

S.InfoHeaderLeft = styled.div`
  width: 30px;
  height: 30px;
  margin: 20px 0px 0px 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.PALETTE.secondary.blue.main};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 0px 0px 0px 1.5px;
    width: 18px;
    height: 18px;
  }
`;

S.InfoCardMiddleWrap = styled.div`
  margin: 16px 0px 0px 0px;
  display: flex;
  justify-content: center;
  img {
    width: 148px;
    height: 220px;
  }
`;

S.InfoCardFloorWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  ${h6Medium}
`;

S.InfoCardTitleWrap = styled.div`
  margin: 20px 0px 0px 0px;

  ${h5Bold}
`;

S.InfoCardMovie = styled.div`
  margin: 20px 0px 0px 0px;
`;

S.InfoCardTitle = styled.div`
  margin: 20px 0px 0px 0px;
  ${h6Medium}
  color:${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.ReservationCard = styled.div`
  width: 330px;
  height: 224px;
  margin-top: 18px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
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
  background: ${({ theme }) => theme.PALETTE.primary.green.main};
`;

S.ReservationTitle = styled.div`
  ${h5Bold}
  color:${({ theme }) => theme.PALETTE.neutral.black.main};
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
  margin-top: 5px;
`;

S.ReservationLabel = styled.span`
  ${h7Medium}
  color: #666;
`;

S.ReservationValue = styled.span`
  ${h7Medium}
  color:${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.ReservationSelect = styled.select`
  width: 170px;
  height: 30px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 0 10px;
  ${h7Medium}
  color:${({ theme }) => theme.PALETTE.neutral.black.main};
  background: #fff;
  outline: none;
`;
S.Reservation = styled.span`
  display: flex;
`;

S.ReservationSeat = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.secondary.blue.main};
`;

S.ReservationAll = styled.span`
  ${h7Medium}
`;


S.ReservationButton = styled.button`
  margin-top: 12px;
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  ${h7Bold}
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.PALETTE.secondary.pink.main};
    cursor: default;

  }
`;

S.Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
  margin-top: -500px;
`;

S.SchoolInfo = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: column;
`;

S.ListTitle = styled.h2`
  margin: 38px;
  ${h4Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 24px;
`;

S.CardGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2px;
`;

S.Card = styled.div`
  margin: 38px;
  width: 330px;
  height: 380px;
  border-radius: 20px;
  background: ${({ theme }) => theme.PALETTE.neutral.white.main};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;


S.CardIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  
  img {
    width: 28px;
    height: 30px;
  }
`;


S.CardImg = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

S.SchoolName = styled.div`
  ${h5Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 8px;
`;

S.InfoLine = styled.div`
  display: flex;
  align-items: flex-start;
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  margin-bottom: 6px;
  
  img {
    width: 11px;
    height: 15px;
    margin-right: 8px;
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
    line-height: 1.4;
  }
`;


export default S;