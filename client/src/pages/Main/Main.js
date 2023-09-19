import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, MainContainer, MyFrigeWrapper, MyFrige, MyFrigeTitle, MyFrigeRecipes, WelcomeTitle1, WelcomeTitle2, FoodCategory, LatestCategoryBox, LatestCategory, RecipesContainer, Button } from './Main.styled';
import Recipe from '../../components/Recipe/Recipe';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loadedRecipesCount, setLoadedRecipesCount] = useState(25);
  const [recipes, setRecipes] = useState([]);
  const [foodType, setFoodType] = useState('All');
  const [orderBy, setOrderBy] = useState('newest');
  const [personalizedRecipes, setPersonalizedRecipes] = useState([]);
  const AccessToken = sessionStorage.getItem('Token');

  useEffect(() => {
    const loginStatus = AccessToken !== null;
    setIsLogin(loginStatus);
  }, [AccessToken]);



  console.log("로그인 상태:", isLogin);




  useEffect(() => {
    recipesGET();
  }, [foodType, orderBy, isLogin]);

  const recipesGET = () => {
    const api = `${BASE_URL}/recipes/list?foodTypes=${foodType}&orderBy=${orderBy}`;
    
    // 카테고리 레시피 카드
    axios.get(api)
        .then((response) => {
            setRecipes(response.data.recipes);
        })
        .catch((error) => {
            console.error('Err:', error);
        });
    
    // 나만의 냉장고 레시피 카드
    if (isLogin && AccessToken) {
      const headers = {
          'Authorization': `Bearer ${AccessToken}`
      };

      axios.get(api, { headers })
          .then((response) => {
              setPersonalizedRecipes(response.data.personalized);
          })
          .catch((error) => {
              console.error('Err:', error);
          });
    }

    console.log("API 호출 시작:", api);
  };

  const handleFoodCategoryClick = (selectedType) => {

    console.log("카테고리1:", selectedType);

    setFoodType(selectedType);
  };

  const handleLatestCategoryClick = (selectedOrderBy) => {

    console.log("카테고리2:", selectedOrderBy);

    setOrderBy(selectedOrderBy);
  };
  
  const loadMoreRecipes = () => {
    if (loadedRecipesCount < recipes.length) {
      setLoadedRecipesCount(prevCount => prevCount + 5);
    }
  };

  const displayedRecipes = recipes.slice(0, loadedRecipesCount);

  const foodCategories = [
    { type: 'All', label: '전체' },
    { type: 'Korean', label: '한식' },
    { type: 'Japanese', label: '일식' },
    { type: 'Chinese', label: '중식' },
    { type: 'Western', label: '양식' },
    { type: 'Etc', label: '디저트' },
    //{ type: 'Etc', label: '다이어트' }
  ];

  const orderCategories = [
    { order: 'newest', label: '최신순' },
    { order: 'likes', label: '추천순' },
    { order: 'comments', label: '코멘트순' },
    { order: 'cookingTime', label: '조리시간순' }
  ];

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
                  {/* {displayedRecipes.slice(0, 10).map((recipeData, recipeIdx) => (
                    <Recipe key={recipeIdx} info={recipeData} />
                  ))} */}
                  {personalizedRecipes.map((recipeData, recipeIdx) => (
                    <Recipe key={recipeIdx} info={recipeData} />
                  ))}
                </MyFrigeRecipes>
              </>
            )}
          </MyFrige>
        </MyFrigeWrapper>


        <FoodCategory>
          {foodCategories.map(category => (
            <div
              key={category.type}
              role="button"
              tabIndex={0}
              onClick={() => handleFoodCategoryClick(category.type)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFoodCategoryClick(category.type);
                }
              }}
            >
              {category.label}
            </div>
          ))}
      </FoodCategory>



      <LatestCategoryBox>
        <LatestCategory>
            {orderCategories.map(order => (
              <div 
                key={order.order}
                role="button"
                tabIndex={0}
                onClick={() => handleLatestCategoryClick(order.order)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleLatestCategoryClick(order.order);
                  }
                }}
              >
                {order.label}
              </div>
            ))}
        </LatestCategory>
      </LatestCategoryBox>


        <InfiniteScroll
          loadMore={loadMoreRecipes}
          hasMore={loadedRecipesCount < recipes.length}
          threshold={500}
        >
          <RecipesContainer>
            {displayedRecipes.map((recipeData, recipeIdx) => (
              <Recipe key={recipeIdx} info={recipeData} />
            ))}
          </RecipesContainer>
        </InfiniteScroll>


      </MainContainer>
    </Container>
  );
};

export default Main;