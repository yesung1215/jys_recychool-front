import React from 'react';
import S from './style';

const InfoCard = ({ selected }) => {
    if(!selected) {
        return <S.InfoCard style={{ display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    backgroundColor: '#6578F7', 
                                    color: '#FFFFFF', 
                                    fontWeight: '700', 
                                    fontSize: '20px'}}>지도를 클릭하면 정보가 표시됩니다.</S.InfoCard>
    }
    console.log(selected)
    return (
        <div>
            <S.InfoCard>
            {/* 인포카드 헤더 */}
            <S.InfoHeaderWrap>
                <S.InfoHeaderLeft>
                    <img src="/assets/images/pluss.png" alt="플러스 아이콘" />
                </S.InfoHeaderLeft>
            </S.InfoHeaderWrap>
            {/* 인포카드 중앙사진 */}
            <S.InfoCardMiddleWrap>
                <img src={selected.image || '/assets/images/schoolsample.png'} alt={selected.title || '미원초엄소분교장 1'}></img>
            </S.InfoCardMiddleWrap>
            {/* 인포카드 학교정보보 */}
            <S.InfoCardFloorWrap>
                <S.InfoCardTitleWrap><p>{selected.title}</p></S.InfoCardTitleWrap>
                <S.InfoCardAddressWrap> <img src="/assets/images/marker.png" alt="학교 주소" /><p>{selected.address}</p> </S.InfoCardAddressWrap>
                <S.InfoCardPhoneNumberWrap> <img src="/assets/images/phone.png" alt="학교 전화번호" /><p>{selected.phone}</p> </S.InfoCardPhoneNumberWrap>
            </S.InfoCardFloorWrap>
            <S.InfoCardFooterWrap>
                <S.InfoCardFooterParking to={`/reserve/parking/${selected.raw.id}`}><p>주차예약</p></S.InfoCardFooterParking>
                <S.InfoCardFooterPlace to={`/reserve/place/${selected.raw.id}`}><p>장소예약</p></S.InfoCardFooterPlace>
            </S.InfoCardFooterWrap>
        </S.InfoCard>
        </div >
    );
};

export default InfoCard;