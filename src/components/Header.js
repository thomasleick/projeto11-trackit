import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg'
import useAuth from '../hooks/useAuth';

const Header = (props) => {
    const { signedIn } = props
    const { auth } = useAuth()

    return (
        !signedIn ?
        <HeaderContainerOut>
            <img src={logo} alt="TrackIt" />
            <h1>TrackIt</h1>
        </HeaderContainerOut>
        :
        <HeaderContainerIn data-test="header">
            <h1>TrackIt</h1>
            <img src={auth.img} alt="foto do perfil"></img>
        </HeaderContainerIn>
    );
};

const HeaderContainerIn = styled.header`
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {       
        margin-left: 18px; 
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img {
        width: 51px;
        height: 51px;
        margin-right: 18px;
        background: url(image.png);
        border-radius: 98.5px;
    }
`

const HeaderContainerOut = styled.header`
    height: 248px;
    font-family: 'Playball', cursive;

    img {
        margin-top: 68px; 
        margin-left: calc(50% - 78px);
        width: 156px;
        height: 93px;
    }

    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: #126BA5;
    }
`

export default Header;