import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import { ThreeDots } from 'react-loader-spinner';

const SIGNUP_URL = "auth/sign-up"
const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const errRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(SIGNUP_URL,
                { "email": email, "name": name, "image": url, "password": pwd },
            );
            
            setIsLoading(false);
            navigate("/");
        } catch (err) {
            setIsLoading(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email already in use');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Register Failed');
                console.log(err)
            }
            errRef.current.focus();
        }
    }

    return (
        <Main>
            <form onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <input 
                    type="text"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$"
                    title="Precisa ser um email valido. Exemplo (nome@dominio.com)"
                    disabled={isLoading}
                    required
                />
                <input 
                    type="password"
                    placeholder='senha'
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    disabled={isLoading}
                    required
                />
                <input 
                    type="text"
                    placeholder='nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                />
                <input 
                    type="text"
                    placeholder='foto'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    pattern="^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9]+(?:[\-\.][a-z0-9]+)*\.[a-z]{2,6}(?:\/.*)?$"
                    title="Precisa ser um link de uma imagem válido"
                    disabled={isLoading}
                    required
                />
                <button disabled={isLoading}>
                    {isLoading ? 
                        <Span><ThreeDots 
                            height="80" 
                            width="80" 
                            radius="9"
                            color="#FFFFFF" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /></Span>
                    : 
                        "Cadastrar"}
                </button>
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

    button {
        position: relative;
    }
`

const Span = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 303px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default SignUp;