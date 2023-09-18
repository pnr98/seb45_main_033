import { styled } from "styled-components"

export const ScrollContainer = styled.div`
  width: 114%;

`

export const ScrollWrap = styled.div`
  display: flex;
  .swiper {
    width: 100%;
    height: auto;
  }
  .swiper-slide {
  }
`

export const ArrowBtn = styled.button`
  img {
    width: 2.5rem;
    &:hover{
    }
  }
  .pre {
      transform: rotate(180deg);
      margin-right: 16px;
    }
  .next {
    margin-left: 16px;
  }
`

export const LodingImage = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    color: #999;
    font-size: 16px;
    font-weight: bold;
  }
`
