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
  >img{
    height: 40px;
  }
`;

export const IconLink = styled(Link)`
  background-image: url(${searchIcon2});
  background-size: contain;
  background-repeat: no-repeat;
  height: auto;
  width: 35px;
  visibility: visible;
  &:hover {
      background-image: url(${searchIcon1});
    }
  @media (max-width: 710px) {
    visibility: visible;
    margin-left: 0px;
  }
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  visibility: visible;
  border-radius: 8px;
  display: flex;
  align-items: center;
  color: #414141;
  font-weight: 600;
  padding: 8px 15px;
  &:hover {
    background-color: #f1f1f1;
    color: #E2990b;
  }

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
  gap: 50px;
  .icon-container {
    cursor: pointer;
    border-radius: 8px;
    padding: 3px 8px;
    display: flex;
    &:hover {
      background-color: #f1f1f1;
    }
  }
  @media (max-width: 710px) {
    position: absolute;
    top: 60px;
    right: 100px;
    background-color: white;
    border: 1px solid #ccc;
    display: ${props => (props.show ? 'block' : 'none')};
  }
`;