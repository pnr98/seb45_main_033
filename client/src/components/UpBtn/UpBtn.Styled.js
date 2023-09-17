import { styled } from 'styled-components';
import upBtnIcon1 from '../../common/image/upBtn1.svg';
import upBtnIcon2 from '../../common/image/upBtn2.svg';

export const Button = styled.button`
    position: fixed;
    bottom: calc(var(--footer-height) + 10px);
    right: 2%;
    width: 50px;
    height: 50px;
    background-image: url(${upBtnIcon1});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.9s;

    &:hover {
      background-image: url(${upBtnIcon2});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
`;
