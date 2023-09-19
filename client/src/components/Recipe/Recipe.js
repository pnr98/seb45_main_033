import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./Recipe.styled";
import Tag from "../Tag/Tag";

const Recipe = ({ info }) => {
    const tags = [info.foodType, info.difficulty, info.cookTime, info.nutritions];

    return (
        <Container>
            <Link to={`/recipe/${info.recipeId}`}>
                <img src={info.mainImageUrl} alt={info.recipeName} />
                <div>{info.recipeName}</div>
            </Link>
            <Tag tags={tags} />
        </Container>
    );
};

export default Recipe;