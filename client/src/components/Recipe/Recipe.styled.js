import { styled } from "styled-components";

export const Container = styled.span`
  display: inline-block;
  text-align: left;
  width: 100%;
  
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 3px;
  }
  div {
    padding: 0 3px 3px;
    font-size: 15px;
    margin-bottom: 4px;
  }
`;