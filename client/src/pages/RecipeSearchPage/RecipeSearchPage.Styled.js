import { styled } from 'styled-components';
import searchIcon1 from '../../common/image/search1.png';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vw;
`;

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--grey);
    border-radius: 5px;
    margin-bottom: 50px;
    padding: 5px;
    width: 45vw;
`;

export const SearchIcon = styled.div`
    background-image: url(${searchIcon1});
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 10px;
`;

export const SearchInput = styled.input`
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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 20px;
    width: var(--main-width);

  @media (max-width: 1300px) {
    /**/
  };
`;

export const PaginationContainer = styled.div`
    margin: 80px 0 70px 0;
    text-align: center;

    border: 1px solid red;
`;

