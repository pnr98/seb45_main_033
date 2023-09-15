import { useEffect, useState } from "react"
import { IngredientContainer, LikeTagBox , LikeContainer,LikeInput , ButtonContainer,
     CancelBtn, WriteBtn, DisLikeContainer, DisLikeTagBox,DisLikeInput, AllergyContainer, AllergyTagBox, AllergyInput,
    BtnLineContainer, ErrText,Box, FrigeTitle, FrigeContainer, RecipeTitle, UpdateBtn, RightFlex, ResetBtn, Tag} from "./MyFrige.Styled"
import axios from "axios"
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
const dummyData = {
    preferredIngredients : ["김치","소고기","당근","미역","피망"],
    dislikedIngredients : ["감자","양파","돼지고기","깻잎","고등어"],
    allergyIngredients : ["새우","우유","게",],
    myRecipes: [{
        "id": 1,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩1",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 2,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩2",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 3,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩3",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 4,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩4",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 5,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩5",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 6,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩6",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      },{
        "id": 7,
        "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩7",
        "tags": ["한식","상급","10분"],
        "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
      }],
      likedRecipes: [
        {
            "id": 1,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩1",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 2,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩2",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 3,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩3",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 4,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩4",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 5,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩5",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 6,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩6",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          },{
            "id": 7,
            "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩7",
            "tags": ["한식","상급","10분"],
            "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
          }
      ]
}
const listDummyData = [{
    "id": 1,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩1",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 2,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩2",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 3,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩3",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 4,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩4",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 5,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩5",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 6,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩6",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  },{
    "id": 7,
    "name": "메론 비쉬사이즈와 아몬드젤리를 곁들인 아보카도 킹크랩7",
    "tags": ["한식","상급","10분"],
    "recipeImage" : "https://i.ibb.co/qJ2PyD1/4a8853aa-fd23-4646-a6ae-1eb423bc74e6-Kakao-Talk-20210217-214203816-jpg.png"
  }]
