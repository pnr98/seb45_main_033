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

  @media (max-width: 710px) {
    visibility: ${props => (props.showHamburger ? 'visible' : 'hidden')};
    margin-left: 0px;
  }
`;

export const ButtonLink = styled(Link)`
  margin-left: 50px;
  text-decoration: none;

  @media (max-width: 710px) {
    visibility: ${props => (props.showHamburger ? 'visible' : 'hidden')};
    margin-left: 0px;
    border-top: 1px solid lightgray;
  }
`;

export const HamburgerBar = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  
  @media (max-width: 710px) {
    display: block;
  }
`;

export const DropdownMenu = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  right: 100px;
  background-color: white;
  border: 1px solid #ccc;
  
  @media (min-width: 711px) {
    display: none;
  }
  a, div {
    padding: 12px 12px;
    display: block;
  }
  a:hover, div:hover {
    background-color: #f1f1f1;
  }
`;

