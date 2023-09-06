import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

import {
    HeaderWrapper,
    LogoLink,
    IconLink,
    ButtonLink,
    HamburgerBar,
    DropdownMenu
} from "./Header.styled";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      const loginStatus = localStorage.getItem('isLogin') === 'true';
      setIsLogin(loginStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLogin', 'true');
    setIsLogin(true);
    closeDropdown();
  };

  const handleLogout = () => {
    localStorage.setItem('isLogin', 'false');
    setIsLogin(false);
    closeDropdown();
  };

  const handleRecipeCreation = () => {
    if (!isLogin) {
      setShowModal(true);
    } else {
      //레시피 작성 페이지로 이동
    }
    closeDropdown();
  };

  
  const Hamburger = () => {
    setShowHamburger(!showHamburger);
  };

  const closeDropdown = () => {
    setShowHamburger(false);
  };

  return (
    <HeaderWrapper>
      <LogoLink to="/">로고</LogoLink>
      <HamburgerBar onClick={Hamburger}>☰</HamburgerBar>
        <DropdownMenu show={showHamburger}>
          <IconLink to="/search" onClick={closeDropdown} showHamburger={showHamburger}>🔍</IconLink>
          <ButtonLink onClick={handleRecipeCreation} showHamburger={showHamburger}>레시피 작성</ButtonLink>
          {showModal && <Modal type="LoginPlz" func={() => setShowModal(false)} />}

              {isLogin ? (
                <>
                  <ButtonLink to="/my-page" onClick={closeDropdown} showHamburger={showHamburger}>마이페이지</ButtonLink>
                  {/* <ButtonLink onClick={handleLogout} showHamburger={showHamburger}>로그아웃</ButtonLink> */}
                </>
              ) : (
                <ButtonLink to="/login" onClick={handleLogin} showHamburger={showHamburger}>로그인</ButtonLink>
              )}
          </DropdownMenu>
    </HeaderWrapper>
  );
}

export default Header;
