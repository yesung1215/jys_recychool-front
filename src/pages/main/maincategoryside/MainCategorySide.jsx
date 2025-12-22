import React from 'react';
import S from './style';

const MainCategorySide = () => {
    return (
        <div>
            <S.CategoryParkingWrap>
                <S.CategoryTitleWrap><p>현재 주차 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryParkingWrap>
            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample1.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample2.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample3.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
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
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample1.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample2.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
                        <img src='/assets/images/sample3.png' alt='샘플데이터' />
                        <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
                        <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
                        <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                    </S.CategoryImages>
                    <S.CategoryImages to={'/'}>
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