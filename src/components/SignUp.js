import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUp = () => {
    return (
        <Main>
            <form>
                <input 
                    type="text"
                    placeholder=' email'
                />
                <input 
                    type="text"
                    placeholder=' senha'
                />
                <input 
                    type="text"
                    placeholder=' nome'
                />
                <input 
                    type="text"
                    placeholder=' foto'
                />
                <button >Cadastrar</button>
                <Link to={"/"}><p>Já tem uma conta? Faça login!</p></Link>
            </form>
        </Main>
    );
};

const Main = styled.main`
    margin-top: 33px;

    input {
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        margin-left: calc(50% - 151.5px);
        margin-bottom: 6px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        ::placeholder {
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }

    button {
        width: 303px;
        height: 45px;
        margin-left: calc(50% - 151.5px);
        margin-bottom: 20px;
        background: #52B6FF;
        border-radius: 4.63636px;

        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
    }

    p {
        width: 232px;
        height: 17px;
        margin-left: calc(50% - 116px);
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`

export default SignUp;