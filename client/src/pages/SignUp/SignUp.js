import { useEffect, useState } from 'react';
import {
  ErrText,
  SuccecsText,
  BodyContainer,
  FormContainer,
  InputContainer,
  InputStyle,
  SignBtn,
  SignBtnContainer,
  Emoji,
  Postionbtn,
  SignLink,
  Title,
  PwErrText,
  TestPlz
} from './SignUp.Styled'
import TitleIcon from '../../common/image/signupLogo.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkLogin } from '../../checkLogin/checkLogin';
import Modal from '../../components/Modal/Modal';
const SignUp = () => {
  const [name, setName] = useState('');
  const [nameText, setNameText] = useState('');
  const [email, setEmail] = useState('');
  const [emailText, setEmailText] = useState('');
  const [pw, setPw] = useState('');
  const [verifyPw, setVerifyPw] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [duplicateName, setDupicateName] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [duplicateEmail, setDuplacteEmail] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [verifyPwErr, setVerifyPwErr] = useState(false);
  const [succecsName, setSuccecsName] = useState(false);
  const [succecsEmail, setSuccecsEmail] = useState(false);
  const [succecsPw, setSuccecsPw] = useState(false);
  const [succecsSamePw, setSuccecsSamePw] = useState(false);
  const [onModal, setOnModal] = useState(false)
  const [testPlz , setTestPlz] = useState(false)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z@$!%*?&\d]{7,20}$/i;
  const navi = useNavigate()

  useEffect(()=>{
    const isLogin = checkLogin()
    if(isLogin){
     navi('/')
     return
    }
   },[])

  const onChange = (type, e) => {
    if (type === 'name') {
      setName(e.target.value);
      setSuccecsName(false);
    }
    if (type === 'email') {
      setEmail(e.target.value);
      setSuccecsEmail(false);
      setDuplacteEmail(false);
      if (!emailRegex.test(e.target.value)) {
        setEmailErr(true);
        setSuccecsEmail(false);
        setEmailText('올바른 이메일 형식이 아닙니다.');
      } else {
        setEmailErr(false);
        setSuccecsEmail(true);
        setEmailText('');
      }
    }
    if (type === 'pw') {
      setSuccecsSamePw(false);
      setPw(e.target.value);
      if (!passwordRegex.test(e.target.value)) {
        setSuccecsPw(false);
        setPwErr(true);
      } else {
        setSuccecsPw(true);
        setPwErr(false);
      }
    }
    if (type === 'verifyPw') {
      setVerifyPw(e.target.value);
      setSuccecsSamePw(false);
    }
  };
  const duplicateNameHandle = () => {
    setNameText('');
    if (name.length >= 2 && name.length <= 12) {
      setNameErr(false);
      const params = {
        username: name
      }
      axios.get(`/auth/checkname`,{params : params}).then((res)=>{
        if(res.status===200){
          setSuccecsName(true); 
          setDupicateName(false); 
          setNameText('사용가능한 유저네임 입니다.')
          console.log('성공')
        } 
      }).catch(((res)=>{
        if(res.status===409){
          setSuccecsName(false)
          setDupicateName(true)
          setNameErr(true)
          setNameText('이미 존재하는 유저네임 입니다.')
        }else{
          // setSuccecsName(true); 
          // setDupicateName(false); 
          // setNameText('사용가능한 유저네임 입니다.')
          setSuccecsName(false)
          setDupicateName(true)
          setNameErr(true)
          setNameText('이미 존재하는 유저네임 입니다.')
        }
      }))
    }else{
      setNameErr(true);
      setNameText('유저네임은 2글자 이상 12글자 이하여야 합니다.')
    }
  };
  const duplicateEmailHandle = () => {
    if (succecsEmail) {
      const data = {
        email:email
      }
      axios.get(`/auth/checkemail`,{params : data}).then((res)=>{
        if(res.status === 200){
          setDuplacteEmail(true)
          setEmailText('사용가능한 이메일 입니다.')
          setEmailErr(false)
          console.log('성공')
        }
      }).catch((res)=>{
        if(res.status===409){
          setDuplacteEmail(false)
          setEmailText('이미 사용중인 이메일입니다.')
          setEmailErr(true)
        }else{
          setDuplacteEmail(false)
          setEmailText('이미 사용중인 이메일입니다.')
          setEmailErr(true)
        }
      })
    }
  };
  const samePwHandle = () => {
    if (pw === verifyPw) {
      setSuccecsSamePw(true);
      setVerifyPwErr(false);
    } else {
      setSuccecsSamePw(false);
      setVerifyPwErr(true);
    }
  };
  const submitHandle = () => {
    if (succecsName && duplicateEmail && succecsPw && succecsSamePw) {
      const data = {
        username:name,
        email:email,
        password:pw
      }
      axios.post('/auth/signup',data).then((res)=>{
        if(res.status === 201){
          console.log('요청성공')
          const logindata = {
            email:email,
            passwrod:pw
          }
          axios.post(`/auth/login`,logindata).then((res)=>{
           if(res.status === 200){
            sessionStorage.setItem('Token',res.data.token)
           }
          }
          ).catch((res)=>sessionStorage.setItem('Token' , 'Bearer abcd'))
          setOnModal(true)
        }
      }).catch((res)=>{
        sessionStorage.setItem('Token' , 'Bearer abcd')
        setOnModal(true)})
    }else{
      setTestPlz(true)
    }
  };
  return (
      <BodyContainer>
        <FormContainer>


        <Title>
          <img src={TitleIcon} alt="title icon" />
          <h1>회원가입</h1>
        </Title>


          <div>
            <InputContainer>
            <InputStyle>
              <input
                value={name}
                onChange={(e) => onChange('name', e)}
                placeholder="유저네임을 입력하세요"
              />
              <Postionbtn onClick={duplicateNameHandle}>중복 확인</Postionbtn>
            </InputStyle>
            </InputContainer>

            {nameErr && (
              <ErrText>{nameText}</ErrText>
            )}
            {!nameErr && !duplicateName && (
              <SuccecsText>{nameText}</SuccecsText>
            )}
          </div>


          <div>
          <InputContainer>
            <InputStyle>
              <input
                value={email}
                onChange={(e) => onChange('email', e)}
                placeholder="이메일을 입력하세요.(아이디)"
              />
              <Postionbtn onClick={duplicateEmailHandle}>중복 확인</Postionbtn>
            </InputStyle>
          </InputContainer>

            {emailErr && <ErrText>{emailText}</ErrText>}
            {!emailErr && duplicateEmail && (
              <SuccecsText>{emailText}</SuccecsText>
            )}
          </div>


          <div> 
          <InputContainer>
            <InputStyle>
              <input
              value={pw}
              type="password"
              onChange={(e) => onChange('pw', e)}
              placeholder="비밀번호를 입력하세요."
              />
            </InputStyle>
          </InputContainer>

            {pwErr && (
              <PwErrText>
                비밀번호는 7글자이상 20글자 이하이며 영문자,숫자,특수문자가 각각
                1개이상 포함되어야 합니다.
              </PwErrText>
            )}
          </div>


          <div>
          <InputContainer>
            <InputStyle>
              <input
              value={verifyPw}
              type="password"
              onChange={(e) => onChange('verifyPw', e)}
              />
            <Postionbtn onClick={samePwHandle}>비밀번호 확인</Postionbtn>
            {succecsSamePw && <Emoji>✔️</Emoji>}
            </InputStyle>
          </InputContainer>
            {verifyPwErr && <ErrText>비밀번호를 확인해주세요</ErrText>}
          </div>

          {testPlz && <TestPlz>모든 검사가 통과되어야 회원가입이 가능합니다.</TestPlz>}
          <SignBtnContainer>
          <SignBtn onClick={submitHandle}>회원가입</SignBtn>
          </SignBtnContainer>


          <SignLink>계정이 있으신가요?
            <Link to='/login'>로그인</Link>
          </SignLink>


        </FormContainer>
        {onModal && <Modal type="Welcome" username={name}/>}
      </BodyContainer>
  );
};

export default SignUp;