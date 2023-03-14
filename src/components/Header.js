import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg'

const Header = () => {
    return (
        <HeaderContainer>
            <img src={logo} alt="TrackIt" />
            <h1>TrackIt</h1>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
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