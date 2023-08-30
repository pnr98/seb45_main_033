import { BodyContainer,InfoTextBox, ImageBox, Image, Text, ImageTextBox, ChangeImage, NickNameBox, NickNameText, ChangeBtn, EmailBox , EmailText} from "./MyPage.Styled";

export default function MyPage() {
  return <div>
    <BodyContainer>
    <InfoTextBox>기본회원 정보</InfoTextBox>
      <ImageBox>  {/* 이미지 담는 층 시작*/}
        <Text>사진</Text> 
        <ImageTextBox>
        <Image src="https://i.ibb.co/hHYvKbq/image.jpg" alt="" />
        <div>
        <div>회원님을 알릴 수 있는 사진을 등록해 주세요.</div>
        <div>등록된 사진은 회원님의 게시물이나 댓글등에 사용됩니다.</div>
        </div>
        </ImageTextBox>
        <ChangeImage>사진 변경</ChangeImage>
      </ImageBox>
      <NickNameBox> {/* 닉네임 닫는 층 시작 */}
      <Text>닉네임</Text>
      <NickNameText>유저의 닉네임</NickNameText>
      <ChangeBtn>닉네임 변경</ChangeBtn>
      </NickNameBox>
      <EmailBox> {/* 이메일 담는 층 시작 */}
      <Text>이메일</Text>
      <EmailText>유저의 이메일</EmailText>
      </EmailBox>

    </BodyContainer>
  </div>;
}

