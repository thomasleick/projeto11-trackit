import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import React from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThreeDots } from 'react-loader-spinner';

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
        {
            "id": 8204,
            "name": "thomasleick",
            "email": "thomasleickclash@gmail.com",
            "image": "https://static.wikia.nocookie.net/ptstarwars/images/6/6c/2511.jpg",
            "password": "senhadeteste",
            "updatedAt": "2023-03-14T20:02:49.976Z",
            "createdAt": "2023-03-14T20:02:49.976Z"
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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
            setIsLoading(false);
            navigate(from, { replace: true });
        } catch (err) {
            setIsLoading(false);
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
                    disabled={isLoading}
                />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder='senha'
                    disabled={isLoading}
                />
                <PersistCheck>
                    <StyledCheckbox 
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                        disabled={isLoading}
                    />
                    <label htmlFor="persist">Mantenha conectado</label>
                </PersistCheck>
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
                        "Entrar"}
                </button>
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

    button {
        position: relative;
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
    label {
        margin: 0;
    }
    
`

const StyledCheckbox = styled.input`
    height: 20px;
    width: 20px;
    margin: 0 5px 2px 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    position: relative;
    appearance: none;
    cursor: pointer;
    transition: all 0.3s;
  
    &:checked:before {
      content: "O";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-family: 'Lexend Deca';
      font-style: normal;
      font-weight: 400;
      font-size: 19.976px;
      line-height: 18.5px;
      text-align: center;
      color: #FFFFFF;
    }
  
    &:checked {
      background-color: #52B6FF;
    }
  
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    &:disabled {
        background: #f5fbff;
    }
`;

const Span = styled.span`
    position: absolute;
    width: 303px;
    height: 45px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default SignIn;