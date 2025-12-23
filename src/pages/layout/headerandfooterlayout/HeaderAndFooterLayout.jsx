import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from '../Footer';
import FloatingButton from '../../../components/FloatingButton';

const HeaderAndFooterLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default HeaderAndFooterLayout;


