import styled from "styled-components";
import { h6Bold } from "../../../../styles/common";


const S = {};

S.HeaderWrap = styled.div`
    width: 1900px;
    display: flex;
    justify-content: center;
    align-items: center;
`
S.InnerWrap = styled.div`
    width: 1400px;
    height: 82px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 154px;
    }
`



S.RightWrap = styled.div`
    display: flex;
    gap: 15px;
    ${h6Bold}
`

S.loginWrap = styled.div`
    width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #EFFBEA;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
`

S.SignInWrap = styled.div`
        width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #70C60C;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`

S.MyPageWrap = styled.div`
        width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #EFFBEA;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
`

S.LogOut = styled.div`
            width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #70C60C;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default S;