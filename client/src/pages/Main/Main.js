import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
export default function Main() {
  const recipeList = [{
    recipeId: 1,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : null,
  },{
    recipeId: 2,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : "고단백질",
  },{
    recipeId: 3,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : "저지방",
  },{
    recipeId: 4,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : null,
  },{
    recipeId: 5,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : null,
  },{
    recipeId: 6,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : null,
  },{
    recipeId: 7,
    recipeName: "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    thumbnailUrl : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    foodType : "한식",
    difficulty : "중",
    cook_time : "20분",
    nutritions : null,
  }]
  const [list,setList] = useState(recipeList)
  return <div>
    <div>아기 상급어 뚜루루뚜루</div>
    <ScrollMenu LeftArrow={<button>Left</button>} RightArrow={<button>Right</button>} translate={0} >{list.map((el)=>{return <Recipe info={el} key={el.recipeId}/>})}</ScrollMenu>
    </div>;
}

