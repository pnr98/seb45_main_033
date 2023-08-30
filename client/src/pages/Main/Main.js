import { useEffect, useState } from "react";
import Recipe from "../../components/Recipe/Recipe";
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
export default function Main() {
  const recipeList = [{
    "id": 1,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 2,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩2",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 3,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩3",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 4,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩4",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 5,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩5",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 6,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩6",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 7,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩7",
    "tags": ["한식","저칼로리","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  }]
  const [list,setList] = useState(recipeList)
  return <div>
    <div>아기 상어 뚜루루뚜루</div>
    <ScrollMenu LeftArrow={<button>Left</button>} RightArrow={<button>Right</button>} translate={0} >{list.map((el)=>{return <Recipe info={el} key={el.id}/>})}</ScrollMenu></div>;
}

