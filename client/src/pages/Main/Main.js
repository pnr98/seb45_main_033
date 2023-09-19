import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, MainContainer, MyFrigeWrapper, MyFrige, MyFrigeTitle, MyFrigeRecipes, WelcomeTitle1, WelcomeTitle2, FoodCategory, LatestCategoryBox, LatestCategory, RecipesContainer, Button } from './Main.styled';
import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loadedRecipesCount, setLoadedRecipesCount] = useState(25);
  
  // useEffect(() => {
  //   const loginStatus = localStorage.getItem('isLogin') === 'true';
  //   setIsLogin(loginStatus);
  // }, []);

      useEffect(() => {
        const loginStatus = sessionStorage.getItem('Token') !== null;
        setIsLogin(loginStatus);
    }, [sessionStorage.getItem('Token')]);

  const loadMoreRecipes = () => {
    if (loadedRecipesCount < dummy.length) {
      setLoadedRecipesCount(prevCount => prevCount + 5);
    }
  };

  const dummyRecipes = dummy.slice(0, loadedRecipesCount);

  return (
    <Container>
      <MainContainer>
        <MyFrigeWrapper isLogin={isLogin}>
          <MyFrige>
            {!isLogin ? (
              <>
              <WelcomeTitle1>나만의 냉장고를 채워 보세요.</WelcomeTitle1>
              <WelcomeTitle2>냉장고의 재료로 다양한 레시피를 경험해 보세요!</WelcomeTitle2>
              <Link to='/login'><Button>재료 넣기</Button></Link>
              </>            
            ) : (
              <>
              <MyFrigeTitle>
                <div>김코딩님만을 위한 레시피</div>
                <Link to='/search'><p>+더보기</p></Link>
              </MyFrigeTitle>
              
              <MyFrigeRecipes>
              {dummyRecipes.slice(0, 10).flatMap((recipeData, recipeIdx) => (
                <Recipe key={recipeIdx} info={recipeData} />
              ))}
            </MyFrigeRecipes>
            </>                          
            )}
          </MyFrige>
        </MyFrigeWrapper>

        <FoodCategory>
            <div>전체</div>
            <div>한식</div>
            <div>일식</div>
            <div>중식</div>
            <div>양식</div>
            <div>디저트</div>
            <div>다이어트</div>
        </FoodCategory>
        <LatestCategoryBox>
          <LatestCategory>
            <div>최신순</div>
            ·
            <div>추천순</div>
            ·
            <div>코멘트순</div>
            ·
            <div>조리시간순</div>
          </LatestCategory>
        </LatestCategoryBox>

        <InfiniteScroll
          loadMore={loadMoreRecipes}
          hasMore={loadedRecipesCount < dummy.length}
          threshold={500}
        >
          <RecipesContainer>
            {dummyRecipes.flatMap((recipeData, recipeIdx) => (
              <Recipe key={recipeIdx} info={recipeData} />
            ))}
          </RecipesContainer>
        </InfiniteScroll>
      </MainContainer>
    </Container>
  );
};

export default Main;