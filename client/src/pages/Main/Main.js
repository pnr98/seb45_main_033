import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, MainContainer, MyFrigeWrapper, MyFrige, MyFrigeTitle, MyFrigeRecipes, WelcomeTitle1, WelcomeTitle2, FoodCategory, LatestCategoryBox, LatestCategory, RecipesContainer, Button } from './Main.styled';
import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
const category1 = ['전체', '한식', '일식', '중식', '양식', '디저트', '다이어트'];
const category2 = ['최신순', '추천순', '코멘트순', '조리시간순'];

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loadedRecipesCount, setLoadedRecipesCount] = useState(25);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSorting, setSelectedSorting] = useState('최신순');

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setSelectedCategory('전체');
    setSelectedSorting('최신순');
  }, []);

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
          {category1.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  handleCategoryClick(category);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {category}
            </div>
          ))}
        </FoodCategory>


        <LatestCategoryBox>
          <LatestCategory>
          {category2.map((sorting, index) => (
            <div
              key={index}
              className={`category ${selectedSorting === sorting ? 'active' : ''}`}
              onClick={() => setSelectedSorting(sorting)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  setSelectedSorting(sorting);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {sorting}
            </div>
          ))}
          </LatestCategory>
        </LatestCategoryBox>


        <InfiniteScroll
          loadMore={loadMoreRecipes}
          hasMore={loadedRecipesCount < dummy.length}
          threshold={500}
        >
          <RecipesContainer>
            {dummyRecipes
              .filter((recipeData) => selectedCategory === '전체' || recipeData.foodType === selectedCategory)
              .flatMap((recipeData, recipeIdx) => (
                <Recipe key={recipeIdx} info={recipeData} />
              ))}
          </RecipesContainer>
        </InfiniteScroll>
      </MainContainer>
    </Container>
  );
};

export default Main;
