import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./Recipe.styled";
import Tag from "../Tag/Tag";

const Recipe = ({ info }) => {
  return (
    <Container>
      <Link to={`/recipe/${info.id}`}>
        <img src={info.recipeImage} alt="{info.name}" />
        <div>{info.name}</div>
      </Link>
      <Tag tags={info.tags} />
    </Container>
  );
};

export default Recipe;

