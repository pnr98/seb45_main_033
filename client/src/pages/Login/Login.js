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
      axios.post('/auth/login',data).then((res)=>{
        if(res.status===200){
          dispatch(setAccessToken(res.data.token))
          sessionStorage.setItem('Token',res.data.token)
          dispatch(setLoginStatus(true))
          navi('/')
        }
      }).catch((res)=>{
        dispatch(setAccessToken('Bearer abcd'))  // 서버 열리면 수정해야할 곳
        sessionStorage.setItem('Token', 'Bearer abcd')
        dispatch(setLoginStatus(true))
        navi('/')})
      console.log('보냄')
    }  //로그인 버튼 클릭시 요청 보내고 로그인 성공 응답일 경우 데이터를 받아서 스토어에 담음
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
    <InputStyle value={email} onChange={(e)=>onChange('email',e)} placeholder="이메일을 입력해 주세요."></InputStyle>
    </InputContainer>
    {emailErr && <ErrText>올바른 이메일 형식이 아닙니다.</ErrText>}
    </div>

    <div>
            <InputContainer>
    <InputStyle value={pw} onChange={(e)=>onChange('pw',e)} type="password" placeholder="비밀번호를 입력해 주세요."></InputStyle>
    </InputContainer>
    </div>

    <AutoLoginContainer>
    <input type="checkbox" checked={autoLogin} onClick={()=>setAutoLogin(!autoLogin)} />
    <span> 로그인 상태 유지</span>
    </AutoLoginContainer>


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

