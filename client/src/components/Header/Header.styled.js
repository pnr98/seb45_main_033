import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import searchIcon1 from '../../common/image/search1.png';
import searchIcon2 from '../../common/image/search2.png';

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
  padding: 10px 20px;
  padding-left: 100px; 
  padding-right: 100px;
  box-sizing: border-box;
  flex-direction: row;
  z-index: 998;
`;

export const LogoLink = styled(Link)`
  margin-right: 20px;
`;

export const IconLink = styled(Link)`
  font-size: 20px;
  margin: 5px 5px 5px 0;
  visibility: visible;
  cursor: pointer;
  background-image: url(${searchIcon1});
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 710px) {
    visibility: visible;
    margin-left: 0px;
  }

  &:hover {
    background-image: url(${searchIcon2});
  }
`;

export const ButtonLink = styled(Link)`
  margin-left: 50px;
  text-decoration: none;
  visibility: visible;

  @media (max-width: 710px) {
    visibility: visible;
    margin-left: 0px;
    border-top: 1px solid lightgray;
  }
`;

export const HamburgerBar = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: none;

  @media (max-width: 710px) {
    display: block;
  }
`;

export const DropdownMenu = styled.div`
  display: flex;
  position: static;

  @media (max-width: 710px) {
    position: absolute;
    top: 60px;
    right: 100px;
    background-color: white;
    border: 1px solid #ccc;
    display: ${props => (props.show ? 'block' : 'none')};
  }

  a, div {
    padding: 12px 12px;
    display: block;
  }
  a:hover, div:hover {
    background-color: #f1f1f1;
  }
`;
