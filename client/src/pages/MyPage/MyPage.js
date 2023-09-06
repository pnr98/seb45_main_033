import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyFrige from "./MyFrige";
import UserInfo from "./UserInfo";
import { MypageContainer,TapContainer,Tap } from "./MyPage.Styled";
const dummyData = {
  "profileImageUrl": "https://i.ibb.co/hHYvKbq/image.jpg",
  "email": "example@gmail.com",
  "userName": "홍길동"
}
export default function MyPage() {
  const [currentTap,setCurrentTap] = useState('냉장고')
  const TapEvent = (type) =>{
    setCurrentTap(type)
  }
  return <MypageContainer>
    <TapContainer>
    <Tap stroke={currentTap==='냉장고' && true} onClick={()=>TapEvent('냉장고')} >나만의 냉장고</Tap>
    <Tap stroke={currentTap!=='냉장고' && true} onClick={()=>TapEvent('회원정보')}>회원정보 수정</Tap>
    </TapContainer>
    {currentTap==='냉장고' ? <MyFrige /> : <UserInfo />}
  </MypageContainer>;
}

