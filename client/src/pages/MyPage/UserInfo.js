import { useEffect, useState } from "react";
import { BodyContainer,InfoTextBox, ImageBox, Image, Text, ImageTextBox, 
  ChangeImage, NickNameBox, NickNameText, ChangeBtn, EmailBox , EmailText, PassWordBox, PassWordText, PwErrText} from "./UserInfo.Styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RightFlex, UpdateBtn } from "./MyFrige.Styled";

const dummyData = {
  "profileImageUrl": "https://i.ibb.co/hHYvKbq/image.jpg",
  "email": "example@gmail.com",
  "userName": "홍길동"
}
export default function UserInfo() {
  const [userData,setUserData] = useState(null)
  const [userName,setUserName] = useState('')
  const [userEmail,setUserEmail] = useState('')
  const [userImage,setUserImage] = useState('')
  const [selectImage,setSelectImage] = useState(null)
  const [userPassWord,setUserPassWord] = useState('')
  const [nameChange,setNameChange] = useState(false)
  const [pwChange,setPwChange] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [pwErr,setPwErr] = useState(false)
  const [changeErr,setChangeErr] = useState(false)
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z@$!%*?&\d]{7,20}$/i;
  const navi = useNavigate()
  useEffect(()=>{
    const user_id = sessionStorage.getItem('memberId')
    const Token = sessionStorage.getItem('Token')
    const header = {
      Headers:{
        Authorization: `Bearer ${Token}`
      }
    }
    axios.get(`/profile/${user_id}`,'',header).then((res)=>{
      if(res.status===200){
        setUserData(res.data)
        setUserName(res.data.userName)
        setUserEmail(res.data.email)
        setUserImage(res.data.profileImageUrl)
      }
    }).catch((res)=>{
      setUserData(dummyData)
      setUserName(dummyData.userName)
      setUserEmail(dummyData.email)
      setUserImage(dummyData.profileImageUrl)
    })
  },[])
  const imageChange = (e) =>{
    setSelectImage(e.target.files[0])
    const imageUrl = URL.createObjectURL(e.target.files[0])
    setUserImage(imageUrl)
    console.log(e.target.files)
  }
  const nameHandle = (e) =>{
    setUserName(e.target.value)
  }
  const nameChangeHandle = () => {
    setNameChange(!nameChange)
    setChangeErr(false)
  }
  const pwHandle = (e) =>{
    setUserPassWord(e.target.value)
  }
  const pwChangeHandle = () =>{
   if(!passwordRegex.test(userPassWord)){
    setPwErr(true)
    setChangeErr(false)
   }else{
    setPwErr(false)
    setPwChange(false)
    setChangeErr(false)
   }
  }
  const cancelChange = () =>{
    setPwChange(false)
    setUserPassWord('')
    setPwErr(false)
    setChangeErr(false)
  }
  const axiosPatchData = (data,header,user_Id) =>{
    axios.patch(`/profile/${user_Id}`,data,header).then((res)=>{
      if(res.status===200){
        console.log(res.data.message)
        navi('/')
      }
    }).catch((res)=>{
      console.log('변경실패')
      navi('/')
    })
  }
  const submitHandle = () =>{
    if(!pwChange && !nameChange){
      const access_token = sessionStorage.getItem('Token')
      const userId = sessionStorage.getItem('memberId')
      if(userPassWord){
        const data = {
          "profileImageUrl": userImage,
          "userName": userName,
          "password": userPassWord
        }
        const header = {
          Headers : {
            Authorization: `Bearer ${access_token}`
          }
        }
        axiosPatchData(data,header,userId)
      }else{
        const data = {
          "profileImageUrl": userImage,
          "userName": userName,
        }
        const header = {
          Headers : {
            Authorization: `Bearer ${access_token}`
          }
        }
        axiosPatchData(data,header,userId)
      }    
    }else{
      setChangeErr(true)
      setPwErr(false)
    }
  }
  return <div>
    {userData && <BodyContainer>
    <InfoTextBox>기본회원 정보</InfoTextBox>
      <ImageBox>  {/* 이미지 담는 층 시작*/}
        <Text>사진</Text> 
        <ImageTextBox>
        <Image src={userImage} alt="" />
        <div>
        <div>회원님을 알릴 수 있는 사진을 등록해 주세요.</div>
        <div>등록된 사진은 회원님의 게시물이나 댓글등에 사용됩니다.</div>
        </div>
        </ImageTextBox>
        <ChangeImage type="file" onChange={(e)=>imageChange(e)}/>
      </ImageBox>
      <NickNameBox> {/* 닉네임 닫는 층 시작 */}
      <Text>닉네임</Text>
      <NickNameText value={userName} disabled={nameChange ? false : true} onChange={(e)=>nameHandle(e)}/>
      <ChangeBtn onClick={nameChangeHandle}>{nameChange ? "확인" : "닉네임 변경"}</ChangeBtn>
      </NickNameBox>
      <EmailBox> {/* 이메일 담는 층 시작 */}
      <Text>이메일</Text>
      <EmailText value={userEmail} disabled={true} />
      </EmailBox>
      <PassWordBox>
        <Text>비밀번호</Text>
        {pwChange ? <PassWordText disabled={false} type={showPassword ? 'text' : 'password'} value={userPassWord} onChange={(e)=>pwHandle(e)}/>:<PassWordText disabled={true} type="password" value={userPassWord ? userPassWord : '********'} />}
        { pwChange ? <ChangeBtn onClick={pwChangeHandle}> 확인 </ChangeBtn> : <ChangeBtn onClick={()=>setPwChange(!pwChange)}> 비밀번호변경 </ChangeBtn> }
        {pwChange && <ChangeBtn onClick={()=>setShowPassword(!showPassword)}>{showPassword ? '숨기기' :'보기'}</ChangeBtn>}
        {pwChange && <ChangeBtn onClick={cancelChange}>초기화</ChangeBtn>}        
      </PassWordBox>
      <RightFlex>
      <UpdateBtn onClick={submitHandle}>수정완료</UpdateBtn>
      </RightFlex>
      {changeErr && <PwErrText>모든 수정을 완료해 주세요.</PwErrText>}
      {pwErr && <PwErrText>비밀번호는 7글자이상 20글자 이하이며 영문자,숫자,특수문자가 각각
                1개이상 포함되어야 합니다.</PwErrText>}
    </BodyContainer>}
  </div>;
}