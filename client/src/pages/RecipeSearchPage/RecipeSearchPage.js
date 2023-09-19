import React, { useState } from 'react';
import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';
import Pagination from '../../components/Pagination/Pagination';
import { Container, RecipeSearchContainer, SearchWrapper, SearchIcon, SearchInput, Hr, RecipesContainer, PaginationContainer } from './RecipeSearchPage.Styled';
import { useNavigate } from 'react-router-dom';

const RecipeSearchPage = () => {
  const recipesPerRow = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText,setSearchText] = useState('')
  const recipesPerPage = 5 * recipesPerRow;
  const totalPages = Math.ceil(dummy.length / recipesPerPage);
  const navi = useNavigate()
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const displayedRecipes = dummy.slice(startIndex, endIndex);

  const enterHandle = (e) =>{
    if(e.key === 'Enter'){
      searchHandle()
    }
  }
  const searchHandle = () =>{
    if(/^\S.*$/.test(searchText)){
      navi(`/search/${searchText}`)
    }
  }
  return (
    <Container>
      <RecipeSearchContainer>
        <SearchWrapper>
          <SearchIcon alt="Search Icon" onClick={searchHandle}/>
          <SearchInput type="text" placeholder="search..." value={searchText} onChange={e=>setSearchText(e.target.value)} onKeyUp={e=>enterHandle(e)} />
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
