import styled from "styled-components";
import { h3Medium, h4Bold, h4Medium, h5Bold, h5Medium, h6Bold, h6Light, h6Medium, h7Bold, h7Medium, h8Light, h8Medium } from "../../../styles/common";

const S = {};

S.Body = styled.main`
  padding: 70px 16px 90px;
`;

S.CenterWrap = styled.section`
  max-width: 760px;
  margin: 0 auto;
`;

S.Title = styled.h2`
  text-align: center;
  font-size: 22px;
  ${h4Bold}
  margin: 0 0 15px 0;
`;

S.StateText = styled.p`
  text-align: center;
  margin: 18px 0 0;
`;

S.InfoTable = styled.table`
  width: 640px;
  max-width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
  border-top: 2px solid #777;

  th,
  td {
    border-bottom: 1px solid #e5e5e5ff;
    padding: 14px 18px;
  }

  th {
    width: 140px;
    background: #F9FAFB;
    text-align: center;
    color: #444;
  }
`;

S.ButtonRow = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  gap: 26px;
`;

S.PrimaryButton = styled.button`
  width: 260px;
  height: 52px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  ${h5Medium}
  cursor: pointer;

`;

S.SecondaryButton = styled.button`
  width: 260px;
  height: 52px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.light};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  ${h6Medium}
  cursor: pointer;

`;



export default S;