const MyFrige = () => {
    const [like,setLike] = useState([])
    const [addLike,setAddLike] = useState('')
    const [likeErr,setLikeErr] = useState('')
    const [disLike,setDisLike] = useState([])
    const [addDisLike,setAddDisLike] = useState('')
    const [disLikeErr,setDisLikeErr] = useState('')
    const [allergy,setAllergy] = useState([])
    const [addAllergy,setAddAllergy] = useState('')
    const [allergyErr,setAllergyErr] = useState('')
    const [myRecipe,setMyRecipe] = useState([])
    const [likedRecipe,setLikedRecipe] = useState([])
    
    const gapRegex = /^\S+$/;

    const axiosData = () => {
      const header = {
        Headers : {
            Authorization: `Bearer {access_token}`
        }
    }
    axios.get(`/mypage/refrigerator/{user-id}`,'', header).then((res)=>{
        setLike(res.data.preferredIngredients)
        setDisLike(res.data.dislikedIngredients)
        setAllergy(res.data.allergyIngredients)
        setLikedRecipe(res.data.likedRecipes)
        setMyRecipe(res.data.myRecipes)
    }).catch((res)=>{
        setLike(dummyData.preferredIngredients)
        setDisLike(dummyData.dislikedIngredients)
        setAllergy(dummyData.allergyIngredients)
    })
    }
    useEffect(()=>{
      axiosData()
    },[])

    const addHandle = (type,e) =>{
        type === 'like' && setAddLike(e.target.value)
        type === 'dislike' && setAddDisLike(e.target.value)
        type === 'allergy' && setAddAllergy(e.target.value)
    }
    const clearText = (type) =>{
        if(type === 'like'){
            setAddLike('')
            setLikeErr('')
        }
        if(type === 'dislike'){
            setAddDisLike('')
            setDisLikeErr('')
        }
        if(type === 'allergy'){
            setAddAllergy('')
            setAllergyErr('')
        }
    }
    const pushText = (type) =>{
        if(type === 'like' && !like.includes(addLike) && addLike.length <=5 && addLike.length && gapRegex.test(addLike)){
            setLike([...like,addLike])
            setAddLike('')
            setLikeErr('')
        }else if(like.includes(addLike)){
            setLikeErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(addLike.length >5){
            setLikeErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'like' && addLike.length===0){
            setLikeErr('재료를 입력해 주세요.')
        }else if(type === 'like' && !gapRegex.test(addLike)){
          setLikeErr('재료에 공백을 포함할 수 없습니다.')
      }
        
        if(type === 'dislike' && !disLike.includes(addDisLike) && addDisLike.length <=5 && addDisLike.length && gapRegex.test(addDisLike)){
            setDisLike([...disLike,addDisLike])
            setAddDisLike('')
            setDisLikeErr('')
        }else if(disLike.includes(addDisLike)){
            setDisLikeErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(type === 'dislike' && addDisLike.length >5){
            setDisLikeErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'dislike' && !addDisLike.length){
            setDisLikeErr('재료를 입력해 주세요.')
        }else if(type === 'dislike' && !gapRegex.test(addDisLike)){
            setDisLikeErr('재료에 공백을 포함할 수 없습니다.')
        }
        
        if(type === 'allergy' && !allergy.includes(addAllergy) && addAllergy.length <=5 && addAllergy.length && gapRegex.test(addAllergy)){
            setAllergy([...allergy,addAllergy])
            setAddAllergy('')
            setAllergyErr('')
        }else if(allergy.includes(addAllergy)){
            setAllergyErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(type === 'allergy' && addAllergy.length >5){
            setAllergyErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'allergy' && !addAllergy.length){
            setAllergyErr('재료를 입력해 주세요.')
        }else if(type === 'allergy' && !gapRegex.test(addAllergy)){
          setAllergyErr('재료에 공백을 포함할 수 없습니다.')
      }
    }
    const enterHandle = (e,type) =>{
     if(e.key === 'Enter'){
      pushText(type)
     }
    }

    const tagDelete = (type,tag) => {
      if(type === 'like'){
        const newArr = like.filter((el)=>{
          return el !== tag
        })
        setLike(newArr)
      }
      if(type === 'dislike'){
        const newArr = disLike.filter((el)=> el !== tag)
        setDisLike(newArr)
      }
      if(type === 'allergy'){
        const newArr = allergy.filter(el => el !== tag)
        setAllergy(newArr)
      }
    }
    const submitHandle = () =>{
      const header = {
        Headers:{
          Authorization: `Bearer {Token}`
        }
      }
      const data = {
        "preferredIngredients": like,
        "dislikedIngredients": disLike,
        "allergyIngredients": allergy
      }
      axios.patch(`/mypage/refrigerator/{member-id}`,data,header).then((res)=>{
        if(res.status === 200){
          axiosData()
        }
      })
  }
  const resetHandle = () => {
    axiosData()
  }
    return <FrigeContainer>
        <FrigeTitle>나만의 냉장고</FrigeTitle>
    <IngredientContainer>
        <LikeContainer>
        <div>선호하는 재료</div>
        <LikeTagBox>
            {like && like.map((el,index)=>{return <Tag key={index} onClick={()=>tagDelete('like',el)}>{el}</Tag>})}
        </LikeTagBox>
        <LikeInput value={addLike} onChange={(e)=> addHandle('like',e)} placeholder="재료를 입력해주세요." onKeyUp={(e)=>(enterHandle(e,'like'))} />
        <BtnLineContainer>
            {likeErr ? <ErrText>{likeErr}</ErrText>: <span>{' '}</span>}
        <ButtonContainer>
        <CancelBtn onClick={()=>clearText('like')}>취소</CancelBtn>
        <WriteBtn onClick={()=>pushText('like')}>등록</WriteBtn>
        </ButtonContainer>
        </BtnLineContainer>
        </LikeContainer>
        <DisLikeContainer>
        <div>싫어하는 재료</div>
        <DisLikeTagBox>
        {disLike && disLike.map((el,index)=>{return <Tag key={index} onClick={()=>tagDelete('dislike',el)}>{el}</Tag>})}
        </DisLikeTagBox>
        <DisLikeInput value={addDisLike} onChange={(e)=> addHandle('dislike',e)} placeholder="재료를 입력해주세요." onKeyUp={(e)=>(enterHandle(e,'dislike'))} />
        <BtnLineContainer>
        {disLikeErr ? <ErrText>{disLikeErr}</ErrText> : <span>{' '}</span>}
        <ButtonContainer>
        <CancelBtn onClick={()=>clearText('dislike')}>취소</CancelBtn>
        <WriteBtn onClick={()=>pushText('dislike')}>등록</WriteBtn>
        </ButtonContainer>
        </BtnLineContainer>
        </DisLikeContainer>
        <AllergyContainer>
        <div>알레르기 재료</div>
        <AllergyTagBox>
            {allergy && allergy.map((el,index)=>{return <Tag key={index} onClick={()=>tagDelete('allergy',el)}>{el}</Tag>})}
        </AllergyTagBox>
        <AllergyInput value={addAllergy} onChange={(e)=>addHandle('allergy',e)} placeholder="재료를 입력해주세요." onKeyUp={(e)=>(enterHandle(e,'allergy'))} />
        <BtnLineContainer>
        {allergyErr ? <ErrText>{allergyErr}</ErrText> : <span>{' '}</span>}
        <ButtonContainer>
        <CancelBtn onClick={()=>clearText('allergy')}>취소</CancelBtn>
        <WriteBtn onClick={()=>pushText('allergy')}>등록</WriteBtn>
        </ButtonContainer>
        </BtnLineContainer>
        </AllergyContainer>
        <RightFlex>
        <ResetBtn onClick={resetHandle}>초기화</ResetBtn>
        <UpdateBtn onClick={submitHandle}>수정 완료</UpdateBtn>
        </RightFlex>
    </IngredientContainer>
    <RecipeTitle>내가 좋아하는 레시피</RecipeTitle>
    <Box>
    <HorizontalScroll data={likedRecipe} />
    </Box>
    <RecipeTitle>내가 작성한 레시피</RecipeTitle>
    <Box>
    <HorizontalScroll data={myRecipe} />
    </Box>
    </FrigeContainer>
}

export default MyFrige