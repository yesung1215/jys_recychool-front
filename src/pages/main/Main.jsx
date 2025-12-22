import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useOAuthCallback from '../../hooks/useOAuthCallback';
import S from './style';
import MainBanner from './mainbanner/MainBanner';
import MainCategorySide from './maincategoryside/MainCategorySide';

const Main = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  useOAuthCallback(key);

  return (
    <div>
      <S.MainWrap>
        <MainBanner />
        <MainCategorySide />
      </S.MainWrap>
    </div>
  );
};

export default Main;