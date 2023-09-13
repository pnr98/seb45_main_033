import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { BodyContiner, TitleText, TitleContainer, Thumbnail, MainContainer, ThumbnailImg, ButtonContainer,
    ResetBth, FileInputWrapper, RecipeTitle, FormContainer, IngredientContianer, TagContainer, TagInputBox,
    TagTitle, TagInput, Tag, WriteRecipe, BtnFlex, CurrentIngredients, InformationMessage, ErrText, TagFlex} from './CreateRecipe.styled'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import axios from 'axios';

const CreateRecipe = () =>{
const [title,setTitle] = useState('')
const [recipeDescription,setRecipeDescription] = useState('')
const [text,setText] = useState('')
const [steps,setSteps] = useState([])
const [ingredients,setIngredients] = useState([])
const [ingredientsInput,setIngredientsInput] = useState('')
const [thumbnail,setThumbnail] = useState('')
const [extensionModal,setExtensionModal] = useState(false)
const [createModal,setCreateModal] = useState(false)
const [foodType,setFoodType] = useState('')
const [difficulty,setDifficulty] = useState('')
const [cookingTime,setCoockinTime] = useState('')
const [duplicationErr,setDuplicationErr] = useState(false)

const gapRegex = /^\S+$/

const dragOverHandle = (e) => {
    e.preventDefault();
  };

const dropHandle = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if(file) {
        if(file.type === 'image/png' || file.type === 'image/jpeg'){
            const imageUrl = URL.createObjectURL(file);
            setThumbnail(imageUrl)
        }else{
            setExtensionModal(true)
        }
    }
}

const inputBtnhandle = (e) =>{
    const file = e.target.files[0]
    if(file){
        if(file.type === 'image/png' || file.type === 'image/jpeg'){
            const imageUrl = URL.createObjectURL(file);
            setThumbnail(imageUrl)
        }else{
            setExtensionModal(true)
        }
    }
}

const modalOff = () => {
    setExtensionModal(false)
}

const resetThumbnail = () => {
    setThumbnail('')
}

const textHandle = (e) => {
    setText(e)
}

const tagClickHandle = (type,tag) => {
    if(type === 'foodType'){
     setFoodType(tag)
    }
    if(type === 'difficulty'){
     setDifficulty(tag)
    }
    if(type === 'cookingTime'){
     setCoockinTime(tag)
    }
}

const submitHandle = () => {
    if(text && foodType && title && ingredients.length !== 0){
      const header = {
        Headers:{
            Authorization: `Bearer {Token}`
        }
      }
      const data = {
        "foodType": foodType,
        "difficulty": difficulty,
        "recipeName": title,
        "recipeDescription":recipeDescription,
        "cookingTime":cookingTime,
        "ingredients": ingredients,
        "steps" : steps
      }
      axios.post('/recipes',data,header).then((res)=>{
        if(res.status === 201){
            setCreateModal(true)
        }
      }).catch((res)=>{
        console.log(data)
        setCreateModal(true)
      })
    }
}

const spaceHandle = (e) => {
    if(e.key === " " && gapRegex.test(ingredientsInput.slice(0,ingredientsInput.length-1))){
        if(!ingredients.includes(ingredientsInput.slice(0,ingredientsInput.length-1))){
            setIngredients([...ingredients,ingredientsInput.slice(0,ingredientsInput.length-1)])
            setIngredientsInput('')
        }else{
            setDuplicationErr(true)
        }
    }
    if(e.key === 'Enter' && gapRegex.test(ingredientsInput.slice(0,ingredientsInput.length-1))){
        if(!ingredients.includes(ingredientsInput)){
            setIngredients([...ingredients,ingredientsInput])
            setIngredientsInput('')
        }else{
            setDuplicationErr(true)
        }
    }
    if(e.key === 'Backspace'){
        setDuplicationErr(false)
    }
}

