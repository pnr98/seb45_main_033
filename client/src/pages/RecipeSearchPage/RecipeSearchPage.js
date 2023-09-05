import Recipe from '../../components/Recipe/Recipe';
import { SearchContainer, SearchInput , CategoryButton, RecipesContainer , PaginationContainer} from "./RecipeSearchPage.Styled"

const RecipeSearchPage = () => {

  const dummy = {
    recipeId: 1,
    thumbnailUrl: 'https://example.com/image.jpg',
    recipeName: '임시 레시피',
    foodType: '한식',
    difficulty: '하',
    cook_time: '30분',
    nutritions: null
};

    return (
          <SearchContainer>
              <SearchInput type="text" placeholder="레시피 검색" />
            <RecipesContainer>
              {Array(25).fill().map((_, idx) => (
                <Recipe key={idx} info={dummy} />
              ))}
            </RecipesContainer>

            <PaginationContainer>
            </PaginationContainer>
          </SearchContainer>

    );
};

export default RecipeSearchPage;
