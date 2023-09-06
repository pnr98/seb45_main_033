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

            <div>
                <CategoryButton>전체</CategoryButton>
                <CategoryButton>한식</CategoryButton>
                <CategoryButton>양식</CategoryButton>
                <CategoryButton>일식</CategoryButton>
                <CategoryButton>중식</CategoryButton>
                <CategoryButton>디저트</CategoryButton>
                <CategoryButton>다이어트</CategoryButton>
            </div>

            <div>
                <CategoryButton>최신순</CategoryButton>
                <CategoryButton>추천순</CategoryButton>
                <CategoryButton>조리시간순</CategoryButton>
                <CategoryButton>코멘트순</CategoryButton>
            </div>

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