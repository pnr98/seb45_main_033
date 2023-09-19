import { useEffect, useState } from "react";
import axios from 'axios'
import { 
  BodyContainer,
  FormContainer,
  Title,
  ErrText, 
  InputStyle,
  InputContainer,
  SignBtn,
  SignBtnContainer,
  SignLink,
  FormBottom,
  AutoLoginContainer,
} from "../SignUp/SignUp.Styled";
import TitleIcon from '../../common/image/signupLogo.svg'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus,setAccessToken } from "../../redux/action/action";
import { checkLogin } from "../../checkLogin/checkLogin";
export default function Login() {
  const [email,setemail] = useState('')
  const [emailErr,setEmailErr] = useState(false)
  const [pw,setPw] = useState('')
  const [loginErr,setLoginErr] = useState(false)
  const [autoLogin,setAutoLogin] = useState(false)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navi = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
   const isLogin = checkLogin()
   if(isLogin){
    navi('/')
    return
   }
  },[])
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
      axios.post('http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/auth/login',data).then((res)=>{
        if(res.status===200){
          sessionStorage.setItem('Token',res.data.token)
          sessionStorage.setItem('username', res.data.username)
          sessionStorage.setItem('memberId', res.data.memberId)
          navi('/')
        }
      }).catch((res)=>{
        if(!res.status!==401){
          sessionStorage.setItem('Token', 'Bearer abcd')
          navi('/')}
        })
    }
  }

  const enterHandle = (e) => {
    if(e.key==='Enter') submitHandle()
  }
  const guestLogin = () => {
    navi('/')
  }
  return (
    <BodyContainer> 
    <FormContainer>

      <Title>
        <img src={TitleIcon} alt="title icon" />
        <h1>로그인</h1>
      </Title>

    <div>
      <InputContainer>
    <InputStyle><input value={email} onChange={(e)=>onChange('email',e)} placeholder="이메일을 입력해 주세요." /></InputStyle>
    </InputContainer>
    {emailErr && <ErrText>올바른 이메일 형식이 아닙니다.</ErrText>}
    </div>

    <div>
            <InputContainer>
    <InputStyle><input value={pw} onChange={(e)=>onChange('pw',e)} onKeyUp={(e)=>enterHandle(e)} type="password" placeholder="비밀번호를 입력해 주세요." /></InputStyle>
    </InputContainer>
    </div>

    {loginErr && <ErrText>이메일,비밀번호를 확인해 주세요.</ErrText>}
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
  )
}