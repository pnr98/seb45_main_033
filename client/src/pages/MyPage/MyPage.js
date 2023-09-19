import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyFrige from "./MyFrige";
import UserInfo from "./UserInfo";
import { MypageContainer,TapContainer,Tap } from "./MyPage.Styled";
import MyPageModal from "../../components/Modal/MypageModal";
import { checkLogin } from "../../checkLogin/checkLogin";
const dummyData = {
  "profileImageUrl": "https://i.ibb.co/hHYvKbq/image.jpg",
  "email": "example@gmail.com",
  "userName": "홍길동"
}
export default function MyPage() {
  const [currentTap,setCurrentTap] = useState('냉장고')
  const [logoutModal,setLogoutModal] = useState(false)
  const [withdrawalModal,setWithdrawalModal] = useState(false)
  const isLogin = checkLogin()
  const navi = useNavigate()

  useEffect(()=>{
    if(!isLogin){
      navi('/')
    }
  },[])
  
  const TapEvent = (type) =>{
    setCurrentTap(type)
  }
  const logoutModalOff = () => {
    setLogoutModal(false)
  }
  const logoutModalOn = () =>{
    setLogoutModal(true)
  }
  const withdrawalModalOff = () =>{
    setWithdrawalModal(false)
  }
  const withdrawalModalOn = () =>{
    setWithdrawalModal(true)
  }
  return <MypageContainer>
    <TapContainer>
    <Tap stroke={currentTap==='냉장고' ? "stroke" : undefined } onClick={()=>TapEvent('냉장고')} >나만의 냉장고</Tap>
    <Tap stroke={currentTap!=='냉장고' ? "stroke"  : undefined} onClick={()=>TapEvent('회원정보')}>회원정보 수정</Tap>
    <Tap onClick={logoutModalOn}>로그아웃</Tap>
    <Tap onClick={withdrawalModalOn}>회원탈퇴</Tap>
    </TapContainer>
    {logoutModal && <MyPageModal type='Logout' func={logoutModalOff} />}
    {withdrawalModal && <MyPageModal type='Withdrawal' func={withdrawalModalOff} /> }
    {currentTap==='냉장고' ? <MyFrige /> : <UserInfo />}
  </MypageContainer>;
}

