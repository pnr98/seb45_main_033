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
    margin-bottom: 100px;
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
    background-image: ${({ isLogin }) =>
        isLogin ? "url('https://source.unsplash.com/random/?meal')" : 'none'};
    background-color: ${({ isLogin }) => (isLogin ? 'none' : '#D9D9D9')};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 0;

&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    z-index: 0;
}
`;

export const WelcomeTitle1 = styled.h1`
    font-size: 2.7rem;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 1);
    margin-bottom: 20px;
`;

export const WelcomeTitle2 = styled.p`
    font-size: 1.3rem;
    color: black;
    text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
`;



export const MyFrige = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: ${({ isLogin }) => (isLogin ? '20px 0 0 0' : '60px 0 50px 0')};
    font-size: 1.3rem;
    font-weight: bold;
    text-shadow: 0px 0px 50px rgba(255, 255, 255, 1);
    z-index: 1;
`;

export const MyFrigeTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0 50px 30px 30px;

  p {
      font-size: 1rem;
  }
`;

export const MyFrigeRecipes = styled.div`
    width: 95%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    gap: 1rem;
`;

export const Button = styled.button`
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
      outline: 2px solid #F1DAAD;
    }
`;

export const FoodCategory = styled.button`
    border: none;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 70px;
    margin: 0 0 40px 0;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12);

    div {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100%;
        transition: background-image 0.5s; 
        
        &:hover {
          background-image: linear-gradient(#E0E0E0, #F7F7F7);
        }
        &:active {
          background-image: linear-gradient(#FFEBB7, #FFFFFF00);
          font-weight: bold;
        }
    }
`;

export const LatestCategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 70px;
    padding: 5px;
    width: 100%;
`;

export const LatestCategory = styled.button`
    display: flex;
    justify-content: flex-end;
    padding: 5px;

    div {
      margin: 0 35px;

      &:active {
      font-weight: bold;
    }
    }
`;

export const RecipesContainer = styled.div`
    width: var(--main-width);
    height: 1400px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;

    &::-webkit-scrollbar {
        width: 0;
    }
    &::-webkit-scrollbar-track {
        background: transparent; 
    }
    &::-webkit-scrollbar-thumb {
        background: transparent; 
    }
    &::-webkit-scrollbar-thumb:hover {
        background: transparent; 
    }
    scrollbar-width: none;  
    -ms-overflow-style: none;   

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
`;
