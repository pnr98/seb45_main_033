import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 1rem;
`;

export const PageButton = styled.button`
    background-color: #f1f1f1;
    border: none;
    color: black;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
        background-color: #ddd;
    }

    &.active {
        background-color: #e2990d;
        color: white;
    }
`;
