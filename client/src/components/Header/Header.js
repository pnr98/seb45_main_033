import React, { useState, useEffect } from 'react';
import {
    HeaderWrapper,
    LogoLink,
    IconLink,
    ButtonLink,
} from "./Header.styled";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

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

    return (
      <HeaderWrapper>
        <LogoLink to="/">로고</LogoLink>
            <div>
              <IconLink to="/search">🔍</IconLink>
                {isLogin ? (
                  <>
                    <ButtonLink>글 작성</ButtonLink>
                    <ButtonLink to="/my-page">마이페이지</ButtonLink>
                    <ButtonLink onClick={handleLogout}>로그아웃</ButtonLink>
                  </>
                ) : (
                  <ButtonLink to="/login" onClick={handleLogin}>로그인</ButtonLink>                )}
            </div>
      </HeaderWrapper>
    );
}

export default Header;
