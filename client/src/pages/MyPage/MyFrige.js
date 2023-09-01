import { useEffect, useState } from "react"
import { IngredientContainer, LikeTagBox , LikeContainer,LikeInput , ButtonContainer, CancelBtn, WriteBtn} from "./MyFrige.Styled"
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
    const [disLike,setDisLike] = useState([])
    const [allergy,setAllergy] = useState([])
    
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

    const addLikeHandle = (e) =>{
        setAddLike(e.target.value)
    }
    return <div>
        <h1>나만의 냉장고</h1>
    <IngredientContainer>
        <LikeContainer>
        <div>선호하는 재료</div>
        <LikeTagBox>
            {like && like.map((el,index)=>{return <TagBox key={index}>{el}</TagBox>})}
        </LikeTagBox>
        <LikeInput value={addLike} onChange={(e)=> addLikeHandle(e)} placeholder="재료를 입력해주세요."/>
        <ButtonContainer>
        <CancelBtn>취소</CancelBtn>
        <WriteBtn>등록</WriteBtn>
        </ButtonContainer>
        </LikeContainer>
    </IngredientContainer>
    </div>
}

export default MyFrige