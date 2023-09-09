import { styled } from "styled-components";

export const Container = styled.div`
    ul {
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding: 10px;
        li {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 0px 20px 20px 20px;
            border-bottom: 1px solid #ABABAB;
        }
    }
    .comment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
    }
    .name {
        font-size: var(--font-size-16);
        font-weight: 600;
    }
    .time {
        color: #636F7E;
        position: absolute;
        right: 530px;
    }
    .contents {
        font-size: var(--font-size-14);
        font-weight: 500;
    }
`

export const BtnContainer = styled.div`
`
