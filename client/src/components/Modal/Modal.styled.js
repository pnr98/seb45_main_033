import { styled } from "styled-components";

export const ModalBody = styled.section`
  position: fixed;
  background-color: white;
  width: 300px;
  height: 140px;
  flex-shrink: 0;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #6B6B6B;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const ModalText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ModalBtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end; // 버튼을 중앙에 정렬
`;

export const ModalBtnBox = styled.div`
  display: flex;
`;

export const ModalBtn = styled.button`
  background-color: #D0C5B0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px 15px; // 좀 더 넓은 패딩으로 버튼 크기 조절
  cursor: pointer; // 버튼 위에 마우스 커서를 포인터로 변경
  transition: background-color 0.3s; // 부드러운 색상 전환 효과 추가

  &:hover {
    background-color: #B8A690; // 마우스 오버 시 색상 변경
  }
`;
