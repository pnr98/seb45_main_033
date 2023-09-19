import { useState } from "react";
import like from '../../common/image/like.png'
import unlike from '../../common/image/unlike.png'
import { BtnContainer } from "./IsLike.styled";
import axios from "axios";
import Modal from '../../components/Modal/Modal'
import { checkLogin } from "../../checkLogin/checkLogin";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function LikeButton({recipe_id, likes, onLikeChange}) {
    const AccessToken = sessionStorage.getItem('Token');
    const [ isLiked, setIsLiked ] = useState(false)
    const [ showModal, setShowModal ] = useState(false);

    const isLogin = checkLogin();

    // 좋아요 클릭
    const handleOnClick = async () => {
        if (!isLogin) { // 로그인되지 않은 경우 모달 열기
            setShowModal(true)
            return;
        }
        
        if (isLiked) { // 이미 좋아요를 누른 경우
            // axios.post(`/like/${recipe_id}`, null, {
            axios.post(`${BASE_URL}/like/${recipe_id}`, null, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLiked(false)
                        onLikeChange(-1)
                }
            })
            .catch ((err) => {
                console.error('좋아요 취소 요청 중 오류 발생.', err)
            })
        } else { // POST 요청을 통해 좋아요 추가                
            // axios.post(`/like/${recipe_id}`, null, {
            axios.post(`${BASE_URL}/like/${recipe_id}`, null, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLiked(true)
                        onLikeChange(1) // 좋아요 수 업데이트
                }
                })
            .catch ((err) => {
                console.error('좋아요 요청 중 오류 발생.', err)
            })
        }
    }

    return (
        <BtnContainer>
            {showModal && (
                <Modal 
                    type="LoginPlz"
                    func={() => setShowModal(false)}
                    recipe_id={recipe_id}
                />
            )}
            <button onClick={handleOnClick}>
                {isLiked ? 
                (<img src={like} alt="like" />)
                : 
                (<img src={unlike} alt="unlike" />)
                }
                <div>{likes}</div>
            </button>
        </BtnContainer>
    )
}
