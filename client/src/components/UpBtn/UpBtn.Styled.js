import { styled } from 'styled-components';

export const ScrollButton = styled.button`
    position: fixed;
    right: 20px;
    bottom: 60px;
    width: 50px;
    height: 50px;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    background-image: url('../../../common/image/upBtn.svg');
    background-size: cover;
    z-index: 1000;
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;
