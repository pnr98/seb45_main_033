import { styled } from 'styled-components';

export const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap : 30px;
    padding-top: 3rem;
    width: var(--main-width);
    margin: 0 0 100px 0;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: x-large;

  img {
    margin-bottom: 10px;
    width: 3vw;
    height: 3vw;
  }
`

export const InputContainer = styled.section`
 display: flex;
 justify-content: center;
`

export const ErrText = styled.div`
  color: red;
  font-size: 0.8em;
  margin: 5px 0 0 0;
  text-align: left;
`;

export const PwErrText = styled.div`
  text-overflow: ellipsis;
  color: red;
  font-size: 0.8em;
  margin: 5px 0 0 0;
  text-align: left;
  width: 350px;
`;

export const SuccecsText = styled.div`
  color: green;
  font-size: 0.8em;
  text-align: left;
  margin: 5px 0 0 0;
`;

export const TextInput = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
`

export const InputStyle = styled.input`
 width: 350px;
 height: 50px;
 padding: 0 10px;
`

export const SignBtn = styled.button`
width: 350px;
height: 50px;
background-color: #E2990B;
border-radius: 8px;
color: white;

&:hover {
  background-color: #DDAF55;
}
&:active {
  background-color: #DDAF55;
  border: 2px solid #F1DAAD;
}
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

export const SignLink = styled.div`
display: flex;
justify-content: center;
gap: 10px;
`

export const FormTop = styled.section`
display: flex;
flex-direction: column;
gap:10px;
`

export const FormBottom = styled.section`
display: flex;
flex-direction: column;
gap:30px;
`

export const FormInput = styled.section`
display: flex;
flex-direction: column;
gap:30px;
`

export const AutoLoginContainer = styled.div`
width: 350px;
`
