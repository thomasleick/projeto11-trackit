import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
//import { Checkbox } from 'react-ionicons'

const TodayHabit = ( props ) => {
    const { habit, getTodayHabits } = props
    const [isChecked, setIsChecked] = useState(habit.done)
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const [fixValue, setFixValue] = useState(0)
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
            setIsChecked(!isChecked)
            //isChecked ? setFixValue(fixValue - 1) : setFixValue(fixValue + 1)
            fetchHabits();
        } catch (err) {
            console.error(err);
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     document.getElementById(`sequence${habit.id}`).innerHTML = `${habit.currentSequence + fixValue} ${habit.currentSequence + fixValue > 1 ? "dias" : "dia"}`
    //     document.getElementById(`record${habit.id}`).innerHTML = `
    //         ${habit.highestSequence === habit.currentSequence ? 
    //             habit.currentSequence + fixValue : habit.currentSequence} 
    //             ${(habit.highestSequence === habit.currentSequence ? habit.currentSequence + fixValue : habit.highestSequence ) > 1 ? "dias" : "dia"}`
    // }, [fixValue])

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
        <FlexContainer>
            <HabitContainer data-test="today-habit-container">
                <H1 data-test="today-habit-name">{habit.name}</H1>
                <P><span data-test="today-habit-sequence">Sequência atual: <B id={`sequence${habit.id}`} isGreen={isChecked}>{`${habit.currentSequence}`} {`${habit.currentSequence + fixValue > 1 ? "dias" : "dia"}`}</B></span><br />
                <span data-test="today-habit-record">Seu record: <B id={`record${habit.id}`} isGreen={habit.currentSequence === habit.highestSequence}>{`${habit.highestSequence}`} {`${habit.highestSequence > 1 ? "dias" : "dia"}`}</B></span></P>
                <CheckContainer                     
                    onClick={isLoading ? undefined : e => handleClick(e)} 
                    data-test="today-habit-check-btn"
                >
                <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="68" height="68" rx="4.5" fill={isChecked ? "#8FC549" : "#EBEBEB"} stroke="#E7E7E7"/>
                        <path d="M48.5686 20.9566C49.1694 20.3503 49.9857 20.0064 50.8392 20.0001C51.6928 19.9938 52.5141 20.3256 53.1237 20.9231C53.7333 21.5205 54.0816 22.335 54.0926 23.1885C54.1035 24.0419 53.7761 24.8651 53.182 25.4779L35.9915 46.9682C35.6962 47.2862 35.3398 47.5413 34.9437 47.7185C34.5476 47.8957 34.1198 47.9912 33.6859 47.9994C33.252 48.0076 32.821 47.9283 32.4184 47.7662C32.0159 47.6041 31.6502 47.3625 31.3431 47.0559L19.9456 35.6628C19.3399 35.0569 18.9998 34.2351 19 33.3784C19.0002 32.5216 19.3407 31.7001 19.9467 31.0944C20.5527 30.4887 21.3744 30.1486 22.2311 30.1488C23.0879 30.149 23.9094 30.4895 24.5151 31.0955L33.5292 40.1117L48.4831 21.0575C48.5103 21.0228 48.5396 20.9899 48.5708 20.9588L48.5686 20.9566Z" fill="white"/>
                    </svg>

                </CheckContainer>
            </HabitContainer>
        </FlexContainer>
    );
};

const FlexContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;

`

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
`

const CheckContainer = styled.span`
    position: absolute;
    top: calc(50% - 34.5px);
    right: 12px;
`

export default TodayHabit;