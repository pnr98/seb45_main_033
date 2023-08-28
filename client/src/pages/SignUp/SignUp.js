import { useState } from 'react';
import { ErrText, SuccecsText } from './SignUpStyle';
const SignUp = () => {
  const [name, setName] = useState('');
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
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z@$!%*?&\d]{7,20}$/i;

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
      setSuccecsPw(false);
    }
  };
  const duplicateNameHandle = () => {
    if (name.length >= 2 && name.length <= 12) {
      setNameErr(false);
      setDupicateName(!duplicateName);
    } else {
      setNameErr(true);
    }
  };
  const duplicateEmailHandle = () => {
    if (succecsEmail) {
      setEmailText('이미 사용중인 이메일입니다.');
      setDuplacteEmail(!duplicateEmail); // 여기 바뀌어야 함
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
    console.log(name, email, pw, verifyPw);
    console.log(succecsName, duplicateEmail, succecsPw, succecsSamePw);
    if (succecsName && !duplicateEmail && succecsPw && succecsSamePw) {
      console.log('회원가입 성공');
    }
  };
  return (
    <div>
      <div>
        닉네임
        <input value={name} onChange={(e) => onChange('name', e)} />
        <button onClick={duplicateNameHandle}>중복 확인</button>
        {nameErr && (
          <ErrText>닉네임은 2글자이상 12글자 이하여야 합니다.</ErrText>
        )}
        {duplicateName && <ErrText>이미 존재하는 닉네임 입니다.</ErrText>}
      </div>
      <div>
        이메일
        <input value={email} onChange={(e) => onChange('email', e)} />
        <button onClick={duplicateEmailHandle}>중복 확인</button>
        {emailErr && <ErrText>{emailText}</ErrText>}
        {duplicateEmail && <ErrText>{emailText}</ErrText>}
        {!emailErr && !duplicateEmail && <SuccecsText>{emailText}</SuccecsText>}
      </div>
      <div>
        비밀번호
        <input value={pw} type="password" onChange={(e) => onChange('pw', e)} />
        {pwErr && (
          <ErrText>
            비밀번호는 7글자이상 20글자 이하이며 영문자,숫자,특수문자가 각각
            1개이상 포함되어야 합니다.
          </ErrText>
        )}
      </div>
      <div>
        비밀번호 확인
        <input
          value={verifyPw}
          type="password"
          onChange={(e) => onChange('verifyPw', e)}
        />
        <button onClick={samePwHandle}>비밀번호 확인</button>
        {verifyPwErr && <ErrText>비밀번호를 확인해주세요</ErrText>}
      </div>
      <button onClick={submitHandle}>회원가입</button>
    </div>
  );
};

export default SignUp;
