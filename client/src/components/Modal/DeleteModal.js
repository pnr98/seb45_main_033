import axios from "axios"
import { ModalBody, ModalBtn, ModalBtnContainer, ModalText,ModalBtnBox } from "./DeleteModal.styled"


const DeleteModal = ({type,data}) => {
  const axiosData = () => {
    if(type==='Delete'){
      console.log(data)
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
      <ModalBtn>삭제</ModalBtn>
      </ModalBtnBox>
    </ModalBtnContainer>
 </ModalBody>
}


export default DeleteModal