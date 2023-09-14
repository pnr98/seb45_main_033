import Recipe from '../../components/Recipe/Recipe';
import dummy from '../../common/data/dummy';
import { Container, RecipeSearchContainer, SearchWrapper, SearchIcon, SearchInput, Hr, RecipesContainer, PaginationContainer } from './RecipeSearchPage.Styled';

const RecipeSearchPage = () => {


  const recipesPerRow = 5;
  const numDisplayedRecipes = 
    dummy.length - (dummy.length % recipesPerRow);

  const dummyRecipes = 
    dummy.slice(0, numDisplayedRecipes);

  return (
    <Container>
      <RecipeSearchContainer>
        <SearchWrapper>
          <SearchIcon alt="Search Icon" />
          <SearchInput type="text" placeholder="search..." />
        </SearchWrapper>
        <Hr />
        <RecipesContainer>
          {dummyRecipes.flatMap((recipeData, recipeIdx) => (
            <Recipe key={recipeIdx} info={recipeData} />
          ))}
        </RecipesContainer>
        <PaginationContainer>페이지네이션 컴포넌트 자리</PaginationContainer>
      </RecipeSearchContainer>
    </Container>
  );
};

export default RecipeSearchPage;