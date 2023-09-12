import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  //const [isLogin, setIsLogin] = useState(false);
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const [showHamburger, setShowHamburger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const loginStatus = localStorage.getItem('isLogin') === 'true';
//     setIsLogin(loginStatus);
// }, [localStorage.getItem('isLogin')]);


  // const handleLogin = () => {
  //   localStorage.setItem('isLogin', 'true');
  //   setIsLogin(true);
  //   closeDropdown();
  // };
  const handleLogin = () => {
    dispatch({ type: 'SET_LOGIN_STATUS', payload: true });
    closeDropdown();
  };


  // const handleLogout = () => {
  //   localStorage.setItem('isLogin', 'false');
  //   setIsLogin(false);
  //   closeDropdown();
  //   navigate("/");
  // };
  const handleLogout = () => {
    dispatch({ type: 'SET_LOGIN_STATUS', payload: false });
    closeDropdown();
    navigate("/");
  };


  const handleRecipeCreation = () => {
    if (!isLogin) {
      setShowModal(true);
    } else {
      navigate('/create-recipe');
    }
    closeDropdown();
  };

  
  const Hamburger = () => {
    setShowHamburger(!showHamburger);
  };

  const closeDropdown = () => {
    setShowHamburger(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <HeaderWrapper>
      <LogoLink to="/" onClick={scrollToTop}>로고</LogoLink>
      <HamburgerBar onClick={Hamburger}>☰</HamburgerBar>
        <DropdownMenu show={showHamburger}>
          <IconLink to="/search" onClick={(e) => {scrollToTop(); closeDropdown();}} showHamburger={showHamburger}></IconLink>
          <ButtonLink to="/create-recipe" onClick={handleRecipeCreation} showHamburger={showHamburger}>
            레시피 작성
          </ButtonLink>
          {isLogin ? (
            <>
              <ButtonLink to="/my-page" onClick={closeDropdown} showHamburger={showHamburger}>마이페이지</ButtonLink>
              <ButtonLink to="/" onClick={handleLogout} showHamburger={showHamburger}>로그아웃</ButtonLink>
            </>
          ) : (
            <ButtonLink to="/login" onClick={handleLogin} showHamburger={showHamburger}>로그인</ButtonLink>
          )}
          {showModal && <Modal type="LoginPlz" func={() => setShowModal(false)} />}
        </DropdownMenu>
    </HeaderWrapper>
  );
}

export default Header;