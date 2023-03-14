import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import React from 'react';
import styled from 'styled-components';

import axios from '../api/axios';
const LOGIN_URL = '/auth/login';

const SignIn = () => {

    /*
        {
            "id": 8189,
            "name": "thomasleick",
            "email": "thomasaleick@gmail.com",
            "image": "https://static.wikia.nocookie.net/ptstarwars/images/6/6c/2511.jpg/revision/latest?cb=20121107230903",
            "password": "senhadeteste",
            "updatedAt": "2023-03-14T13:58:24.215Z",
            "createdAt": "2023-03-14T13:58:24.215Z"
        }
        */

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/habitos";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', true)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { "email": user, "password": pwd },
            );

            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.token;
            const img = response?.data?.image;
            const roles = [2001]
            setAuth({ user, pwd, img, accessToken, roles });
            resetUser()
            setPwd('');
            console.log({ user, pwd, img, accessToken, roles })
            console.log(from)
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
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
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...userAttribs}
                    required
                />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder='senha'
                />
                <button >Entrar</button>
                <Link to={"/cadastro"}><p>Não tem uma conta? Cadastre-se!</p></Link>
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
        padding-left 10px;

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

export default SignIn;