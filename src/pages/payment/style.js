import styled from "styled-components";
import * as C from "../../styles/common";

const S = {};

/* =============================
 * Layout (Page / Grid)
 * ============================= */

S.Page = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// 12컬럼 그리드: col=80px, gutter=40px, margin=260px
S.Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 80px);
  column-gap: 40px;
  padding: 0 260px;
  align-items: start;
`;

// 좌 7칸 / 우 5칸
S.Left = styled.section`
  grid-column: 1 / span 7;
`;

S.Right = styled.aside`
  grid-column: 8 / span 5;
`;

/* =============================
 * Left - Wrapper (회색 바탕 제거)
 * ============================= */

S.LeftWrap = styled.div`
  background: transparent;
`;

/* =============================
 * Section Header (제목 + 하단 가로선)
 * ============================= */

S.Section = styled.section`
  & + & {
    margin-top: 44px;
  }
`;

S.SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 26px;
`;

S.SectionTitle = styled.h2`
  ${C.h5Bold};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.SectionLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.PALETTE.neutral.white.dark};
`;

/* =============================
 * User Info
 * ============================= */

S.InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

S.InfoRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  column-gap: 40px;
  align-items: center;
`;

S.InfoLabel = styled.div`
  ${C.h7Medium};
  color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
`;

S.InfoValue = styled.div`
  ${C.h7Light};
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;

/* =============================
 * Pay Method (기본 radio 사용)
 * ============================= */

S.PayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

S.PayRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

S.PayLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

S.PayLogo = styled.span`
  width: 42px;
  height: 18px;
  border-radius: 6px;
  background: ${({ theme }) => theme.PALETTE.neutral.white.dark};
  ${C.flexCenter};
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;

S.PayText = styled.span`
  ${C.h7Medium};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.Radio = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;

  /* 기본 radio + 색상만 검정 */
  accent-color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

/* =============================
 * Refund Policy
 * ============================= */

S.PolicyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

S.PolicyRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  column-gap: 40px;
  align-items: center;
`;

S.PolicyKey = styled.div`
  ${C.h7Medium};
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;

S.PolicyValue = styled.div`
  ${C.h7Light};
  color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
`;


// ================================================================================
// PaymentSummery (오른쪽)

S.RightBox = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.white.dark};
  border-radius: 24px;
  padding: 34px 34px;
  min-height: 520px; 
`;






export default S;
