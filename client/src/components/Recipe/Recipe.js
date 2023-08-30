import { ScrollingContainer,TagBox } from "./Recipe.styled"
const Recipe = ({info}) => {
 return <ScrollingContainer>
    <img src={`${info.recipeImage}`} alt="">
    </img>
    <div>{info.name}</div>
    {info.tags!==[] && info.tags.map((el)=> {return <TagBox key={el.id}>{el}</TagBox>})}
 </ScrollingContainer>
}

export default Recipe