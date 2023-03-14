import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import hoje from '../images/hoje.svg'

const Footer = () => {
    return (
        <FooterContainer>
            <Link style={linkStyle}><p>Hábitos</p></Link>
            <img src={hoje} alt="hoje" />
            <Link style={linkStyle}><p>Histórico</p></Link>
            
        </FooterContainer>
        
    );
};

const FooterContainer = styled.footer`
    position: absolute;
    height: 70px;
    width: 100vw;
    left: 0;
    bottom: 0;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    p {
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        margin: 0 36px;
    }

    img {
        position: relative;
        width: 91px; 
        height: 91px;
        bottom: 20px;
    }
`
const linkStyle = {
    textDecoration: "none"
}

export default Footer;