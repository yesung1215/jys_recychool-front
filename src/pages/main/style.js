import styled from "styled-components";


const S = {};


S.MainWrap = styled.div`
    width: 1900px;
    img {
        width: 1900px;
        height: 765px;
    }
`

S.BannerWrap = styled.div`
    width: 1400px;
    position: relative;

    #middle-images {
        position: absolute;
        top: 67%;
    }
`

S.MiddleWrap = styled.div`
    display: flex;
    justify-content: center;
`

S.SearchWrap = styled.div`
    position: absolute;
    
    width: 850px;
    height: 66px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
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
    min-width: 0;

    label {
        font-size: 11px;
        color: #999999;
        margin-bottom: 4px;
        line-height: 1;
    }

    input {
        width: 100%;
        height: 34px;
        border: none;
        outline: none;
        font-size: 14px;
        color: #333333;
        background: transparent;
        padding: 0;
        box-sizing: border-box;
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

    svg {
        display: block;
    }
`;

export default S;