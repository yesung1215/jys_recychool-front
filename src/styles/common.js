// 공통적인 css를 변수에 담아 사용할 수 있도록 제공하는 파일
import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBeetweenRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const flexBeetweenColumn = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const flexCenterRow = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const flexCenterColumn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const h1Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  line-height: ${({ theme }) => theme.FONT_LINE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h1};
`;

export const h1Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  line-height: ${({ theme }) => theme.FONT_LINE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h1};
`;

export const h1Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  line-height: ${({ theme }) => theme.FONT_LINE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h1};
`;

export const h1Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  line-height: ${({ theme }) => theme.FONT_LINE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h1};
`;

export const h2Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  line-height: ${({ theme }) => theme.FONT_LINE.h2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h2};
`;

export const h2Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  line-height: ${({ theme }) => theme.FONT_LINE.h2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h2};
`;

export const h2Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  line-height: ${({ theme }) => theme.FONT_LINE.h2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h2};
`;

export const h2Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  line-height: ${({ theme }) => theme.FONT_LINE.h2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h2};
`;

export const h3Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  line-height: ${({ theme }) => theme.FONT_LINE.h3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h3};
`;

export const h3Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  line-height: ${({ theme }) => theme.FONT_LINE.h3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h3};
`;

export const h3Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  line-height: ${({ theme }) => theme.FONT_LINE.h3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h3};
`;

export const h3Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  line-height: ${({ theme }) => theme.FONT_LINE.h3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h3};
`;

export const h4Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
  line-height: ${({ theme }) => theme.FONT_LINE.h4};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h4};
`;

export const h4Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
  line-height: ${({ theme }) => theme.FONT_LINE.h4};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h4};
`;

export const h4Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
  line-height: ${({ theme }) => theme.FONT_LINE.h4};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h4};
`;

export const h4Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
  line-height: ${({ theme }) => theme.FONT_LINE.h4};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h4};
`;

export const h5Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  line-height: ${({ theme }) => theme.FONT_LINE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h5};
`;

export const h5Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  line-height: ${({ theme }) => theme.FONT_LINE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h5};
`;

export const h5Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  line-height: ${({ theme }) => theme.FONT_LINE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h5};
`;

export const h5Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  line-height: ${({ theme }) => theme.FONT_LINE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h5};
`;

export const h6Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.FONT_LINE.h6};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h6};
`;

export const h6Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.FONT_LINE.h6};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h6};
`;

export const h6Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.FONT_LINE.h6};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h6};
`;

export const h6Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.FONT_LINE.h6};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h6};
`;

export const h7Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  line-height: ${({ theme }) => theme.FONT_LINE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h7};
`;

export const h7Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  line-height: ${({ theme }) => theme.FONT_LINE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h7};
`;

export const h7Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  line-height: ${({ theme }) => theme.FONT_LINE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h7};
`;

export const h7Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  line-height: ${({ theme }) => theme.FONT_LINE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h7};
`;

export const h8Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  line-height: ${({ theme }) => theme.FONT_LINE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h8};
`;

export const h8Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  line-height: ${({ theme }) => theme.FONT_LINE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h8};
`;

export const h8Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  line-height: ${({ theme }) => theme.FONT_LINE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h8};
`;

export const h8Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  line-height: ${({ theme }) => theme.FONT_LINE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h8};
`;

export const h9Bold = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: ${({ theme }) => theme.FONT_LINE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h9};
`;

export const h9Medium = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: ${({ theme }) => theme.FONT_LINE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h9};
`;

export const h9Light = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: ${({ theme }) => theme.FONT_LINE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h9};
`;

export const h9Thin = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: ${({ theme }) => theme.FONT_LINE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  letter-spacing: ${({ theme }) => theme.FONT_SPACE.h9};
`;
