import { 
  Container, 
  RecipeWrap, 
  RecipeInfoContainer, 
  RelatedRecipe, 
  RecipeDescription,
  IngredientsContainer,
  RecipeStepWrap,
  BtnContainer,
  CommentsContainer
} from './RecipeDetailPage.styled'
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
import Tag from '../../components/Tag/Tag'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"
import LikeButton from './IsLike'
import CommentHandler from './Comment'
import { Button } from './Comment.styled'
import Modal from '../../components/Modal/Modal'


export default function RecipeDetailPage() {
    const data = {
        "foodTypes": "한식",
        "difficulty": "하",
        "recipeName": "김치찌개",
        "mainImageUrl": "https://source.unsplash.com/random/?Supper",
        "recipeDescription": "두부로 만드는 건강하고 맛있는 한 끼 식사! 오늘은 정말 너~무 맛있어서 다들 맛보셨으면 하는 레시피를 들고 왔답니다! 바로 식물 단백질이 풍부한 두부로 만든 두부 덮밥인데요. 두부 덮밥은 먹음직스럽게 도톰하게 썬 두부를 간장 베이스로 졸여 밥 위에 얹으면 완성! 고추냉이와 다진 생강을 곁들이면 감칠맛이 나기 때문에 이건 꼭 같이 드셔보시길 추천할게요. 만들기도 간단하고 맛도 좋아 누구나 좋아할 두부 덮밥. 이런저런 요리하기 귀찮다면 반찬 필요 없는 두부 덮밥 한 번 만들어 보세요!",
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
          },
          {
            "stepNumber": 2,
            "recipeContent": "물과 함께 끓입니다.",
          },
          {
            "stepNumber": 3,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          },
          {
            "stepNumber": 4,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다. 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          },
          {
            "stepNumber": 5,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          }
          ],
        "ingredients": [ "김치 10g", "두부 100g", "돼지고기 200g", "고추장 두스푼", "간장 1티스푼", "다진 마늘 4g" ]
      }

    const tags = [ data.foodTypes, data.difficulty, data.cookingTime ];
    const navigate = useNavigate()
    const { recipeId } = useParams()
    const [ recipeData, setRecipeData ] = useState(null)
    const [separatedIngredients, setSeparatedIngredients] = useState([]);  
    const [ showModal, setShowModal ] = useState(false)
    const memberId = 1

    // 수정, 삭제 버튼 표시 여부
    const currentUser = "전우치"

    useEffect(() => {
      // 상세 레시피 데이터 가져오기
      const getRecipeData = async () => {
        try { 
          const response = await axios.get(`/${recipeId}`)
          setRecipeData(response.data)
          console.log(response.data);

          // 재료
          const ingredients = response.data.ingredients;
          const separatedIngredient = recipeData.ingredients.map(ingredient => {
            const regex = /(.+)\s+(\S+)$/; // 뒤에서부터 공백으로 나눔.
            const matches = ingredient.match(regex)
            if(matches && matches.length === 3) {
              return {
                name: matches[1], // 재료이름
                quantity: matches[2] // 양
              }
            } else {
              return {
                name: ''
              }
            }
          });
          setSeparatedIngredients(separatedIngredient)
          console.log(separatedIngredient)
        } catch (err) {
          setRecipeData(data)
          
          const separatedIngredient = data.ingredients.map(ingredient => {
            const regex = /(.+)\s+(\S+)$/; // 뒤에서부터 공백으로 나눔.
            const matches = ingredient.match(regex)
            if(matches && matches.length === 3) {
              return {
                name: matches[1], // 재료이름
                quantity: matches[2] // 양
              }
            } else {
              return {
                name: '',
                quantity: '',
              }
            }
          });
          setSeparatedIngredients(separatedIngredient)
          console.log(separatedIngredient)
          console.error(err)
        }
      }

      getRecipeData()
    }, [])

    if (recipeData === null) {
      return <div>Loading...</div>;
    }

    // 시간 포맷 변환
    const timeSlice = (time) => {
      if (time) {
        return `${time.slice(0, 4)}.${time.slice(5, 7)}.${time.slice(8, 10)}`;
      }
      return "";
    }

    // 좋아요 수 변경
    const handleLikeChange = (likeChange) => {
      setRecipeData((prevData) => ({
        ...prevData,
        likes: prevData.likes + likeChange,
      }))
    }

    // 삭제 버튼 
    // const handleDeleteClick = async () => {
    //   try {
    //     const response = await axios.delete(`/${recipeId}`);
    //     if (response.status === 204) {
    //       navigate(`/`)
    //     } else if (response.status === 401) {
    //       alert('로그인이 필요한 기능입니다.')
    //     }
    //   } catch (err) {
    //     console.error('삭제 요청 오류: ', err)
    //   }
    // }

    const handleModal = () => {
      setShowModal(true)
    }
    // 수정 버튼
    const handleEdit = () => {
      navigate(`update-recipe/${recipeId}`)
    }


    return (
        <Container>
            <RecipeWrap>
                <RecipeInfoContainer>
                    <div className='image-wrap'>
                        <img src={recipeData.mainImageUrl} alt=''>
                        </img>
                    </div>
                    <div className='header'>
                      <div className='recipe-title'>{recipeData.recipeName}</div>
                      <div className='like-button'>
                        <LikeButton recipeId={recipeId} likes={recipeData.likes} onLikeChange={handleLikeChange}/>
                      </div>
                    </div>
                    <div className='tag'>
                      <Tag tags={tags} /> 
                    </div>
                    <div className='recipe-info'>
                      <div className='detail'>
                        <div>작성자 </div>
                        <div>{recipeData.userName}</div>
                      </div>
                      <div className='detail'>
                        <div>작성일 </div>
                        <div>{timeSlice(recipeData.timestamp)}</div>
                      </div>
                      <div className='detail'>
                        <div>조회수 </div>
                        <div>{recipeData.views}</div>
                      </div>
                    </div>
                </RecipeInfoContainer>
                <RecipeDescription>
                  <div className='discription-title'>메뉴설명</div>
                  <p>{recipeData.recipeDescription}</p>
                </RecipeDescription>
                <IngredientsContainer>
                  <div className='discription-title'>재료</div>
                  <div className='ingredients'>
                    <ul>
                      {separatedIngredients.map((el, index) => {
                        return <li key={index}>
                                  <div>
                                    <div className='name'>{el.name}</div>
                                    <div className='quantity'>{el.quantity}</div>
                                  </div>
                              </li>
                      })}
                    </ul>
                  </div>
                </IngredientsContainer>
                <RecipeStepWrap>
                  <div className='discription-title'>레시피</div>
                  <ul>
                    {recipeData.steps.map((el, index) => {
                      return <li key={index}>
                                <div className='step-number'>Step {el.stepNumber}</div>
                                <div className='step-content'>{el.recipeContent}</div>
                              </li>
                    })}
                  </ul>
                </RecipeStepWrap>

                  {(recipeData && recipeData.userName === currentUser) && 
                  (<BtnContainer>
                    <Button onClick={handleEdit} boxColor="orange">수정</Button>
                    <Button onClick={handleModal}>삭제</Button>
                    {showModal && (
                      <Modal 
                          type="Delete"
                          func={() => setShowModal(false)}
                          recipe_id={recipeId}
                      />
                    )}
                  </BtnContainer>)}
                <RelatedRecipe>
                  <div className='discription-title'>관련 레시피</div>
                  <div>
                    <HorizontalScroll recipeId={recipeId}/>
                  </div>
                </RelatedRecipe>
                <CommentsContainer>
                  <div className='discription-title'>댓글</div>
                  <CommentHandler timeSlice={timeSlice} recipeId={recipeId} memberId={memberId}/>
                </CommentsContainer>
            </RecipeWrap>

        </Container>
    )
}