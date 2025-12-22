import styled from "styled-components";
import { flexCenterRow, h2Bold } from "../../styles/common";

const S = {};

/* 페이지 */
S.Page = styled.div`
  width: 100%;
`;

/* 헤더와 동일 기준 */
S.Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

/* 좌우 레이아웃 */
S.ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

/* 좌측 */
S.LeftPanel = styled.div`
  width: 560px;   /* ← 핵심 */
`;

/* 우측 */
S.RightPanel = styled.div`
  width: 460px;
  margin-top: 60px;
`;

/* 지도 */
S.MapSection = styled.div`
  margin-top: 80px;

  height: 520px;          
  min-height: 520px;

  background-color: ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 12px;

  overflow: hidden;      
  margin-bottom: 120px; 
`;

/* 이하 기존 그대로 */
S.Title = styled.h2`
  ${h2Bold};
  margin-bottom: 16px;
`;

S.ImageBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 12px;
  margin-bottom: 32px;
`;

S.CalendarBox = styled.div`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.light};
  border-radius: 12px;
`;

S.InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ $last }) => ($last ? "40px" : "24px")};

  span {
    min-width: 90px;
    line-height: 3;
  }

  p {
    text-align: right;
    line-height: 3;
    margin: 0;
  }
`;

S.ReserveButton = styled.button`
  ${flexCenterRow};
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: white;
`;

export default S;
