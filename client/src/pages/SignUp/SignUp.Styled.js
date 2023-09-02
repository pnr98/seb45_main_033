import { styled } from 'styled-components';

export const ErrText = styled.div`
  color: red;
  font-size: 0.8em;
  text-align: center;
`;

export const SuccecsText = styled.div`
  color: green;
  font-size: 0.8em;
  text-align: center;
`;



export const BodyContainer = styled.div`
  display: flex;
  background-color: #D8E1E9;
  height: 1000px;
  justify-content: center;
`;



export const FormContainer = styled.section`
  background-color: #FFFFFF;
  justify-content: center;
  width: 1300px;
  display: flex;
  flex-direction: column;
  gap : 50px;
`;

export const InputContainer = styled.section`
 display: flex;
 justify-content: center;
`

export const InputStyle = styled.input`
 width: 350px;
 height: 50px;
`

export const SignBtn = styled.button`
width: 350px;
height: 50px;
background-color: #759EB8;
border-radius: 8px;
color: white;
`

export const SignBtnContainer = styled.section`
display: flex;
 justify-content: center;
`

export const Emoji = styled.span`
display: flex;
align-items: center;
position: absolute;
margin-top: 15px;
margin-left: 380px;
`

export const Postionbtn = styled.button`
margin-top: 15px;
margin-left: 500px;
position: absolute;
`