import styled from "styled-components";
import { h5Medium, h7Bold, h8Medium } from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.CategoryParkingWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

S.CategoryPlaceWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 45px;
`

S.CategoryTitleWrap = styled.div`
    width: 1160px;
    display: flex;
    margin-bottom: 20px;
    ${h5Medium}
`
S.CategoryMiddleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
S.CategoryImageWrap = styled.div`
    width: 1160px;
    display: flex;
    justify-content: space-between;
`
S.CategoryImages = styled(Link)`
    display: flex;
    flex-direction: column;
    img {
        width: 250px;
        height: 237px;
        border-radius: 20px;
    }
`
S.CategoryImageTitle = styled.p`
    ${h7Bold}
`
S.CategoryImageDate = styled.p`
    ${h8Medium}
    line-height: 16px;
`
S.CategoryImagePrice = styled.p`
    ${h8Medium}
`

export default S;