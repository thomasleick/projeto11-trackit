import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import React from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useLocalStorage from '../hooks/useLocalStorage';
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
    const [loginData, setLoginData] = useLocalStorage('loginData', '')
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
            
            const accessToken = response?.data?.token;
            const img = response?.data?.image;
            const roles = [2001]
            setLoginData({ user, pwd, img, accessToken, roles })
            localStorage.setItem("loginData", JSON.stringify({ user, pwd, img, accessToken, roles }))
            setAuth({ user, pwd, img, accessToken, roles });
            resetUser()
            setPwd('');
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
                <PersistCheck>
                    <input 
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Mantenha conectado</label>
                </PersistCheck>
                <button >Entrar</button>
                <Link to={"/cadastro"}><p>Não tem uma conta? Cadastre-se!</p></Link>
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
const PersistCheck = styled.div`
    width: 303px;
    margin-left: calc(50% - 151.5px);
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    color: #126BA5;
    
    input {
        height: 20px;
        width: 20px;
        margin: 0 5px 2px 2px;
    }
    input:checked {
        border-color: red;
        background-color:red;
    }
    label {
        margin: 0;
    }
`

export default SignIn;