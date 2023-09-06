import React from 'react';
import Recipe from '../../components/Recipe/Recipe';
import { SearchContainer, SearchWrapper, SearchIcon, SearchInput, Hr, RecipesContainer, PaginationContainer } from './RecipeSearchPage.Styled'; // Make sure to import the updated styled components

const RecipeSearchPage = () => {
  const dummy = [
    {
      recipeId: 1,
      thumbnailUrl: 'https://source.unsplash.com/random/?food',
      recipeName: '임시 레시피 1',
      foodType: '한식',
      difficulty: '하',
      cook_time: '30분',
      nutritions: null,
    },
    {
      recipeId: 2,
      thumbnailUrl: 'https://source.unsplash.com/random/?meal',
      recipeName: '임시 레시피 2',
      foodType: '일식',
      difficulty: '중',
      cook_time: '45분',
      nutritions: null,
    },
    {
      recipeId: 3,
      thumbnailUrl: 'https://source.unsplash.com/random/?cook',
      recipeName: '임시 레시피 3',
      foodType: '양식',
      difficulty: '상',
      cook_time: '60분',
      nutritions: null,
    },
    {
      recipeId: 4,
      thumbnailUrl: 'https://source.unsplash.com/random/?food',
      recipeName: '임시 레시피 4',
      foodType: '한식',
      difficulty: '하',
      cook_time: '30분',
      nutritions: null,
    },
    {
      recipeId: 5,
      thumbnailUrl: 'https://source.unsplash.com/random/?meal',
      recipeName: '임시 레시피 5',
      foodType: '일식',
      difficulty: '중',
      cook_time: '45분',
      nutritions: null,
    },
  ];

  const dummyRecipes = Array(5).fill(dummy);

  return (
    <SearchContainer>
      
      <SearchWrapper>
        <SearchIcon alt="Search Icon" /> 
        <SearchInput type="text" placeholder="search..." />
      </SearchWrapper>

    <Hr />

    <RecipesContainer>
      {dummyRecipes.flatMap((data, idx) => (
        <div key={idx}>
          {data.map((recipeData, recipeIdx) => (
            <Recipe key={recipeIdx} info={recipeData} />
        ))}
        </div>
      ))}
    </RecipesContainer>

    <PaginationContainer>
      페이지네이션 컴포넌트 자리
    </PaginationContainer>
  </SearchContainer>
  );
};

export default RecipeSearchPage;
