import { FooterWrapper, BannerLink, BannerImg, BannerFont, FooterSection, TeamName, TeamRepo, BE, FE, BEMem, FEMem, MemberName, GithubIcon, Copyright } from './Footer.styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <BannerLink>
        <BannerFont>자신만의 레시피를 공유해주세요!</BannerFont>
        <BannerImg />
      </BannerLink>
      <FooterSection>
          <TeamName>33양호</TeamName>
        <BE>
          <BEMem>BE</BEMem>
          <MemberName>김제경 (팀장)</MemberName>
          <MemberName>김태형</MemberName>
          <MemberName>노시형</MemberName>
        </BE>
        <FE>
          <FEMem>FE</FEMem>
          <MemberName>전용호 (부팀장)</MemberName>
          <MemberName>김한샘</MemberName>
          <MemberName>박나래</MemberName>
          <MemberName>윤선문</MemberName>
        </FE>
        <a href="https://github.com/codestates-seb/seb45_main_033" target="_blank" rel="noopener noreferrer">
          <TeamRepo>
            <GithubIcon />
            <p>Team Repository</p>
          </TeamRepo>
        </a>
      </FooterSection>
      <Copyright>Copyright  2023  33양호 Inc. All Rights Reserved   E-mail: codestates@gmail.com</Copyright>
    </FooterWrapper>
  );
};

export default Footer;
