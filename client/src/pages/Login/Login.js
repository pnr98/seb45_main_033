import { useState } from "react";
import axios from 'axios'
import { ErrText, InputStyle,BodyContainer,FormContainer,InputContainer,SignBtn,SignBtnContainer,SignLink,FormTop, FormBottom,FormInput,TextInput, AutoLoginContainer, Addition } from "../SignUp/SignUp.Styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLoginStatus,setAccessToken } from "../../redux/action/action";
import Cookies from 'js-cookie';
export default function Login() {
  const [email,setemail] = useState('')
  const [emailErr,setEmailErr] = useState(false)
  const [pw,setPw] = useState('')
  const [loginErr,setLoginErr] = useState(false)
  const [autoLogin,setAutoLogin] = useState(false)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navi = useNavigate()
  const dispatch = useDispatch()
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
      const data = {
        email:email,
        password:pw
      }
      axios.post('/auth/login',data).then((res)=>{
        if(res.status===200){
          dispatch(setAccessToken(res.data.token))
          sessionStorage.setItem('Token',res.data.token)
          if(autoLogin){
            Cookies.set('Token',res.data.token,{ expires : 1})
          }
          dispatch(setLoginStatus(true))
          navi('/')
        }
      }).catch((res)=>{setLoginErr(true)})
      console.log('보냄')
    }  //로그인 버튼 클릭시 요청 보내고 로그인 성공 응답일 경우 데이터를 받아서 스토어에 담음
  }
  const guestLogin = () => {
    navi('/')
  }
  return <div>
    <BodyContainer> 
    <FormContainer>
    <FormTop>
    <FormInput>
      <TextInput>
    <InputContainer>
    <InputStyle value={email} onChange={(e)=>onChange('email',e)} placeholder="이메일을 입력해 주세요."></InputStyle>
    </InputContainer>
    {emailErr && <ErrText>올바른 이메일 형식이 아닙니다.</ErrText>}
    </TextInput>
    <InputContainer>
    <InputStyle value={pw} onChange={(e)=>onChange('pw',e)} type="password" placeholder="비밀번호를 입력해 주세요."></InputStyle>
    </InputContainer>
    </FormInput>
    <Addition>
    <AutoLoginContainer>
    <input type="checkbox" checked={autoLogin} onClick={()=>setAutoLogin(!autoLogin)} />
    <span>로그인 상태 유지</span>
    </AutoLoginContainer>
    </Addition>
    {loginErr && <ErrText>이메일,비밀번호를 확인해 주세요.</ErrText>}
    </FormTop>
    <FormBottom>
    <SignBtnContainer>
    <SignBtn onClick={submitHandle}>로그인</SignBtn>
    </SignBtnContainer>
    <SignBtnContainer>
    <SignBtn onClick={guestLogin}>Guest Login</SignBtn>
    </SignBtnContainer>
    <SignLink>계정이 없으신가요?
      <Link to='/sign-up'>가입하기</Link>
    </SignLink>
    </FormBottom>
    </FormContainer>
    </BodyContainer>
  </div>;
}

