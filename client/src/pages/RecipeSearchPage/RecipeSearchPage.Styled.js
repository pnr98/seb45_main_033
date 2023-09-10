import { styled } from 'styled-components';
import searchIcon1 from '../../common/image/search1.png';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const RecipeSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    width: var(--main-width);
`;

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--grey);
    border-radius: 5px;
    margin-bottom: 50px;
    padding: 5px;
    width: 40vw;
`;

export const SearchIcon = styled.div`
    background-image: url(${searchIcon1});
    width: 1.8rem;
    height: 1.8rem;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 10px;
`;

export const SearchInput = styled.input`
    width: 1rem;
    height: 2rem;
    flex: 1;
    padding: 10px 15px;
    font-size: var(--font-size-16);
    border: none;
    outline: none;
`;

export const Hr = styled.hr`
  width: var(--main-width);
  color: #AAAAAA;
  margin-bottom: 80px;
`;

export const RecipesContainer = styled.div`
    width: var(--main-width);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }

    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1024px) {
        /**/
    }
`;

export const PaginationContainer = styled.div`
    margin: 80px 0 70px 0;
    text-align: center;

    border: 1px solid red;
`;