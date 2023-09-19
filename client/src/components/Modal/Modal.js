import axios from "axios"
import { ModalBody, ModalBtn, ModalText, ModalBtnBox, ModalBackground } from "./Modal.styled"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

/* 모달 컴포넌트 인자 */
/* type = 해당 모달의 목적 (필수) */
/* ('Delete',게시글 삭제)('Guest',게스트 로그인),('LoginPlz',로그인후 이용 바람)
   ('Welcome',환영합니다)('Create,글 작성 확인),('Update',글 수정 확인)         */
/* func = 상위 컴포넌트 상태 변경 함수 */
/* recipe_id = 호출 컴포넌트 recipe_id */
const Modal = ({type,func, recipe_id , username}) => {
  const navi = useNavigate()
  const AccessToken = sessionStorage.getItem('Token');
  const setStateHandle = () => {
    func()
  }

  const ModalHandle = () => {
    if(type==='Delete'){
      const header = {
        Headers : {
          Authorization: `Bearer ${AccessToken}`
        }
      }
      axios.delete(`/recipes/${recipe_id}`,header).then((res)=>{ 
        if(res.status === 204){
          navi('/')
        }
      }).catch((err)=>{
        console.error('삭제 요청 실패: ', err)
      })
    }
    if(type==='Guest' ){
      // 게스트 로그인 요청 구현//
      navi('/')
    }
    if(type==='LoginPlz'){
      navi('/login')
      func();
    }
    if(type==='Create'){
      navi(`/recipe/${recipe_id}`)
    }
    if(type==='Welcome'){
      navi('/')
    }
    if(type==='Update'){
      navi(`/recipe/${recipe_id}`)
    }
    if(type==='Badextension'){
      func();
    }
  }
 return <ModalBackground>
 <ModalBody>
    <ModalText>
      {type==='Delete' && '삭제하시겠습니까?'}
      {type==='Guest' && '게스트로 로그인 하시겠습니까?'}
      {type==='LoginPlz' && '로그인 후 이용해주세요.'}
      {type==='Welcome' && `환영합니다 ${username}님.`}
      {type==='Create' && '레시피 등록을 완료했습니다.'}
      {type==='Update' && '레시피 수정을 완료했습니다.'}
      {type==='Badextension' && 'jpg/png 파일만 업로드 가능합니다.'}
      </ModalText>
      <ModalBtnBox>
        {(type==='Delete' || type==='Guest') && <ModalBtn onClick={()=>setStateHandle()}>취소</ModalBtn>}
      <ModalBtn onClick={ModalHandle}>
        {type === 'Delete' && '삭제'}
        {type === 'Guest' && '수락'}
        {(type === 'LoginPlz' || type === 'Badextension') && '확인'}
        {(type === 'Welcome' || type === 'Create' || type==='Update') && '닫기'}
        </ModalBtn>
      </ModalBtnBox>
 </ModalBody>
 </ModalBackground>
}


export default Modal