import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { BodyContiner, TitleText, TitleContainer, Thumbnail, MainContainer, ThumbnailImg, ButtonContainer,
    ResetBth, FileInputWrapper, RecipeTitle, FormContainer, IngredientContianer, TagContainer, TagBox, TagTitle, TagInput} from './CreateRecipe.styled'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'

const CreateRecipe = () =>{
const [text,setText] = useState('')
const [thumbnail,setThumbnail] = useState('')
const [onModal,setOnModal] = useState(false)

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
            setOnModal(true)
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
            setOnModal(true)
        }
    }
}

const modalOff = () => {
    setOnModal(false)
}

const resetThumbnail = () => {
    setThumbnail('')
}

const textHandle = (e) => {
    setText(e)
}
return <BodyContiner>
    <MainContainer>
    <TitleContainer>
    <TitleText>Spread your recipe</TitleText>
    </TitleContainer>
    <FormContainer>
    {thumbnail ? <ThumbnailImg src={thumbnail} alt='thumbnail' onDrop={dropHandle} onDragOver={dragOverHandle} /> : <Thumbnail id='fileinput' onDrop={dropHandle} onDragOver={dragOverHandle}>
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
    <RecipeTitle placeholder='제목을 입력해 주세요.' />
    <ReactQuill value={text} onChange={textHandle} placeholder='내용을 입력해 주세요.' />
    </FormContainer>
    <IngredientContianer>
    <input placeholder='필요한 재료를 입력해 주세요.'/>
    </IngredientContianer>
    <TagContainer>
        <TagBox>
        <TagTitle>음식 종류</TagTitle>
        <TagInput></TagInput>
        </TagBox>
        <TagBox>
        <TagTitle>조리 시간</TagTitle>
        <TagInput></TagInput>
        </TagBox>
        <TagBox>
        <TagTitle>난이도</TagTitle>
        <TagInput></TagInput>
        </TagBox>
    </TagContainer>
    </MainContainer>
    {onModal && <Modal type='Badextension' func={modalOff} />}
</BodyContiner>
}

export default CreateRecipe