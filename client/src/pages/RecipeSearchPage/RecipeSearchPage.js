import React from 'react';
import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';
import Pagination from '../../components/Pagination/Pagination';
import { Container, RecipeSearchContainer, SearchWrapper, SearchIcon, SearchInput, Hr, RecipesContainer, PaginationContainer } from './RecipeSearchPage.Styled';

const RecipeSearchPage = () => {
  const recipesPerRow = 5;
  
  const [currentPage, setCurrentPage] = React.useState(1);
  const recipesPerPage = 5 * recipesPerRow;
  const totalPages = Math.ceil(dummy.length / recipesPerPage);
  
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const displayedRecipes = dummy.slice(startIndex, endIndex);

  return (
    <Container>
      <RecipeSearchContainer>
        <SearchWrapper>
          <SearchIcon alt="Search Icon" />
          <SearchInput type="text" placeholder="search..." />
        </SearchWrapper>
        <Hr />
        <RecipesContainer>
          {displayedRecipes.flatMap((recipeData, recipeIdx) => (
            <Recipe key={recipeIdx} info={recipeData} />
          ))}
        </RecipesContainer>
        <PaginationContainer>
          <Pagination 
              totalRecipes={dummy.length}
              recipesPerPage={recipesPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
          />
        </PaginationContainer>
      </RecipeSearchContainer>
    </Container>
  );
};

export default RecipeSearchPage;
