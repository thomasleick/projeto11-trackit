import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUp = () => {
    return (
        <Main>
            <form>
                <input 
                    type="text"
                    placeholder='email'
                />
                <input 
                    type="password"
                    placeholder='senha'
                />
                <input 
                    type="text"
                    placeholder='nome'
                />
                <input 
                    type="text"
                    placeholder='foto'
                />
                <button >Cadastrar</button>
                <Link to={"/"}><p>Já tem uma conta? Faça login!</p></Link>
            </form>
        </Main>
    );
};

const Main = styled.main`
    margin-top: 33px;

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