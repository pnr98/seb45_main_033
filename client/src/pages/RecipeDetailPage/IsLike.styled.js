import { styled } from "styled-components";

export const BtnContainer = styled.div`
    
    button{
        border-radius: 5px;
        border: 2px solid #9C9C9C;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:10px;
        padding: 8px;
        &:hover{
            background-color: #ECECEC;
        }
        img {
        width: 1.5rem;
        }
        div{
            font-size: var(--font-size-14);
        }
    }

`