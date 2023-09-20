import { styled } from 'styled-components';
import footerImg from '../../common/image/footerImg.png';
import githubIcon from '../../common/image/githubIcon.png';

export const FooterWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  min-width: 100%;
  margin: 0 auto;
  background-color: #37404D;
`;


export const BannerLink = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E5F2FF;
  overflow: hidden;
`;

export const BannerImg = styled.div`
  width: 10vw;
  height: 6vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${footerImg});
  margin-left: 10px;

  @media (max-width: 1100px){
    width: 14vw;
    height: 10vw;
  }
`;

export const BannerFont = styled.span`
  font-size: 1.3vw;
  margin-right: 2rem;
  font-weight: bold;

  @media (max-width: 1100px){
    font-size: 2.5vw;
  }
`;

export const FooterSection = styled.div`
  width: 50%;
  color: #BDBDBD;
  text-align: left;
  padding: 1rem 0 0 0;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1100px){
    flex-direction: column;
    margin: 0;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

export const TeamInfo = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: flex-start;
  justify-content: space-around;
  font-size: 0.9rem;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start; 
    flex-wrap: wrap;
  }
`;

export const TeamName = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 5rem;

  @media (max-width: 1100px) {
    margin-bottom: 10px;
  }
  `;

export const TeamMembers = styled.div`
  display: flex;
  align-items: top;

  @media (max-width: 1100px){
    flex-direction: column;
    margin: 0;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

export const BE = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 2rem;

  @media (max-width: 1100px){
    flex-direction: row;
    margin: 0;
    flex-wrap: wrap;
    & > div {
      margin-right: 10px;
    }
  }
`;

export const BEMem = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 1100px){
    margin-right: 10px;
  }
`;

export const FE = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  @media (max-width: 1100px){
    flex-direction: row;
    margin: 0;
    flex-wrap: wrap;
    & > div {
      margin-right: 10px;
    }
  }
`;

export const FEMem = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 1100px){
    margin-right: 10px;
  }
`;

export const TeamRepoLink = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  margin-left: auto;
  
  @media (max-width: 1100px){
    margin: 0;
  }
`;

export const TeamRepo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;

  @media (max-width: 1100px){
    flex-direction: row;
  }
`;

export const GithubIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  content: url(${githubIcon});
`;

export const Copyright = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #37404D;
  color: #BDBDBD;
  text-align: center;
  font-size: 0.8rem;
`;