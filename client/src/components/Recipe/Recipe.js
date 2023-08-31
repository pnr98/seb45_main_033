import { Link } from "react-router-dom"
import { ScrollingContainer,TagBox } from "./Recipe.styled"
const Recipe = ({info}) => {
 return <ScrollingContainer>
    <img src={`${info.recipeImage}`} alt="">
    </img>
    <Link to={`/recipe/${info.id}`} >
    <div>{info.name}</div>
    </Link>
    {info.tags!==[] && info.tags.map((el)=> {return <TagBox key={el.id}>{el}</TagBox>})}
 </ScrollingContainer>
}

export default Recipe