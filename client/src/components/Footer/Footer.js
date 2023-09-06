import { 
  FooterWrapper, BannerLink, BannerImg, BannerFont, 
  FooterSection, 
  TeamInfo,
  TeamName, 
  TeamMembers,
  BE, BEMem, 
  FE, FEMem, 
  TeamRepoLink,
  TeamRepo, 
  GithubIcon, 
  Copyright 
} from './Footer.styled';

const Footer = () => {
  return (
    <FooterWrapper>
      <BannerLink>
        <BannerFont>자신만의 레시피를 공유해주세요!</BannerFont>
        <BannerImg />
      </BannerLink>
      <FooterSection>
        <TeamInfo>
          <TeamName>33양호</TeamName>
          <TeamMembers>
            <BE>
              <BEMem>BE</BEMem>
              <div>김제경 (팀장)</div>
              <div>김태형</div>
              <div>노시형</div>
            </BE>
            <FE>
              <FEMem>FE</FEMem>
              <div>전용호 (부팀장)</div>
              <div>김한샘</div>
              <div>박나래</div>
              <div>윤선문</div>
            </FE>
          </TeamMembers>
        </TeamInfo>
        <TeamRepoLink>
          <a href="https://github.com/codestates-seb/seb45_main_033" target="_blank" rel="noopener noreferrer">
            <TeamRepo>
              <GithubIcon />
              <p>Team Repository</p>
            </TeamRepo>
          </a>
        </TeamRepoLink>
      </FooterSection>
      <Copyright>Copyright  2023  33양호 Inc. All Rights Reserved   E-mail: codestates@gmail.com</Copyright>
    </FooterWrapper>
  );
};

export default Footer;
