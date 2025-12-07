import styled, { keyframes } from "styled-components";

// styled.p`
//   animation: ${fadeIn} 3s forward;
// `

export const fadeIn = keyframes`
  0%{
    opacity: 0;
    transform: translate(0, -30px);
  }
  
  100%{
    opacity: 1;
    transform: translate(0, 0);
  }
`

export const arrow = keyframes`
  0%{
    opacity: 0;
  }
  
  100%{
    opacity: 1;
  }
`