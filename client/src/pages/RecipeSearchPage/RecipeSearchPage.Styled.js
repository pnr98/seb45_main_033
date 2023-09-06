import {styled} from 'styled-components';

export const SearchContainer = styled.div`
    max-width: var(--main-width);
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px 15px;
    font-size: var(--font-size-16);
    border: 1px solid var(--grey);
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const RecipesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 20px;
`;

export const PaginationContainer = styled.div`
    margin-top: 20px;
    text-align: center;
`;

