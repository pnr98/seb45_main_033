import { styled } from 'styled-components';

export const IngredientContainer = styled.div`
width: 908px;
height: 531px;
background-color: aliceblue;
`
export const LikeContainer = styled.section`
display: flex;
flex-direction: column;
gap: 8px;
`
export const LikeTagBox = styled.div`
width: 908px;
height: 30px;
background-color: aqua;
display: flex;
gap: 5px;
align-items: center;
`

export const LikeInput = styled.input`
height: 65px;
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