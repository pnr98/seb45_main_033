import { useState,  useEffect } from "react";
import like from '../../common/image/like.png'
import unlike from '../../common/image/unlike.png'
import { BtnContainer } from "./IsLike.styled";
import axios from "axios";


export default function LikeButton({recipeId, likes, onLikeChange}) {
    const AccessToken = `ACCESS_TOKEN`
    const [ isLiked, setIsLiked ] = useState(false)

    // 좋아요 클릭
    const handleOnClick = async () => {
        if (isLiked) { // 이미 좋아요를 누른 경우 DELETE
            axios.delete(`/recipe/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
            })
                .then((res) => {
                    if (res.status === 204) {
                        setIsLiked(false)
                        onLikeChange(-1)
                } else {
                    console.error('좋아요 취소 요청이 실패했습니다.')
                }
            })
            .catch ((err) => {
                setIsLiked(false)
                onLikeChange(-1)
                console.error('좋아요 취소 요청 중 오류 발생.', err)
            })
        } else { // POST 요청을 통해 좋아요 추가                
            axios.post(`/recipe/${recipeId}`, null, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLiked(true)
                        onLikeChange(1) // 좋아요 수 업데이트
                } else {
                    console.error('좋아요 요청이 실패했습니다.')
                }
                })
            .catch ((err) => {
                setIsLiked(true)
                onLikeChange(1)
                console.error('좋아요 요청 중 오류 발생.', err)
            })
        }
    }

    return (
        <BtnContainer>
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
