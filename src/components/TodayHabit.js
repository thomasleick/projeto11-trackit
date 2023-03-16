import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import check1 from '../images/check1.svg';
import check2 from '../images/check2.svg';

const checks = [check1, check2]
const TodayHabit = ( props ) => {
    const { habit, getTodayHabits } = props
    const [isChecked, setIsChecked] = useState(habit.done)
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const { auth } = useAuth()
  
    const handleClick = async (e) => {
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        };
        setIsLoading(true);
        const STATS_URL = isChecked ? `/habits/${habit.id}/uncheck` : `/habits/${habit.id}/check`
        try {
            const response = await axios.post(STATS_URL, {}, config);
            setFetchError(null);
            //setIsChecked(!isChecked)
            fetchHabits();
        } catch (err) {
            console.error(err);
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHabits = async () => {
        setIsLoading(true);
        try {
            await getTodayHabits();
        } catch (err) {
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
        };

    return (
        <HabitContainer data-test="today-habit-container">
            <H1 data-test="today-habit-name">{habit.name}</H1>
            <P><span data-test="today-habit-sequence">Sequência atual: <B isGreen={isChecked}>{`${habit.currentSequence}`} {`${habit.currentSequence > 1 ? "dias" : "dia"}`}</B></span><br />
            <span data-test="today-habit-record">Seu record: <B isGreen={habit.currentSequence === habit.highestSequence}>{`${habit.highestSequence}`} {`${habit.highestSequence > 1 ? "dias" : "dia"}`}</B></span></P>
            <img 
                src={checks[isChecked ? 1 : 0]} 
                alt="Concluído" 
                onClick={isLoading ? undefined : e => handleClick(e)} 
                data-test="today-habit-check-btn"
            />
        </HabitContainer>
    );
};

const H1 = styled.h1`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
`
const P = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    margin-top: 10px;
`

const B = styled.b`
    color: ${props => props.isGreen ? "#8FC549" : "#666666"};
`

const HabitContainer = styled.div`
    position: relative;
    width: 310px;
    height: 64px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 10px 0;
    padding: 15px;

    img {
        position: absolute;
        top: calc(50% - 34.5px);
        right: 12px;
    };
`

export default TodayHabit;