import { styled } from "styled-components"

export const Container = styled.div`
  width: 120%;

`

export const Wrap = styled.div`
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
