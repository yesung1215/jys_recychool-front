import styled from "styled-components";
import { Link } from "react-router-dom";
import { h5Bold, h6Bold, h6Medium, h7Medium, h8Light } from "../../../styles/common";


const S = {};
S.MainWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

S.BannerWrap = styled.div`
    background:
        url('/assets/images/mainbackground.png') bottom center / 1900px auto no-repeat,
        url('/assets/images/main.png') top center /  1900px auto no-repeat;
    min-height: 930px;     
    padding-top: 50px;
    padding-bottom: 180px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

S.ContentRow = styled.div`
    width: 1400px;
    display: flex;
`

S.MapPane = styled.div`
    flex: 0 0 530px;   
    height: 590px;
    border-radius: 16px;
    overflow: hidden;
`;
S.SidePane = styled.div`
    flex: 0.65 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.IsClosedSchoolWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 61px;
    background-color: #6578F7;
    color: #FFFFFF;
    margin: 35px 0 0 0;
    border-radius: 18px;
    gap: 12px;
    ${h6Bold}
    img {
        width: 18px;
        height: 18px;
        margin: 22px 0px 22px 22px;
    }
`

S.SearchWrap = styled.div`
    position: absolute;
    top: 100%;
    width: 850px;
    height: 66px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0px 12px;
    box-sizing: border-box;
    border: 1px solid #DDDDDD;
    border-radius: 50px;
    background: #ffffff;
`;

S.FieldItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 15px 32px 0;
    label {
        ${h8Light}
        line-height: 2px;
        color: #222222;
    }

    input {
        width: 100%;
        height: 34px;
        border: none;
        outline: none;
        color: #6A6A6A;
        background: transparent;
        padding: 0;
        box-sizing: border-box;
        ${h7Medium}
    }
`;

S.Divider = styled.div`
    width: 1px;
    height: 40%;
    background: #F0F0F0;
`;

S.SearchButton = styled.button`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #70C60C;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    box-shadow: none;

    img {
        width: 20px;
        height: 20px;
    }
`;

export default S;