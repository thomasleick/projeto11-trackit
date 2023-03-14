import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    font-family: 'Lexend Deca', sans-serif;

    input {
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        margin-left: calc(50% - 151.5px);
        margin-bottom: 6px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left 10px;

        ::placeholder {
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
        :focus {
            background: #f5fbff;
            outline: solid 2px #52B6FF;
        }
    }

    button {
        width: 303px;
        height: 45px;
        margin-left: calc(50% - 151.5px);
        margin-bottom: 20px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: 0;

        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
    }
`

export default GlobalStyle