import { useState,  useEffect } from "react";
import axios from "axios";
import { Container, BtnContainer } from "./Comment.styled";

export default function CommentHandler({recipeId, timeSlice}) {
    const comment = {
        "comments":
        [
            {
                "commentId": 1,
                "commentBody": "Updated comment content.",
                "timestamp": "2023-08-16T15:49:20.753395",
                "memberId": 1,
                "userName": "홍길동"
            },
            {
                "commentId": 2,
                "commentBody": "Updated comment content.",
                "timestamp": "2023-08-16T15:49:20.753395",
                "memberId": 2,
                "userName": "홍길동2"
            },
        ]
    }
    const [ comments, setComments ] = useState([])
    const [ commentBody, setCommentBody ] = useState("");
    const [ commentIdToEdit, setCommentIdToEdit ] = useState(null);
    const AccessToken = 'a'


    useEffect(() => {
        // 댓글 불러오기
        const getComments = async () => {
            try {
                const response = await axios.get(`comment/${recipeId}`)
                setComments(response.data.comments)
            } catch (err) {
                console.error(err)
                setComments(comment.comments)
            }
            };
            getComments()
        }, [])

    // 댓글 작성
    const handleCommentSubmit = async () => {
        try {
            if (commentBody.trim() === "") {
                alert("댓글 내용을 입력하세요")
                return;
            }
            if (commentBody.length > 500) {
                alert("댓글은 500자 이하여야 합니다.")
                return;
            }
            const response = await axios.post(`/comment/${recipeId}`, 
                { commentBody: commentBody }, 
                { headers: { Authorization: `Bearer ${AccessToken}`,
                },
            });

            const newComment = response.data
            setComments([...comment, newComment])
            setCommentBody("");
        } catch (error) {
            console.error("댓글 등록 오류:", error);
            //
            const newComment = [{
                commentId: comments.length + 1,
                commentBody: commentBody,
                timestamp: "2023-08-16T15:49:20.753395",
                memberId: 3,
                userName: "홍길동3",
            }];
            setComments([...comments, newComment])
            setCommentBody("");
        }
    }

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        try {
            await axios.delete(`/comment/${recipeId}/${commentId}`, {
                headers: {
                Authorization: `Bearer {access_token}`,
            },
            })
            const updateComments = comments.filter((comment) => comment.commentId !== commentId)
            setComments(updateComments)
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
            //
            const updateComments = comments.filter((comment) => comment.commentId !== commentId)
            setComments(updateComments)
        }
    }

    // 댓글 수정
    const handleCommentEdit = async (updatedCommentBody) => {
        try {
            if (updatedCommentBody.trim() === "") {
                // 수정된 댓글 내용이 비어있는 경우 처리
                alert("댓글 내용을 입력하세요.");
                return;
            }
            const response = await axios.patch(`/comment/${recipeId}`, 
                { commentBody: updatedCommentBody}, 
                { headers: 
                    { Authorization: `Bearer ${AccessToken}`}
            });
            const updateComments = comments.map((comment) => {
                comment.commentId === commentIdToEdit ? response.data : comment 
            })
            setComments(updateComments)
            setCommentIdToEdit(null)
            setCommentBody("")
        } catch (error) {
            console.error("댓글 수정 오류:", error);
            //

        }
    }

    return (
        <Container>
            <textarea
            rows='5'
            cols='100'
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder=" 댓글을 입력하세요..."
            ></textarea>
            {commentIdToEdit !== null ? (
                <button onClick={handleCommentEdit}> 수정</button>
            ) : (
                <button onClick={handleCommentSubmit}>등록</button>
            )}
            <ul>
                {comments.map((el, index) => {
                    return <li key={index}>
                        <div className='comment'>
                            <div className='name'>{el.userName}</div>
                            <div className='time'>작성일 {timeSlice(el.timestamp)}</div>
                            <BtnContainer>
                                <button onClick={() => setCommentIdToEdit(el.commentId)}>수정</button>
                                <button onClick={() => handleCommentDelete(el.commentId)}>삭제</button>
                            </BtnContainer>
                        </div>
                            <div className='contents'>{el.commentBody}</div>
                    </li>
                })}
            </ul>
        </Container>
    )
}