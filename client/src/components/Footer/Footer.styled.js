import { styled } from 'styled-components';
import footerImg from '../../common/image/footerImg.png';
import githubIcon from '../../common/image/githubIcon.png';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const BannerLink = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E5F2FF;
  overflow: hidden;

  @media (max-width: 900px) {
    height: 3rem;
    width: 100%; 
  }  
`;

export const BannerImg = styled.div`
  width: 210px;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  margin-bottom: 10px;
  background-image: url(${footerImg});
  margin-left: 10px;

  @media (max-width: 900px) {
    width: 5rem;
    height: 4rem;
  }
`;

export const BannerFont = styled.span`
  font-size: 1.5vw;
  font-weight: bold;
`;

export const FooterSection = styled.div`
  width: 100%;
  background-color: #37404D;
  color: #BDBDBD;
  text-align: left;
  padding: 30px 500px; 
  display: flex;
  justify-content: space-between;

  @media (max-width: 1700px) {
      padding: 15px 450px;
  }  
  @media (max-width: 1600px) {
      padding: 15px 400px;
  }  
  @media (max-width: 1500px) {
      padding: 15px 350px;
  }
  @media (max-width: 1400px) {
      padding: 15px 300px;
  }          
  @media (max-width: 1300px) {
      padding: 15px 250px;
  }
  @media (max-width: 1200px) {
      padding: 15px 200px;
  }
  @media (max-width: 1100px) {
      padding: 15px 150px;
  } 
  @media (max-width: 1000px) {
      padding: 15px 100px;
  }    
  @media (max-width: 900px) {
    padding: 15px 80px; 
    display: flex;
    flex-direction: row;  
    align-items: flex-start; 
  }
  @media (max-width: 835px) {
    padding: 15px 0px; 
    display: flex;
    align-items: flex-start;
  }
  @media (max-width: 602px) {
    padding-top: 10px;  
    display: flex;
    flex-direction: column; 
    align-items: center; 
  }
`;

export const TeamName = styled.p`
  font-size: 35px;
  font-weight: bold;
  margin-right: -200px;
  
  @media (max-width: 900px) {
    font-size: 20px;
    margin: 0 auto;
    text-align: left;  
  }
  @media (max-width: 602px) {
    width: 100%;  
    text-align: left;  
    padding-left: 40px;
    margin-bottom: 10px;
  }
`;

export const BE = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-right: -150px;

  @media (max-width: 900px) {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    text-align: left;  
  }
  @media (max-width: 835px) {
    display: flex;
    font-size: 1.5vw;
  }
  @media (max-width: 602px) {
    width: 100%; 
    text-align: left; 
    padding-left: 40px;
  }
`;

export const FE = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    text-align: left; 
  }
  @media (max-width: 835px) {
    display: flex;
    font-size: 1.5vw;
  }
  @media (max-width: 602px) {
    width: 100%;  
    text-align: left;  
    padding-left: 40px;
  }
`;


export const BEMem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; 
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 900px) {
    font-size: 12px;
    margin-left: 15px;
    text-align: left; 
    margin-right: 10px; 
  }
`;

export const FEMem = styled.div`
  margin-bottom: 10px;
  display: flex; 
  flex-direction: column;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 900px) {
    font-size: 12px;
    margin-left: 15px;
    text-align: left;  
    margin-right: 10px; 
  }
`;

export const MemberName = styled.div`
  @media (max-width: 900px) {
    margin-right: 10px; 
  }
`;

export const TeamRepo = styled.div`
  display: flex; 
  align-items: center;  
  flex-direction: column;  
  margin-top: 10px;
  
  @media (max-width: 900px) {
    display: flex; 
    align-items: top;
    flex-direction: row;
    margin-top: 10px;    

    font-size: 12px;
    margin: 0 auto;
    text-align: left;  
    font-size: 1.5vw;
  }
  @media (max-width: 602px) {
    width: 100%; 
    text-align: left;  
    padding-left: 50px;
  }
`;

export const GithubIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  content: url(${githubIcon});

  @media (max-width: 900px) {
    justify-content: left;  
    width: 25px;
    height: 25px;    
    
}
`;

export const Copyright = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: #37404D;
  color: #BDBDBD;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 10px;
    padding: 3px 0 15px 0;
  }
  @media (max-width: 602px) {
    padding: 0 0 15px 0;
  }
`;