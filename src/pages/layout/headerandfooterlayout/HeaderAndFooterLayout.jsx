import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from '../Footer';

const HeaderAndFooterLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HeaderAndFooterLayout;


