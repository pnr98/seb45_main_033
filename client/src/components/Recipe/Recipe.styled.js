import { styled } from "styled-components";

export const Container = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 16px;
  text-align: left;
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


