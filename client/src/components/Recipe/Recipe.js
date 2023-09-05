import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./Recipe.styled";
import Tag from "../Tag/Tag";

const Recipe = ({ info }) => {
    const tags = [info.foodType, info.difficulty, info.cook_time, info.nutritions];

    return (
        <Container>
            <Link to={`/recipe/${info.recipeId}`}>
                <img src={info.thumbnailUrl} alt={info.recipeName} />
                <div>{info.recipeName}</div>
            </Link>
            <Tag tags={tags} />
        </Container>
    );
};

export default Recipe;



// const Recipe = ({ info }) => {
//   return (
//     <Container>
//       <Link to={`/recipe/${info.id}`}>
//         <img src={info.recipeImage} alt="{info.name}" />
//         <div>{info.name}</div>
//       </Link>
//       <Tag tags={info.tags} />
//     </Container>
//   );
// };

// export default Recipe;