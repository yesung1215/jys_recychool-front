import styled from "styled-components";
import { h3Bold, h4Bold, h5Bold, h6Bold, h6Medium } from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.InfoCard = styled.div`
    width: 330px;
    height: 390px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 18px 40px rgba(0,0,0,0.15);
`
S.InfoHeaderWrap = styled.div`
    display: flex;
`
S.InfoHeaderLeft = styled.div`
    width: 34px;
    height: 30px;
    margin: 20px 0px 0px 16px;
    border-radius: 5px;
    background-color: #C89A9A;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 20px;
        height: 20px;

    }
`
S.InfoCardMiddleWrap = styled.div`
    margin: 16px 0px 0px 0px;
    display: flex;
    justify-content: center;
    img {
        width: 296px;
        height: 135px;
    }
    p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 296px;
        height: 135px;
        ${h4Bold}
    }
`
S.InfoCardFloorWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0px 0px 16px;
    ${h6Medium}
`
S.InfoCardTitleWrap = styled.div`
    ${h5Bold}
`
S.InfoCardAddressWrap = styled.div`
    display: flex;
    align-items: center;
    color: #666666;
    gap: 13px;
    img {
        width: 11px;
        height: 15px;
    }
`
S.InfoCardPhoneNumberWrap = styled.div`
    display: flex;
    align-items: center;
    color: #666666;
    gap: 13px;
    img {
        width: 9px;
        height: 15px;
    }
`

S.InfoCardFooterWrap = styled.div`
    margin: 16px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${h6Bold}
`
S.InfoCardFooterParking = styled(Link)`
    width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #EFFBEA;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
`
S.InfoCardFooterPlace = styled(Link)`
    width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #70C60C;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        color: #FFFFFF;
    }
`

export default S;