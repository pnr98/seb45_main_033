import React from "react";
import { TagBox } from "./Tag.styled";

// const Tag = ({ tags }) => {
//   return (
//     <div>
//       {tags.map((el, index) => (
//         <TagBox key={index}>{el}</TagBox>
//       ))}
//     </div>
//   );
// };

// export default Tag;

const Tag = ({ tags }) => {
  return (
    <div>
      {tags.map((el, index) => {
        if (!el) {
          return null;
        }
        return <TagBox key={index}>{el}</TagBox>;
        })
      }
    </div>
  );
};

export default Tag;
