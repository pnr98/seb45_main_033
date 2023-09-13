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
