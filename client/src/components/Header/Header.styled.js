// Header.styled.js
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  background-color: white;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  padding-left: 100px; 
  padding-right: 100px;
  box-sizing: border-box;
`;

export const LogoLink = styled(Link)`
    margin-right: 20px;
`;

export const IconLink = styled(Link)`
  font-size: 20px;
  margin-left: 80px;
  cursor: pointer;
`;

export const ButtonLink = styled(Link)`
  margin-left: 50px;
  text-decoration: none;
`;
