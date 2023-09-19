import { styled } from 'styled-components';
import { TagBox } from '../../components/Tag/Tag.styled';

export const IngredientContainer = styled.div`
width: 47.3vw;
height: 531px;
display: flex;
flex-direction: column;
gap: 15px;
`

export const FrigeContainer = styled.section`
display: flex;
flex-direction: column;
gap: 44px;
`

export const LikeContainer = styled.section`
display: flex;
flex-direction: column;
gap: 8px;
`

export const LikeTagBox = styled.div`
width: 47.3vw;
height: 30px;
display: flex;
gap: 5px;
align-items: center;
border: 1px solid black;
`

export const LikeInput = styled.input`
height: 65px;
`
export const BtnLineContainer = styled.div`
display: flex;
justify-content: space-between;
`

export const ButtonContainer = styled.div`
display: flex;
justify-content: end;
gap : 15px;
`

export const CancelBtn = styled.button`
background-color: #D8D8D8;
padding: 9px 11px ;
color: white;
font-size: 13px;
width: 46px;
height: 25px;
white-space: nowrap;
display: flex;
align-items: center;
`

export const WriteBtn = styled(CancelBtn)`
background-color: #E2990B;
`

export const ErrText = styled.span`
font-size: 0.8em;
color: red;
`
export const DisLikeContainer=styled(LikeContainer)`

`

export const DisLikeTagBox = styled(LikeTagBox)`

`

export const DisLikeInput = styled(LikeInput)`

`

export const AllergyContainer = styled(LikeContainer)`

`

export const AllergyTagBox = styled(LikeTagBox)`

`

export const AllergyInput = styled(LikeInput)`

`

export const Box = styled.div`
width: 800px;
`

export const FrigeTitle = styled.h1`
font-size: 24px;
`

export const RecipeTitle = styled.h1`
font-size: 20px;
`

export const UpdateBtn = styled(WriteBtn)`
width: fit-content;
`

export const RightFlex = styled.div`
display: flex;
justify-content: end;
gap : 15px;
`

export const ResetBtn = styled(CancelBtn)`
width: fit-content;
`

export const Tag = styled(TagBox)`
cursor: pointer;
`

export const HelpText = styled.div`
color: #7392B7;
font-size: 0.8em;
`