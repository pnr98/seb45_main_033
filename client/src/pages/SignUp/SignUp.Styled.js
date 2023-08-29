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
 width: 300px;
`