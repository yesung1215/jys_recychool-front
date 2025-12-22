import React, { useState } from 'react';
import S from './style';
import KakaoMap from '../map/KakaoMap';
import InfoCard from '../infocard/InfoCard';

const MainBanner = () => {
    const [selected, setSelected] = useState(null);
    return (
        <div>
            <S.BannerWrap>
                <S.ContentRow>
                    <S.MapPane>
                        <KakaoMap onSelect={setSelected}/>
                    </S.MapPane>

                    <S.SidePane>
                            <InfoCard selected={selected}/>
                        <S.IsClosedSchoolWrap><p>무료 자동차 극장 예약하기</p></S.IsClosedSchoolWrap>

                    </S.SidePane>


                    <S.SearchWrap>
                        <S.FieldItem>
                            <label>지역</label>
                            <input type="text" placeholder="서울/경기도" />
                        </S.FieldItem>

                        <S.Divider />
                        <S.FieldItem>
                            <label>날짜</label>
                            <input type="text" placeholder="날짜 추가" />
                        </S.FieldItem>

                        <S.Divider />
                        <S.FieldItem>
                            <label>학교</label>
                            <input type="text" placeholder="학교명 검색" />
                        </S.FieldItem>

                        <S.SearchButton aria-label="검색" > <img src="/assets/images/schoolsearch.png" alt="검색버튼" /> </S.SearchButton>
                    </S.SearchWrap>
                </S.ContentRow>
            </S.BannerWrap>
        </div>
    );
};

export default MainBanner;