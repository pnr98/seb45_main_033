import { styled } from "styled-components";
import { TagBox } from "../../components/Tag/Tag.styled";

export const BodyContiner = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`
export const MainContainer = styled.section`
display: flex;
flex-direction: column;
gap:100px;
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
>input{
    width: 1000px;
    height: 120px;
}
display: flex;
flex-direction: column;
gap : 20px;
`

export const TagContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
gap:20px;
`

export const TagInputBox = styled.div`
display: flex;
flex-direction: column;
gap:10px;
`

export const TagTitle = styled.div`

`

export const TagInput = styled.div`
border: 1px solid black;
display: flex;
align-items: center;
gap:10px;
height: 36px;
padding-left: 10px;
`

export const Tag = styled(TagBox)`
margin: 0;
cursor: pointer;
background-color: ${(props)=>props.select ? '#e2990b':'#D5BA85'};
`

export const WriteRecipe = styled.button`
background-color: #E2990B;
width: 150px;
height: 40px;
color: white;
border-radius: 8px;
`

export const BtnFlex = styled.div`
display: flex;
justify-content: center;
`

export const CurrentIngredients = styled.div`
display: flex;
gap: 10px;
`

export const InformationMessage = styled.div`
color : green;
`

export const ErrText = styled.div`
color: red;
`

export const TagFlex = styled.div`
display: flex;
gap: 3px;
`