import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Hr, NoReulst, PaginationContainer, RecipeSearchContainer, RecipesContainer, SearchText } from "./RecipeSearchPage.Styled"
import dummy from '../../common/data/dummy';
import Recipe from "../../components/Recipe/Recipe";
import Pagination from "../../components/Pagination/Pagination";
const SearchResult = () => {
    const {searchText} = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [searchList,setSearchList] = useState([])
    const [currentList,setCurrentList] = useState([])

    useEffect(()=>{
        axios.get(`/recipe/search?searchWord=${searchText}`).then((res)=>{
            if(res.status === 200){
                setSearchList(res.data.recipes)
                setCurrentPage(res.data.recipes.slice(0,25))
            }
        }).catch((res)=>{
            setSearchList(dummy)
            setCurrentList(dummy.slice(0,25))
        })
    },[])
    
    useEffect(()=>{
        const newArr = searchList.slice((currentPage-1)*25,currentPage*25)
        setCurrentList(newArr)
    },[currentPage])
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return <Container>
        <RecipeSearchContainer>
            <SearchText>
        {searchText} 검색결과
        </SearchText>
        <Hr />
        <RecipesContainer>
         {currentList && currentList.map((el)=>{
            return <Recipe info={el} key={el.recipeId}></Recipe>
         })}
        </RecipesContainer>
        {!currentList.length && <NoReulst>검색결과가 없습니다.</NoReulst>}
        <PaginationContainer>
          <Pagination 
              totalRecipes={searchList.length}
              recipesPerPage={25}
              currentPage={currentPage}
              onPageChange={handlePageChange}
          />
        </PaginationContainer>
        </RecipeSearchContainer>
        </Container>
}

export default SearchResult