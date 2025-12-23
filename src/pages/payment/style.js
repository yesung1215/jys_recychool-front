import styled from "styled-components";
import * as C from "../../styles/common";

const S = {};

/* =============================
 * Page / Layout (1160 fixed, Left 560 / Gap 160 / Right 440)
 * ============================= */
S.Page = styled.div`
  width: 100%;
`;

/* 1160 고정 + 가운데 정렬 + 좌우 고정 폭 + 간격 160 */
S.Grid = styled.div`
  width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  gap: 160px;
`;

S.Left = styled.section`
  width: 560px;
  flex: 0 0 560px;
`;

S.Right = styled.aside`
  width: 440px;
  flex: 0 0 440px;
`;

/* =============================
 * Left (No card, just sections)
 * ============================= */
S.LeftWrap = styled.div`
  padding-top: 40px;
`;

S.Block = styled.section`
  margin-bottom: 56px;
`;

S.BlockTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 800;
  color: #111;
`;

S.BlockLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e9e9e9;
`;

/* 이용자 정보 - 2컬럼(라벨/값) */
S.InfoGrid = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 32px;
`;

S.InfoLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;

S.InfoValue = styled.div`
  font-size: 16px;
  color: #666;
`;

/* 결제 방법 선택 */
S.PayList = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

S.PayRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

S.PayLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

S.PayIcon = styled.div`
  width: 64px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 64px;
  overflow: hidden;
`;

S.PayIconImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;

  /* 기본 */
  transform: scale(0.62);
  transform-origin: center;

  /* 토스 */
  &[data-pay="toss"] {
    transform: scale(1.5);
  }

  /* 카카오 */
  &[data-pay="kakao"] {
    transform: scale(0.68);
  }
`;

S.PayText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;

/* 피그마 느낌 라디오 */
S.RadioOuter = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 2px solid ${(p) => (p.$checked ? "#111" : "#bdbdbd")};
  display: grid;
  place-items: center;
  box-sizing: border-box;
`;

S.RadioInner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${(p) => (p.$checked ? "#111" : "transparent")};
`;

/* 환불 규정 */
S.RefundGrid = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: 140px 1fr;
  row-gap: 28px;
`;

S.RefundLeft = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #111;
`;

S.RefundRight = styled.div`
  font-size: 16px;
  color: #666;
`;

/* =============================
 * Right Summary Card
 * ============================= */
S.SummarySticky = styled.div`
  padding-top: 40px;
  position: sticky;
  top: 24px;
`;

S.SummaryCard = styled.div`
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 24px;
  padding: 38px 36px;
  box-sizing: border-box;
  background: #fff;
`;

S.SummaryTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 28px;
  font-weight: 900;
  color: #111;
`;

S.SummaryLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e9e9e9;
  margin-bottom: 26px;
`;

S.SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  row-gap: 28px;
  column-gap: 24px;
  align-items: center;
`;

S.SummaryKey = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #111;
`;

S.SummaryVal = styled.div`
  font-size: 16px;
  color: #666;
  text-align: right;
`;

S.SummaryValPrice = styled.div`
  ${C.h4Bold}
  color: ${({ theme }) => theme.PALETTE.secondary.pink.main};
  text-align: right;
`;

S.PayButton = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 44px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
`;

/* =============================
 * CompleteConfirm 
 * ============================= */
S.CompleteWrap = styled.div`
  width: 920px;           
  margin: 0 auto;
  box-sizing: border-box;
  padding: 110px 0 140px;
`;

S.CompleteCard = styled.section`
  width: 100%;
`;

S.CompleteTitle = styled.h1`
  margin: 0;
  text-align: center;
  ${C.h3Medium}
  color: #111;
`;

S.CompleteDivider = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.55);
`;


S.CompleteTable = styled.div`
  width: 100%;
`;

S.CompleteRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.75);
  background: rgba(0, 0, 0, 0.04);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 28px;
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

/* 버튼 */
S.CompleteButtonRow = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 48px;
`;

S.CompletePrimaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
`;

S.CompleteSecondaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  background-color: #EFFBEA;
  color: rgba(0, 0, 0, 0.75);
`;

export default S;
