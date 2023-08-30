import { useState } from "react";
import axios from 'axios'
import { ErrText, InputStyle,BodyContainer,FormContainer,InputContainer,SignBtn,SignBtnContainer } from "../SignUp/SignUp.Styled";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email,setemail] = useState('')
  const [emailErr,setEmailErr] = useState(false)
  const [pw,setPw] = useState('')
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navi = useNavigate()
  const onChange = (type,e) =>{
    if(type === 'email'){
     setemail(e.target.value)
     if(!emailRegex.test(e.target.value)){
      setEmailErr(true)
     }else{
      setEmailErr(false)
     }
    }
    if(type === 'pw'){
     setPw(e.target.value)
    }
  }
  const isErr = (emailErr,pw) => {
    if (!emailErr&&pw!==''){
      return false
    }
    else {return true}
  }
  const submitHandle = () => {
    if(!isErr(emailErr,pw)){
      console.log('보냄')
    }  //로그인 버튼 클릭시 요청 보내고 로그인 성공 응답일 경우 데이터를 받아서 세션에 담음
  }
  const guestLogin = () => {
    navi('/')
  }
  return <div>
    <BodyContainer>
    <FormContainer>
      <div>
    <InputContainer>
    <InputStyle value={email} onChange={(e)=>onChange('email',e)} placeholder="이메일을 입력해 주세요."></InputStyle>
    </InputContainer>
    {emailErr && <ErrText>올바른 이메일 형식이 아닙니다.</ErrText>}
    </div>
    <InputContainer>
    <InputStyle value={pw} onChange={(e)=>onChange('pw',e)} type="password" placeholder="비밀번호를 입력해 주세요."></InputStyle>
    </InputContainer>
    <SignBtnContainer>
    <SignBtn onClick={submitHandle}>로그인</SignBtn>
    </SignBtnContainer>
    <SignBtnContainer>
    <SignBtn onClick={guestLogin}>Guest Login</SignBtn>
    </SignBtnContainer>
    
    </FormContainer>
    </BodyContainer>
  </div>;
}

