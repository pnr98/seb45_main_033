import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, MainContainer, MyFrigeWrapper, MyFrige, Title, FoodCategoryBox, FoodCategory, LatestCategoryBox, LatestCategory, RecipesContainer, ButtonLink } from './Main.styled';
import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';

const Main = () => {
  //const [isLogin, setIsLogin] = useState(false);
  // useEffect(() => {
  //   const loginStatus = localStorage.getItem('isLogin') === 'true';
  //   setIsLogin(loginStatus);
  // }, []);
  const isLogin = useSelector(state => state.isLogin);

  const recipesPerRow = 5;
  const MyFrigeRecipes = 
    dummy.length - (dummy.length % recipesPerRow);

  const dummyRecipes = 
    dummy.slice(0, MyFrigeRecipes);

  return (
    <Container>
      <MainContainer>
        <MyFrigeWrapper>
          <MyFrige>
            {isLogin ? (
              dummyRecipes.slice(0, 10).flatMap((recipeData, recipeIdx) => (
                <Recipe key={recipeIdx} info={recipeData} />
              ))
            ) : (
              <>
                <Title>나만의 냉장고를 채워 보세요.</Title>
                <p>냉장고의 재료로 다양한 레시피를 경험해 보세요!</p>
                <ButtonLink to="/Login">재료 넣기</ButtonLink>
              </>
            )}
          </MyFrige>
        </MyFrigeWrapper>
        <FoodCategoryBox>
          <FoodCategory>
            <div>전체</div>
            <div>한식</div>
            <div>일식</div>
            <div>중식</div>
            <div>양식</div>
            <div>디저트</div>
            <div>다이어트</div>
          </FoodCategory>
        </FoodCategoryBox>
        <LatestCategoryBox>
          <LatestCategory>
            <div>최신순</div>
            <div>·</div>
            <div>추천순</div>
            <div>·</div>
            <div>코멘트순</div>
            <div>·</div>
            <div>조리시간순</div>
          </LatestCategory>
        </LatestCategoryBox>
        <RecipesContainer>
          {dummyRecipes.flatMap((recipeData, recipeIdx) => (
            <Recipe key={recipeIdx} info={recipeData} />
          ))}
        </RecipesContainer>
      </MainContainer>
    </Container>
  );
};

export default Main;
