import axios from "axios"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const dommyData = {
    "foodTypes": "한식",
    "difficulty": "하",
    "recipeName": "김치찌개",
    "mainImageUrl": "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png",
    "recipeDescription": "마쉿는 김치찌개(더미데이터니 사진은 신경쓰지 마시오)",
    "userName": "전우치",
    "cookingTime": 30,
    "views": 55,
    "likes": 22,
    "commentCount": 3,
    "timestamp": "2023-08-15T15:49:20.753395",
    "steps": [                     
      {
        "stepNumber": 1,
        "recipeContent": "김치를 손질합니다.",
        "contentImage": "https://i.ibb.co/k1n2Gxm/image.jpg" 
      },
      {
        "stepNumber": 2,
        "recipeContent": "물과 함께 끓입니다.",
        "contentImages": "https://i.ibb.co/hHYvKbq/image.jpg"
      }
      ],
    "ingredients": [ "김치", "두부", "돼지고기", "고추장", "간장", "다진마늘" ]
  }
const timeSlice = (time) =>{
    return time.slice(0,4)+'.'+time.slice(5,7)+'.'+time.slice(8,10)
}
const RecipeDetail = () =>{
    const recipe_id = useParams()
    const [recipeData,setRecipeData] = useState(null)
    useEffect(()=>{
        axios.get(`/recipes/${recipe_id}`).then((res)=>{
            if(res.status === 200){
                setRecipeData(res.data)
            }
        }).catch((res)=>{
            setRecipeData(dommyData)
        })
    },[])
    return <div>{recipeData && <div>                {/*레시피 데이터가 존재할경우 (요청성공시 요청 데이터 에러 캐치시 더미데이터)*/}
        <img src={recipeData.mainImageUrl} alt=""/> {/*이미지 띄우고 */}
        <div>{recipeData.recipeName}                {/*이름 띄우고 */}
        <span>{recipeData.likes}</span>
        </div>
        <div>
            <span>작성자 {recipeData.userName}</span>
            <span>작성일 {timeSlice(recipeData.timestamp)}</span>
            <span>조회수 {recipeData.views}</span>
        </div>
        <div>
            <div>메뉴설명</div>
            <span>{recipeData.recipeDescription}</span>
        </div>
        <div>
            재료
            <div>
                {recipeData.ingredients.map((el,index)=>{
                    return <div key={index}>{el}</div>
                })}
            </div>
        </div>
        <div>
            {recipeData.steps.map((el,index)=>{
                return<div key={index}>
                    <img src={el.contentImage} alt=""/>
                    <div>{el.recipeContent}</div>
                </div>
            })}
        </div>
        </div>}</div>
}

export default RecipeDetail