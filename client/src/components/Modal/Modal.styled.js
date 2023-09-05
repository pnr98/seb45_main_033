import { styled } from "styled-components";

export const ModalBody = styled.section`
position: fixed;
width: 374px;
height: 140px;
background-color: aliceblue;
left: 40%;
top: 40%;
display: flex;
flex-direction: column;
`

export const ModalText = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 374px;
height: 100px;
`

export const ModalBtnContainer = styled.div`
display: flex;
width: 374px;
height: 40px;
justify-content: end;
`

export const ModalBtnBox = styled.div`
width: 140px;
height: 40px;
display: flex;
margin-right: 10px;
justify-content: end;
align-items: center;
gap: 10px;
`

export const ModalBtn = styled.button`
border: 1px solid black;
`