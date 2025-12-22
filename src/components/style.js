import styled from "styled-components";

const S = {};

S.FloatingWrapper = styled.div`
  position: fixed;
  right: 40px;
  bottom: 80px;
  z-index: 1000;
`;

S.FloatingButton = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 34px;
  img{
    width: 34px;
    height: 34px;
  }
 
`;

S.SubFloatingButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

S.SubFloatingButton1 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 34px;
    height: 34px;
  }
`;

S.SubFloatingButton2 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 34px;
    height: 34px;
  }
`;

S.SubFloatingButton3 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 34px;
    height: 34px;
  }
`;


S.SchoolFloationButton = styled.div`
  position: absolute;
  right: 80px;        
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  gap: 16px;
`;
S.SchoolFloationButton1 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
`;
S.SchoolFloationButton2 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
`;
S.SchoolFloationButton3 = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
`;

S.SchoolFloating = styled.div`
  position: relative;
`;


export default S;