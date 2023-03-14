import React from 'react';
import styled from 'styled-components';
import plus from '../images/plus.svg';

const Habits = () => {
    return (
        <Main>
            <MyHabits>
                <h1>Meus Hábitos</h1>
                <img src={plus} alt="Adicionar" />
            </MyHabits>
        </Main>
    );
};

const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
`

const MyHabits = styled.div`
    background: pink;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 17px;

    h1 {
        
        
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`
export default Habits;