import { styled } from 'styled-components';
import searchIcon1 from '../../common/image/search1.png';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    width: var(--main-width);
`;

export const MyFrigeWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 0 0 50px 0;
    width: 100%;
    background-image: url('https://source.unsplash.com/random/?meal');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;

&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    z-index: -1;
}
`;

export const Title = styled.h1`
    font-size: 2.7rem;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 50px rgba(0, 0, 0, 100);
    margin-bottom: 20px;
`;

export const MyFrige = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 70px 0 50px 0;
    font-size: 1.3rem;
    font-weight: bold;
    text-shadow: 0px 0px 50px rgba(255, 255, 255, 1);
    /* background-image: url('https://source.unsplash.com/random/?meal');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; */
`;

export const FoodCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    margin: 0 0 40px 0;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12);
`;

export const ButtonLink = styled.button`
    padding: 10px 15px;
    background-color: #E2990B;
    border-radius: 5px;
    font-size: 1rem;
    margin-top: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color 0.4s, border 0.2s;

    &:hover {
      background-color: #DDAF55;
      border: 2px solid #F1DAAD;
    }
`;

export const FoodCategory = styled.button`
    display: flex;
    justify-content: space-between;
    width: 100%; 
    padding: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;

    div {
        flex: 1;
        text-align: center;
        padding: 5px 10px;
        
        &:hover {
          background-color: #f5f5f5;
        }
        &:active {
          background-color: #FFEBB7, #FFFFFF00;
        }
    }
`;

export const LatestCategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 70px;
    padding: 5px;
    width: 100%
`;

export const LatestCategory = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px;

    div {
      margin: 0 20px;
    }
    &:active {
      font-weight: bold;
    }
`;

export const RecipesContainer = styled.div`
    width: var(--main-width);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    margin-bottom: 100px;

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