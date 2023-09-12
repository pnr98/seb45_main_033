import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyFrige from "./MyFrige";
import UserInfo from "./UserInfo";
import { MypageContainer,TapContainer,Tap } from "./MyPage.Styled";
import { useDispatch } from "react-redux";
import { setAccessToken, setLoginStatus } from "../../redux/action/action";
import Cookies from "js-cookie";
import MyPageModal from "../../components/Modal/MypageModal";
const dummyData = {
  "profileImageUrl": "https://i.ibb.co/hHYvKbq/image.jpg",
  "email": "example@gmail.com",
  "userName": "홍길동"
}
export default function MyPage() {
  const [currentTap,setCurrentTap] = useState('냉장고')
  const [logoutModal,setLogoutModal] = useState(false)
  const [withdrawalModal,setWithdrawalModal] = useState(false)
  const navi = useNavigate()
  const dispatch = useDispatch()
  const TapEvent = (type) =>{
    setCurrentTap(type)
  }
  const logOutHandle = () =>{
    dispatch(setAccessToken(''))
    dispatch(setLoginStatus(false))
    sessionStorage.removeItem('Token')
    Cookies.remove('Token')
    useNavigate('/')
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
    <Tap stroke={currentTap==='냉장고' && true} onClick={()=>TapEvent('냉장고')} >나만의 냉장고</Tap>
    <Tap stroke={currentTap!=='냉장고' && true} onClick={()=>TapEvent('회원정보')}>회원정보 수정</Tap>
    <Tap onClick={logoutModalOn}>로그아웃</Tap>
    <Tap onClick={withdrawalModalOn}>회원탈퇴</Tap>
    </TapContainer>
    {logoutModal && <MyPageModal type='Logout' func={logoutModalOff} />}
    {withdrawalModal && <MyPageModal type='Withdrawal' func={withdrawalModalOff} /> }
    {currentTap==='냉장고' ? <MyFrige /> : <UserInfo />}
  </MypageContainer>;
}

