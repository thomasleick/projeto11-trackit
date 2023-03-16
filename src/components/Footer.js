import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Footer = (props) => {
    const { percentage } = props
    const nav = useNavigate()
    return (
        <FooterContainer data-test="menu">
            <Link to="/habitos" style={linkStyle} data-test="habit-link"><p>Hábitos</p></Link>
            <ProgressContainer onClick={() => nav("/hoje")} data-test="today-link">
                <CircularProgressbar
                    value={percentage}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#FFFFFF",
                    pathColor: "#FFFFFF",
                    trailColor: "transparent",
                    })}
                />
            </ProgressContainer>
            <Link to="/historico" style={linkStyle} data-test="history-link"><p>Histórico</p></Link>
            
        </FooterContainer>
        
    );
};
const FooterContainer = styled.footer`
    position: fixed;
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
`
const linkStyle = {
    textDecoration: "none"
}
const ProgressContainer = styled.span`
    position: absolute;
    width: 91px; 
    height: 91px;
    bottom: 20px;
    left: calc(50% - 45.5px);
`

export default Footer;