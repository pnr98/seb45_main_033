import { useState,  useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, InputContainer, EditContainer, Button } from "./Comment.styled";
import Modal from '../../components/Modal/Modal'
import { checkLogin } from "../../checkLogin/checkLogin";

export default function CommentHandler({ recipeId, timeSlice, memberId }) {
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
    // 댓글 수정
    const [ commentIdToEdit, setCommentIdToEdit ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editingComment, setEditingComment] = useState("")

    const [showModal, setShowModal] = useState(false);
    const isLogin = checkLogin()
    
    const AccessToken = 'a'

    useEffect(() => {
        // 댓글 불러오기
        const getComments = async () => {
            try {
                const response = await axios.get(`/${recipeId}`)
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
            const response = await axios.post(`/${recipeId}`, 
                { commentBody: commentBody }, 
                { headers: { Authorization: `Bearer ${AccessToken}`,
                },
            });
            if (response.status === 200) {
                const newComment = response.data
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentBody("");
            } 
        } catch (error) {
            console.error("댓글 등록 요청 실패:", error);
            //
            const newComment = [{
                commentId: comments.length + 1,
                commentBody: commentBody,
                timestamp: "2023-08-16T15:49:20.753395",
                memberId: 1,
                userName: "홍길동3",
            }];
            console.log(comments)
            console.log(newComment)
            setComments((prevComments) => [...prevComments, newComment]);
            setCommentBody("");
        }
    }

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        try {
            const response = await axios.delete(`/comment/${recipeId}/${commentId}`, {
                headers: {
                Authorization: `Bearer {access_token}`,
            },
            })
            if (response.status === 204) {
                const updateComments = comments.filter((comment) => comment.commentId !== commentId)
                setComments(updateComments)
            }
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
            //
            const updateComments = comments.filter((comment) => comment.commentId !== commentId)
            setComments(updateComments)
        }
    }

    // 댓글 수정
    const handleCommentSave = async (commentId) => {
        try {
            const response = await axios.patch(`/comment/${recipeId}`, 
                { commentBody: editingComment}, 
                { headers: { 
                    Authorization: `Bearer ${AccessToken}`
                }
            });

            if (response.status === 200) {
                const updatedComments = comments.map((comment) => {
                    comment.commentId === commentId ? response.data : comment 
            })
            setComments(updatedComments);
            setCommentIdToEdit(null);
            setIsEditing(false);
            setEditingComment("");
            } else if (response.status === 400) {
                // 댓글 500자 이하
                alert(response.data.message)
            } 
        } catch (error) {
            console.error("댓글 수정 저장 오류:", error)

            // 새로운 댓글 목록을 생성합니다.
            const updatedComments = comments.map((comment) => {
                if (comment.commentId === commentId) {
                return { ...comment, commentBody: editingComment };
                }
                return comment;
            });
            // 업데이트된 댓글 목록을 적용합니다.
            setComments(updatedComments);
            setCommentIdToEdit(null);
            setIsEditing(false);
            setEditingComment("");
        }
    }
    // 로그인 요청 모달
    const handleModal = () => {
        //
        if (isLogin) {
            setShowModal(true)
        }
    }

    return (
        <Container>
            {showModal && (
                <Modal 
                    type="LoginPlz"
                    func={() => setShowModal(false)}
                    recipe_id={recipeId}
                />
            )}
            <InputContainer>
                <textarea
                    rows='5'
                    cols='100'
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    onClick={handleModal}
                />
                <Button 
                    boxColor="orange"
                    onClick={handleCommentSubmit}>등록</Button>
            </InputContainer>
            <ul>
                {comments.map((el, index) => {
                    return (
                        <li key={index}>
                            <div className='header'>
                                <div className='name'>{el.userName}</div>
                                <div className='time'>작성일 {timeSlice(el.timestamp)}</div>
                            </div>
                            {!(commentIdToEdit === el.commentId && isEditing) ? (
                                <div className='contents'>{el.commentBody}</div>
                            ) : (
                                <textarea
                                    className="edit-input"
                                    rows='3'
                                    cols='100'
                                    value={editingComment}
                                    onChange={(e) => setEditingComment(e.target.value)}
                                ></textarea>
                            )}
                            <EditContainer>
                                    {/* 본인이 작성한 글에만 수정과 삭제버튼 표시 */}
                                    {el.memberId === memberId && (
                                        <>
                                            {!(commentIdToEdit === el.commentId && isEditing) ? (
                                                <div className="Btn-container">
                                                    <Button
                                                        size="small"
                                                        boxColor="orange"
                                                        onClick={() => {
                                                            setCommentIdToEdit(el.commentId);
                                                            setEditingComment(el.commentBody);
                                                            setIsEditing(true);
                                                        }}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button 
                                                        size="small"
                                                        onClick={() => handleCommentDelete(el.commentId)}>
                                                        삭제
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="Btn-container">
                                                    <Button 
                                                        size="small"
                                                        boxColor="orange"
                                                        onClick={() => handleCommentSave(el.commentId)}>
                                                        등록
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        onClick={() => {
                                                            setCommentIdToEdit(null);
                                                            setIsEditing(false);
                                                            setEditingComment("");
                                                        }}
                                                    >
                                                        취소
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                            </EditContainer>
                        </li>
                    )})}
            </ul>
        </Container>
    )
}