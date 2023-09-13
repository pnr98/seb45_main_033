import { styled } from "styled-components";
import { ScrollContainer } from "../../components/HorizontalScroll/HorizontalScroll.styled"
import { Button } from "./Comment.styled";
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        gap: var(--font-size-32);
    }
`
export const RecipeWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 50rem;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 2rem 0rem 7rem 0rem;
    .discription-title {
        border-top: 2px solid #553904;
        padding-top: var(--font-size-16);
        padding-bottom: var(--font-size-24);
        font-size: var(--font-size-20);
        font-weight: 700;
        color: #313D4B;
    }
`


export const RecipeInfoContainer = styled.section`
    .image-wrap{
        img {
            width: 100%;
            height: auto;
            border-radius: 1.25rem;
            background-size: contain;
        }
    }
    .header {
        display: flex;
        margin: 1rem 0rem 0.5rem 0rem;
        word-wrap: break-word;
        font-size: var(--font-size-24);
        font-weight: 700;
        justify-content: space-between;
        align-items: center;
        .like-button{ 
        }
    }
    .tag{
        font-weight: 400;
    }

    .recipe-info {
        margin-top: var(--font-size-14);;
        display: inline-grid;
        grid-template-columns: auto auto auto;
        column-gap: var(--font-size-36);
        font-size: var(--font-size-14);
        .detail {
            display: inline-grid;
            grid-template-columns: auto auto;
            column-gap: var(--font-size-12);
            color: #414141;
            :first-child {
                font-weight: 600;
            }
        }
    }
`
export const RecipeDescription = styled.div`
    p {
        color: #636F7E;
        line-height: var(--font-size-20);
    }
`

export const IngredientsContainer = styled.div`

    .ingredients {
        width: 40%;
        display: grid;
        justify-content: space-between;
        font-weight: 500;
        li {
            padding: var(--font-size-14) 0px;
            > div {
                width: 100%;
                display: inline-grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--font-size-80);
            }
        }
        .name{
            text-align: left;
            color: #000000;
        }
        .quantity{
            text-align: right;
            color: #50555B;
        }
    }
`
export const RecipeStepWrap = styled.div`
    // line 으로 분리
    ul {
        display: flex;
        flex-direction: column;
        gap: 25px;
        li {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
    .step-number {
        padding-bottom: 0.9rem;
        font-size: 1.1rem;
        font-weight: 500;
        border-bottom: 1px solid #ABABAB;
    }
    .step-content {
        padding: 0px 3px;
    }
    
    // box로 분리
    /* ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        li {

            border: 1px solid #9D6B0A;
            border-radius: 10px;
            padding: 10px 20px;
            div {

            }
        }
    }
    .step-number {
        padding-bottom: 0.9rem;
        font-size: 1.1rem;
        font-weight: 500;
    } */
`


export const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    Button {

    }
`


export const RelatedRecipe = styled.div`
    display: flex;
    flex-direction: column;
    
    >:last-child {
        position: relative;
        left:-56px
    }
    .HorizontalScroll {
        
    }

`

export const CommentsContainer = styled.div`
`

export const ScrollContainerCentered  = styled(ScrollContainer)`
background-color: red;
`


