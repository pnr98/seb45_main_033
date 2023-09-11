import { styled } from "styled-components";

export const Container = styled.div`
    ul {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;
        li {
            display: flex;
            flex-direction: column;
            padding: 20px;
            border-radius: 10px;
            background-color: #F7F3ED;
            /* border-bottom: 1px solid #ABABAB; */
            /* padding: 0px 0px 20px 0px; */
        }
    }
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        margin-bottom: 20px;
    }
    .name {
        font-size: var(--font-size-16);
        font-weight: 600;
        color: #553904;
    }
    .time {
        color: #636F7E;
        position: absolute;
        right: 490px;
    }
    .contents {
        font-size: var(--font-size-14);
        font-weight: 500;
    }
    textarea{
        border: 2px solid #AAA498;
        padding: 10px;
        resize: none;
        border-radius: 5px;
        outline: none;
    }
`
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
    gap: 10px;
`

export const EditContainer = styled.div`
    display: flex;
    align-self: flex-end;   
    .Btn-container {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
`

export const Button = styled.button`
    border-radius: 3px;
    color: white;
    padding: 6px 7px;
    align-self: flex-end;   
    background-color: ${(props) => (props.boxColor === "orange" ? "#E2990B" : "#D8D8D8")};
    width: ${(props) => (props.size === "small" ? "auto" : "7%")};
`


