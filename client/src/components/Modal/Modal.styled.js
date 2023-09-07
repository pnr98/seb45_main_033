import { styled } from "styled-components";

export const ModalBody = styled.section`
  position: fixed;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 373px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #6B6B6B;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalText = styled.div`
  text-align: center;
  width: 100%;
`;

export const ModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ModalBtn = styled.button`
  background-color: #D0C5B0;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 9px 15px; // 좀 더 넓은 패딩으로 버튼 크기 조절 // 원래는 9px 11px
  cursor: pointer; // 버튼 위에 마우스 커서를 포인터로 변경
  //transition: background-color 0.3s; // 부드러운 색상 전환 효과 추가

  &:hover {
    //background-color: #B8A690; // 마우스 오버 시 색상 변경
  }
`;
