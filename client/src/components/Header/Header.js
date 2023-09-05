import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
      const loginStatus = localStorage.getItem('isLogin') === 'true';
      setIsLogin(loginStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLogin', 'true');
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.setItem('isLogin', 'false');
    setIsLogin(false);
  };

  const Hamburger = () => {
    setShowHamburger(!showHamburger);
  };

  return (
    <HeaderWrapper>
      <LogoLink to="/">로고</LogoLink>
      <HamburgerBar onClick={Hamburger}>☰</HamburgerBar>
        <DropdownMenu show={showHamburger}>
          <IconLink to="/search" showHamburger={showHamburger}>🔍</IconLink>
              {isLogin ? (
                <>
                  <ButtonLink showHamburger={showHamburger}>글 작성</ButtonLink>
                  <ButtonLink to="/my-page" showHamburger={showHamburger}>마이페이지</ButtonLink>
                  <ButtonLink onClick={handleLogout} showHamburger={showHamburger}>로그아웃</ButtonLink>
                </>
              ) : (
                <ButtonLink to="/login" onClick={handleLogin} showHamburger={showHamburger}>로그인</ButtonLink>
              )}
          </DropdownMenu>
    </HeaderWrapper>
  );
}

export default Header;
