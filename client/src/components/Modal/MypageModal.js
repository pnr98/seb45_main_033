import { useState } from "react"
import { ModalBackground , ModalBody , ModalText , ModalBtnBox , ModalBtn, DeleteModalBody, DeleteModalText, InputContainer
        , DeleteText, DeleteMessage, DeleteMessageContainer, DeleteInput} from "./Modal.styled"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { setAccessToken, setLoginStatus } from "../../redux/action/action"
import Cookies from "js-cookie"

const MyPageModal = ({type,func}) => {
    const [isDelete , setIsDelete] = useState(false)
    const [deleteText,setDeleteText] = useState('')
    const [deleteMessage,setDeleteMessage] = useState(false)
    const [deleteComplete,setDeleteComplete] = useState(false)
    const dispatch = useDispatch()
    const navi = useNavigate()
    const setStateHandle = () =>{
        func()
    }

    const ModalHandle = () => {
        const header = {
            Headers : {
                Authorization: `Bearer {Token}`
            }
        }
     if(type==='Logout'){
        axios.post(`/auth/logout`,'',header).then((res)=>{
            if(res.status===200){
                dispatch(setAccessToken(''))
                dispatch(setLoginStatus(false))
                sessionStorage.removeItem('Token')
                Cookies.remove('Token')
                navi('/')
            }
        }).catch((res)=>{
            dispatch(setAccessToken(''))
                dispatch(setLoginStatus(false))
                sessionStorage.removeItem('Token')
                Cookies.remove('Token')
                navi('/')
        })
     }
     if(type==='Withdrawal'){
        if(deleteComplete){
            navi('/')
            return
        }
        if(!isDelete){
            setIsDelete(true)
        }else
        if(deleteText==='계정삭제'){
            axios.delete(`/auth/deactivate`,'',header).then((res)=>{
                if(res.status===204){
                    dispatch(setAccessToken(''))
                    dispatch(setLoginStatus(false))
                    sessionStorage.removeItem('Token')
                    setDeleteComplete(true)
                }
               }).catch((res)=>{
                console.log('계정삭제 성공')
                setDeleteComplete(true)
                sessionStorage.removeItem('Token')
               })
        }else{
            setDeleteMessage(true)
        }
     }
    }
    return <ModalBackground>
        {!isDelete ? <ModalBody>
       <ModalText>
        {type === 'Logout' && '로그아웃 하시겠습니까?'}
        {type === 'Withdrawal' && <div><div>회원탈퇴 하시겠습니까?</div><DeleteMessage>탈퇴시 계정은 삭제되어 복구되지 않습니다.</DeleteMessage></div>}
         </ModalText>
         <ModalBtnBox>
           <ModalBtn onClick={setStateHandle}>취소</ModalBtn>
         <ModalBtn onClick={ModalHandle}>
            확인
           </ModalBtn>
         </ModalBtnBox>
    </ModalBody> : !deleteComplete ?
        <DeleteModalBody>
        <DeleteModalText>
            <DeleteText>계정삭제</DeleteText> 입력후 확인 버튼을 눌러주세요.
            <DeleteMessage>계정정보가 서버에서 삭제됩니다.</DeleteMessage>
        </DeleteModalText>
        <InputContainer>
        <DeleteInput value={deleteText} onChange={(e)=>setDeleteText(e.target.value)} placeholder="'계정삭제'를 입력해주세요."/>
        </InputContainer>
        <DeleteMessageContainer>
            {deleteMessage && <DeleteMessage>(계정삭제)를 정확하게 입력해주세요.</DeleteMessage>}
        </DeleteMessageContainer>
        <ModalBtnBox>
           <ModalBtn onClick={setStateHandle}>취소</ModalBtn>
         <ModalBtn onClick={ModalHandle}>
            확인
           </ModalBtn>
         </ModalBtnBox>
         </DeleteModalBody>
     : <ModalBody>
        <ModalText>
            회원탈퇴가 완료되었습니다.
        </ModalText>
        <ModalBtnBox>
        <ModalBtn onClick={ModalHandle}>
            확인
           </ModalBtn>
        </ModalBtnBox>
        </ModalBody>}
    </ModalBackground>
}

export default MyPageModal