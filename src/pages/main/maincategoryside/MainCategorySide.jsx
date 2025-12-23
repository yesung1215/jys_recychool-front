import React, { useMemo } from 'react';
import S from './style';
import { h1Bold } from '../../../styles/common';
import { useQuery } from '@tanstack/react-query';

const MainCategorySide = ({ }) => {

    const formatKorean = (date, showYear = false) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return showYear ? `${year}년${month}월${day}일` : `${month}월${day}일`;
    };

    const dateRange = useMemo(() => {
        const today = new Date();
        const future = new Date();
        future.setDate(today.getDate() + 30);

        const showYear = today.getFullYear() != future.getFullYear();
        return `${formatKorean(today)} ~ ${formatKorean(future, showYear)}`;
    }, [])

    const getParkingLot = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/school/parking-lot`)
        const parks = await response.json();
        return parks;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['parks'],
        queryFn: getParkingLot
    })

    const parkingLot = data?.data ?? [];

    // 학교 아이디디

    return (
        <div>
            <S.CategoryParkingWrap>
                <S.CategoryTitleWrap><p>현재 주차 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryParkingWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {parkingLot.length === 0 ? (
                        <p>로딩중...</p>
                    ) : (
                        parkingLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/parking/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImageDate>{dateRange}</S.CategoryImageDate>
                                    <S.CategoryImagePrice>₩ 20,000</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
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
                    {parkingLot.length === 0 ? (
                        <p>로딩중...</p>
                    ) : (
                        parkingLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/parking/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImageDate>{dateRange}</S.CategoryImageDate>
                                    <S.CategoryImagePrice>무료</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>
        </div >
    );
};

export default MainCategorySide;