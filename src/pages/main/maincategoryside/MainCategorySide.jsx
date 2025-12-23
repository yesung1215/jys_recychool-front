import React from 'react';
import S from './style';
import { h1Bold } from '../../../styles/common';

const MainCategorySide = ({ }) => {

    // 예약테이블 데이터 불러오면 실행행
    // if (!selected) return <p style={{ display: 'flex', justifyContent: 'center', fontSize: '60px' }}>로딩중...</p>


    return (
        <div>
            <S.CategoryParkingWrap>
                <S.CategoryTitleWrap><p>현재 주차 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryParkingWrap>
            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    <S.CategoryImages to={`/reserve/parking/${1}`}>
                        <img src='/assets/images/sample1.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/parking/${1}`}>
                        <img src='/assets/images/sample2.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/parking/${1}`}>
                        <img src='/assets/images/sample3.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/parking/${1}`}>
                        <img src='/assets/images/sample4.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>

            <S.CategoryPlaceWrap>
                <S.CategoryTitleWrap><p>현재 장소대여 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryPlaceWrap>
            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    <S.CategoryImages to={`/reserve/place/${1}`}>
                        <img src='/assets/images/sample1.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/place/${1}`}>
                        <img src='/assets/images/sample2.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/place/${1}`}>
                        <img src='/assets/images/sample3.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={`/reserve/place/${1}`}>
                        <img src='/assets/images/sample4.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>

            <S.CategoryPlaceWrap>
                <S.CategoryTitleWrap><p>무료 자동차 극장 예약 가능 학교</p></S.CategoryTitleWrap>
            </S.CategoryPlaceWrap>
            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    <S.CategoryImages to={'/movie'}>
                        <img src='/assets/images/sample1.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/movie'}>
                        <img src='/assets/images/sample2.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/movie'}>
                        <img src='/assets/images/sample3.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/movie'}>
                        <img src='/assets/images/sample4.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>
        </div>
    );
};

export default MainCategorySide;