import { styled } from "styled-components";

export const Container = styled.div`
    padding-top: 58.89px;
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
    .discription-title {
        border-top: 2px solid #888;
        padding-top: var(--font-size-24);
        padding-bottom: var(--font-size-14);
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
        }
    }
    .header {
        word-wrap: break-word;
        font-size: var(--font-size-24);
        font-weight: 700;
    }
    .recipe-info {
        margin-top: var(--font-size-20);;
        display: inline-grid;
        grid-template-columns: auto auto auto;
        column-gap: var(--font-size-36);
        font-size: var(--font-size-12);
        .detail {
            display: inline-grid;
            grid-template-columns: auto auto;
            column-gap: var(--font-size-12);
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
            color: #636F7E;
        }
        .quantity{
            text-align: right;
            color: #A5B0BD;
        }
    }
`
export const RecipeStepWrap = styled.div`
    > li {
    }
    .step-number {
        padding-bottom: 0.9rem;
        font-size: 1.1rem;
        font-weight: 500;
        border-bottom: 1px solid rgb(224, 224, 224);
    }
`

export const Button = styled.div`

`

export const RecipeLike = styled.div`
    display: flex;
`


export const RelatedRecipe = styled.div`
    display: flex;
    justify-content: center;
`
