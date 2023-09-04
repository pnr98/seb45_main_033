import axios from "axios"
import { ModalBody, ModalBtn, ModalBtnContainer, ModalText,ModalBtnBox } from "./DeleteModal.styled"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const DeleteModal = ({type,data}) => {
  const navi = useNavigate()
  const token = useSelector(state=>state.access_Token)
  const header = {
    Headers : {
      Authorization: `Bearer {access_token}`
    }
  }
  const axiosData = () => {
    if(type==='Delete'){
      console.log(data)
      axios.delete('/recipes/{recipe-id}','',header).then((res)=>{
        if(res.status === 204){
          navi('/')
        }
      }).catch((res)=>{
        console.log(res)
      })
    }
    if(type==='Comment'){
      console.log(data)
    }
    if(type==='Guest' ){
      console.log(data)
    }
  }
 return <ModalBody>
    <ModalText>
      {type==='Delete' && '삭제하시겠습니까?'}
      {type==='Comment' && '댓글 작성을 취소하시겠습니까?'}
      {type==='Guest' && '게스트로 로그인 하시겠습니까?'}
      </ModalText>
    <ModalBtnContainer>
      <ModalBtnBox>
      <ModalBtn>취소</ModalBtn>
      <ModalBtn onClick={()=>axiosData}>삭제</ModalBtn>
      </ModalBtnBox>
    </ModalBtnContainer>
 </ModalBody>
}


export default DeleteModal