const deleteTag = (tag) =>{
  const newArr = ingredients.filter((el)=> el!==tag)
  setIngredients(newArr)
}
return <BodyContiner>
    <MainContainer>
    <TitleContainer>
    <TitleText>Spread your recipe</TitleText>
    </TitleContainer>
    <FormContainer>
    {thumbnail ? <ThumbnailImg src={thumbnail} alt='thumbnail' onDrop={dropHandle} onDragOver={dragOverHandle} /> 
    : <Thumbnail id='fileinput' onDrop={dropHandle} onDragOver={dragOverHandle}>
        <div>썸네일 이미지를 드래그 앤 드롭 해보세요.</div>
        <div>썸네일 이미지는 jpg/png 확장자만 지원합니다.</div>
    </Thumbnail>}
    <ButtonContainer>
        <FileInputWrapper>
            파일선택
        <input type='file' onChange={(e)=>inputBtnhandle(e)}/>
        </FileInputWrapper>
    <ResetBth onClick={resetThumbnail}>초기화</ResetBth>
    </ButtonContainer>
    <RecipeTitle placeholder='제목을 입력해 주세요.' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <input value={recipeDescription} onChange={(e)=>setRecipeDescription(e.target.value)} placeholder='레시피 설명을 입력해 주세요.'/>
    <ReactQuill value={text} onChange={textHandle} placeholder='내용을 입력해 주세요.' />
    </FormContainer>
    <IngredientContianer>
    <input placeholder='필요한 재료를 입력해 주세요.' value={ingredientsInput} 
    onChange={(e)=>setIngredientsInput(e.target.value)} onKeyUp={(e)=>spaceHandle(e)} />
    <CurrentIngredients>
    {ingredients.length ? 
    <div>
        <TagFlex>
        {ingredients.map((el,index)=>{return <Tag key={index} onClick={()=>deleteTag(el)}>{el}</Tag>})}
        </TagFlex>
     <InformationMessage>재료를 클릭하여 제거할 수 있습니다.</InformationMessage>
     {duplicationErr && <ErrText>동일한 재료는 입력할 수 없습니다.</ErrText>}
    </div>
     : <div>
        입력한 재료는 이곳에서 확인 가능합니다.
        <InformationMessage>원하는 재료를 입력후 스페이스 바(Space bar)키 혹은 엔터(Enter)키를 눌러주세요</InformationMessage>
        </div>}
    </CurrentIngredients>
    </IngredientContianer>
    <TagContainer>
        <TagInputBox>
        <TagTitle>음식 종류</TagTitle>
        <TagInput>
            <Tag select={foodType === 'korean' ? true : undefined} onClick={()=>tagClickHandle('foodType','korean')}>한식</Tag>
            <Tag select={foodType === 'japan' ? true : undefined} onClick={()=>tagClickHandle('foodType','japan')}>일식</Tag>
            <Tag select={foodType === 'chinese' ? true : undefined} onClick={()=>tagClickHandle('foodType','chinese')}>중식</Tag>
            <Tag select={foodType === 'western' ? true : undefined} onClick={()=>tagClickHandle('foodType','western')}>양식</Tag>
            <Tag select={foodType === 'dessert' ? true : undefined} onClick={()=>tagClickHandle('foodType','dessert')}>디저트</Tag>
            <Tag select={foodType === 'diet' ? true : undefined} onClick={()=>tagClickHandle('foodType','diet')}>다이어트</Tag>
        </TagInput>
        </TagInputBox>
        <TagInputBox>
        <TagTitle>조리 시간</TagTitle>
        <TagInput>
            <Tag select={difficulty === 'twenty_min' ? true : undefined} onClick={()=>tagClickHandle('difficulty','twenty_min')}>~20분</Tag>
            <Tag select={difficulty === 'forty_min' ? true : undefined} onClick={()=>tagClickHandle('difficulty','forty_min')}>40분</Tag>
            <Tag select={difficulty === 'sixty_min' ? true : undefined} onClick={()=>tagClickHandle('difficulty','sixty_min')}>60분</Tag>
            <Tag select={difficulty === 'ninety_min' ? true : undefined} onClick={()=>tagClickHandle('difficulty','ninety_min')}>90분</Tag>
            <Tag select={difficulty === 'two_hours' ? true : undefined} onClick={()=>tagClickHandle('difficulty','two_hours')}>120분~</Tag>
        </TagInput>
        </TagInputBox>
        <TagInputBox>
        <TagTitle>난이도</TagTitle>
        <TagInput>
            <Tag select={cookingTime === 'high' ? true : undefined} onClick={()=>tagClickHandle('cookingTime','high')}>상</Tag>
            <Tag select={cookingTime === 'middle' ? true : undefined} onClick={()=>tagClickHandle('cookingTime','middle')}>중</Tag>
            <Tag select={cookingTime === 'low' ? true : undefined} onClick={()=>tagClickHandle('cookingTime','low')}>하</Tag>
        </TagInput>
        </TagInputBox>
    </TagContainer>
    <BtnFlex>
    <WriteRecipe onClick={submitHandle}>레시피 등록</WriteRecipe>
    </BtnFlex>
    </MainContainer>
    {extensionModal && <Modal type='Badextension' func={modalOff} />}
    {createModal && <Modal type='Create' />}
</BodyContiner>
}

export default CreateRecipe