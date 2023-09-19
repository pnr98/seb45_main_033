import {styled} from "styled-components";
import { TagBox } from "../../components/Tag/Tag.styled";
import { Button } from "../RecipeDetailPage/Comment.styled"

export const BodyContiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
export const MainContainer = styled.section`
  width: 50rem;
  margin: 1.5rem 0rem 2.5rem 0rem;
  h1{
    font-size: 48px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: var(--font-size-20);
    font-weight: 700;
    margin-bottom: 10px;
  }
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  .button-container {
    margin-top: 6px;
    display: flex;
    justify-content: flex-end; 
    gap: 10px
  }
  >.button-container {
    justify-content: center; 
  }
`

export const Thumbnail = styled.div`
  > div:first-child {
    width: 100%;
    height: 300px;
    border: 2px solid #DFDFDF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 100%;
      margin: 10px;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap: 10px;
  margin-top: 10px;
  button:first-child {
    position: relative;
    overflow: hidden;
    background-color: #E2990B;
    
      input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
`
export const CreateButton = styled(Button)`
  width: ${(props) => (props.size === "big" ? "30%" : "auto")};
`

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  input {
    width: 100%;
    border: 2px solid #DFDFDF;
    padding: 10px;
    resize: none;
    outline: none;
  }
  textarea {
    width: 100%;
    border: 2px solid #DFDFDF;
    padding: 10px;
    resize: none;
    outline: none;
  }
  .step-container {
    
  }

`

export const IngredientContianer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  >input{
    
  }
`
export const CurrentIngredients = styled.div`

`
export const InformationMessage = styled.div`
  gap:5px;
  color: grey;
  font-size: var(--font-size-14);
  display: flex;
  flex-direction: column;
  .error {
    color: red;
  } 
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:20px;
  margin-bottom: 40px;
`
export const TagBoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  border: 2px solid #DFDFDF;
  padding: 10px;
  gap: 5px;
  flex-wrap: wrap;
`
export const Tag = styled(TagBox)`
  margin: 0;
  cursor: pointer;
  background-color: ${(props) => props.selected ? '#e2990b':'#D5BA85'};
  &:hover{
    background-color: #e2990b
  }
`

