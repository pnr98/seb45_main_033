import React from "react";
import { TagBox } from "./Recipe.styled";

const Tag = ({ tags }) => {
  return (
    <div>
      {tags.map((el, index) => (
        <TagBox key={index}>{el}</TagBox>
      ))}
    </div>
  );
};

export default Tag;
