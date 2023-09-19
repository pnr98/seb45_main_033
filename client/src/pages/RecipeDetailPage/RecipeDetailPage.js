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
import dummyDetail from "../../common/data/dummyDetail"

const BASE_URL = process.env.REACT_APP_API_URL;

export default function RecipeDetailPage() {
    const currentUser = "김코딩"
    const memberId = 1

    const tags = [ dummyDetail.foodTypes, dummyDetail.difficulty, dummyDetail.cookingTime ];
    // const [ tags, setTags ] = useState({
    //     category: null,
    //     time: null,
    //     level: null,
    // })
    const navigate = useNavigate()
    const { recipe_id } = useParams()
    const [ recipeData, setRecipeData ] = useState(null)
    const [separatedIngredients, setSeparatedIngredients] = useState([]);  
    const [ showModal, setShowModal ] = useState(false)
    // const memberId = sessionStorage.getItem('memberId');
    // const currentUser = sessionStorage.getItem('username');

    useEffect(() => {
      // 상세 레시피 데이터 가져오기
      const getRecipeData = async () => {
        try { 
          const response = await axios.get(`http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/recipes/${recipe_id}`)
          // const response = await axios.get(`${BASE_URL}/recipes/${recipe_id}`)
          setRecipeData(response.data)

          // 재료
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
          // setTags({
          //   category: response.data.foodTypes,
          //   time: response.data.cookingTime,
          //   level: response.data.difficulty,
          // })
        } catch (err) {
          console.error("레시피 요청 실패: ", err)
          //
          const separatedIngredient = dummyDetail.ingredients.map(ingredient => {
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
          setRecipeData(dummyDetail)
          setSeparatedIngredients(separatedIngredient)
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

    const handleModal = () => {
      setShowModal(true)
    }
    // 수정 버튼
    const handleEdit = () => {
      navigate(`update-recipe/${recipe_id}`)
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
                        <LikeButton recipe_id={recipe_id} likes={recipeData.likes} onLikeChange={handleLikeChange}/>
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
                          recipe_id={recipe_id}
                      />
                    )}
                  </BtnContainer>)}
                <RelatedRecipe>
                  <div className='discription-title'>관련 레시피</div>
                  <div>
                    <HorizontalScroll recipe_id={recipe_id}/>
                  </div>
                </RelatedRecipe>
                <CommentsContainer>
                  <div className='discription-title'>댓글</div>
                  <CommentHandler timeSlice={timeSlice} recipeId={recipe_id} memberId={memberId}/>
                </CommentsContainer>
            </RecipeWrap>

        </Container>
    )
}