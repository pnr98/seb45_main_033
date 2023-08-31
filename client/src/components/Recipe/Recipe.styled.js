import { styled } from "styled-components";

export const ScrollingContainer = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 16px;
  text-align: left;
  img {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 3px;
  }
  div {
    padding: 0 3px 3px;
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

export const TagBox = styled.span`
  display: inline-block;
  background-color: #e2990b;
  border-radius: 15px;
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
`;
