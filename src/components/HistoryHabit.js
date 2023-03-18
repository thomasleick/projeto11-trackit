import React from 'react';
import styled from 'styled-components';
import check from '../images/checkmark-circle.svg'
import uncheck from '../images/ellipse.svg'

const HistoryHabit = (props) => {
    const { selectedDay, setShowHistoryHabit, setSelectedDay } = props

    const handleClick = () => {
        setSelectedDay(null)
        setShowHistoryHabit(false) 
    }

    return (
        <HabitContainer color={selectedDay.habits.filter(habit => habit.done).length === selectedDay.habits.length ? "#8CEE04" : "#EA5766" }>
            <h1>{selectedDay.day}</h1>
            <B1>Hábito</B1> <br />
            <B2>Status</B2> <br />
            <section>
                <ul>
                    {selectedDay.habits.map(habit => 
                        <Li1 key={habit.id}>{habit.name}</Li1>
                    )}
                </ul>
                <ul>
                    {selectedDay.habits.map(habit => 
                        <Li2 key={habit.id + `status`}><img src={habit.done ? check : uncheck} alt="Feito"/></Li2>
                    )}
                </ul>
            </section>
            <h2> 
                {selectedDay.habits.filter(habit => habit.done).length}/{selectedDay.habits.length} hábitos feitos
            </h2>
            <button onClick={handleClick}>x</button>
        </HabitContainer>
    );
};

const HabitContainer = styled.div`
    background-color: #52B6FF;
    width: 240px;
    height: 240px;
    border: solid 2x blue;
    border-radius: 7%; 
    position: fixed;
    top: calc(50% - 120px);
    left: calc(50% - 120px);
    opacity: 0.97;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;


    button {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 16px;
        line-height: 14px;
        background-color: red;
        border-radius: 40%;

        @media(max-width: 374px) {
            margin: 0;
        }
    }

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        position: absolute;
        top: 20px;
        color: white;
    }
    h2 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        position: absolute;
        bottom: 20px;
        color: ${props => props.color};
    }

    ul {
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 20px;
        height: 20px;
    }

    section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 200px;
        height: 100px;
        position: absolute;
        top: 85px;
        overflow: scroll;
    }
`

const B1 = styled.b`
    font-weight: 700;
    font-size: 19.976px;
    color: white;
    position: absolute;
    top: 60px;
    left: 53px;
`

const B2 = styled.b`
    font-weight: 700;
    font-size: 19.976px;
    color: white;
    position: absolute;
    top: 60px;
    right: 18px;
`

const Li1 = styled.li`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    width: 120px;
    
`
const Li2 = styled.li`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    width: 50px;
`

export default HistoryHabit;