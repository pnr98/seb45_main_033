import { useEffect, useState } from "react"
import { IngredientContainer, LikeTagBox , LikeContainer,LikeInput , ButtonContainer,
     CancelBtn, WriteBtn, DisLikeContainer, DisLikeTagBox,DisLikeInput, AllergyContainer, AllergyTagBox, AllergyInput, BtnLineContainer, ErrText} from "./MyFrige.Styled"
import { TagBox } from "../../components/Recipe/Recipe.styled"
import axios from "axios"
const dummyData = {
    preferredIngredients : ["김치","소고기","당근","미역","피망"],
    dislikedIngredients : ["감자","양파","돼지고기","깻잎","고등어"],
    allergyIngredients : ["새우","우유","게",]
}
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
    
    useEffect(()=>{
        const header = {
            Headers : {
                Authorization: `Bearer {access_token}`
            }
        }
        axios.get(`/mypage/refrigerator/{user-id}`,'', header).then((res)=>{
            setLike(res.data.preferredIngredients)
            setDisLike(res.data.dislikedIngredients)
            setAllergy(res.data.allergyIngredients)
        }).catch((res)=>{
            setLike(dummyData.preferredIngredients)
            setDisLike(dummyData.dislikedIngredients)
            setAllergy(dummyData.allergyIngredients)
        })
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
        if(type === 'like' && !like.includes(addLike) && addLike.length <=5 && addLike.length){
            setLike([...like,addLike])
            setAddLike('')
            setLikeErr('')
        }else if(like.includes(addLike)){
            setLikeErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(addLike.length >5){
            setLikeErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'like' && addLike.length===0){
            setLikeErr('공백은 등록할 수 없습니다.')
        }
        
        if(type === 'dislike' && !disLike.includes(addDisLike) && addDisLike.length <=5 && addDisLike.length){
            setDisLike([...disLike,addDisLike])
            setAddDisLike('')
            setDisLikeErr('')
        }else if(disLike.includes(addDisLike)){
            setDisLikeErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(type === 'dislike' && addDisLike.length >5){
            setDisLikeErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'dislike' && !addDisLike.length){
            setDisLikeErr('공백은 등록할 수 없습니다.')
        }
        
        if(type === 'allergy' && !allergy.includes(addAllergy) && addAllergy.length <=5 && addAllergy.length){
            setAllergy([...allergy,addAllergy])
            setAddAllergy('')
            setAllergyErr('')
        }else if(allergy.includes(addAllergy)){
            setAllergyErr('이미 등록된 재료는 등록할 수 없습니다.')
        }else if(type === 'allergy' && addAllergy.length >5){
            setAllergyErr('5글자 이하의 재료만 등록할 수 있습니다.')
        }else if(type === 'allergy' && !addAllergy.length){
            setAllergyErr('공백은 등록할 수 없습니다.')
        }
        
    }
    return <div>
        <h1>나만의 냉장고</h1>
    <IngredientContainer>
        <LikeContainer>
        <div>선호하는 재료</div>
        <LikeTagBox>
            {like && like.map((el,index)=>{return <TagBox key={index}>{el}</TagBox>})}
        </LikeTagBox>
        <LikeInput value={addLike} onChange={(e)=> addHandle('like',e)} placeholder="재료를 입력해주세요."/>
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
        {disLike && disLike.map((el,index)=>{return <TagBox key={index}>{el}</TagBox>})}
        </DisLikeTagBox>
        <DisLikeInput value={addDisLike} onChange={(e)=> addHandle('dislike',e)} placeholder="재료를 입력해주세요."/>
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
            {allergy && allergy.map((el,index)=>{return <TagBox key={index}>{el}</TagBox>})}
        </AllergyTagBox>
        <AllergyInput value={addAllergy} onChange={(e)=>addHandle('allergy',e)} placeholder="재료를 입력해주세요." />
        <BtnLineContainer>
        {allergyErr ? <ErrText>{allergyErr}</ErrText> : <span>{' '}</span>}
        <ButtonContainer>
        <CancelBtn onClick={()=>clearText('allergy')}>취소</CancelBtn>
        <WriteBtn onClick={()=>pushText('allergy')}>등록</WriteBtn>
        </ButtonContainer>
        </BtnLineContainer>
        </AllergyContainer>
    </IngredientContainer>
    </div>
}

export default MyFrige