import React, { useState } from 'react';
import S from "./style";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    if (open) {
    setSchoolOpen(false);
    }
  }

  const toggleSchoolMenu = () => {
    setSchoolOpen(prev => !prev);
  };

  return (
    <>
    <S.FloatingWrapper>
      

      {open && (
        <S.SubFloatingButton>
          <S.SchoolFloating>
            
            {schoolOpen && (
              <S.SchoolFloationButton>
                <S.SchoolFloationButton1>1</S.SchoolFloationButton1>
                <S.SchoolFloationButton2>2</S.SchoolFloationButton2>
                {/* <S.SchoolFloationButton3>3</S.SchoolFloationButton3> */}
              </S.SchoolFloationButton>
            )}
            <S.SubFloatingButton3 onClick={toggleSchoolMenu}>
              <img src="/assets/images/schooll.png" alt="학교" />
            </S.SubFloatingButton3>
            
            
          </S.SchoolFloating>
          
          
          <S.SubFloatingButton2>
            <img src="/assets/images/event.png" alt="행사" />
          </S.SubFloatingButton2>
          <S.SubFloatingButton1>
            <img src="/assets/images/car.png" alt="자동차" />
          </S.SubFloatingButton1>
        </S.SubFloatingButton>
      )}
          
      <S.FloatingButton onClick={toggleMenu}>
        <img src="/assets/images/calender.png" alt="달력" />
      </S.FloatingButton>
    </S.FloatingWrapper>
      
    </>
  );
};

export default FloatingButton;