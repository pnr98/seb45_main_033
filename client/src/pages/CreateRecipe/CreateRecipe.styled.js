import { styled } from "styled-components";

export const BodyContiner = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`
export const MainContainer = styled.section`
display: flex;
flex-direction: column;
`

export const TitleText = styled.h1`
font-size: 48px;
`

export const TitleContainer = styled.div`
display: flex;
`

export const Thumbnail = styled.div`
width: 1000px;
height: 175px;
background-color: aqua;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const ThumbnailImg = styled.img`
width: 1000px;
height: 175px;
`

export const ButtonContainer = styled.div`
display: flex;
align-items: center;
`

export const FileInputWrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  width: 85px;
  border: 1px solid black;
  background-color: #A5B0BD;
  height: 23px;
`


export const ResetBth = styled.button`
width: 85px;
border: 1px solid black;
background-color: #A5B0BD;
`

export const RecipeTitle = styled.input`

`

export const FormContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
`

export const IngredientContianer = styled.div`
margin-top: 70px;
>input{
    width: 1000px;
    height: 120px;
}
`

export const TagContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
gap:20px;
`

export const TagBox = styled.div`
display: flex;
flex-direction: column;
`

export const TagTitle = styled.div`

`

export const TagInput = styled.input`

`