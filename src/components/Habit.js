import React from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import deleteIcon from '../images/delete.svg'

const HABIT_URL = "/habits";
const TODAY_URL = "/habits/today"

const Habit = (props) => {
  const { habit, fetchHabits, setPercentage } = props;
  const { auth } = useAuth()
 
  const checkboxes = ["D", "S", "T", "Q", "Q", "S", "S"]
  const config = {
    headers: { Authorization: `Bearer ${auth.accessToken}` }
};

  const getHabitsAndUpdate = async () => {
    try {
        const response = await axios.get(TODAY_URL, config);

        let done = 0;
        let total = 0;
        response.data.length && 
            response.data?.forEach(habit => {
                total++
                habit.done && done++
        })

        const newPercent = done/total*100
        setPercentage(newPercent)
    } catch (err) {
        console.error(err);
    }
};

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Você realmente gostaria de excluir este hábito?"))
      return false

    try {
        await axios.delete(`${HABIT_URL}/${id}`, config);
        fetchHabits();
        getHabitsAndUpdate();
    } catch (err) {
        if (!err?.response) {
          console.log('No Server Response');
        } else {
            console.log(err)
        }
        console.log(err)
    }
}

  return (
    <FlexContainer>
        <HabitContainer data-test="habit-container">
            <p data-test="habit-name">{habit.name}</p>
            
            {checkboxes.map((cb, id) => 
            <Span key={`checkbox${habit.id}${id}`} data-test="habit-day">
                <CheckboxInput 
                    type="checkbox" 
                    id={`checkbox${habit.id}${id}`} 
                    letter={cb}
                    checked={habit.days.includes(id)}
                    readOnly
                /> 
                {!habit.days.includes(id) && <label htmlFor={`checkbox${habit.id}${id}`}>{cb}</label>}
            </Span>
            )}
            <img 
              src={deleteIcon} 
              alt="Apagar" 
              onClick={(e) => handleDelete(e, habit.id)}
              data-test="habit-delete-btn"
            />
        </HabitContainer>
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;

`
const HabitContainer = styled.div`
    position: relative;
    margin: 5px 17px;
    height: 91px;
    background: #ffffff;
    width: 300px;
    padding: 0 20px;

    p {
        font-family: 'Lexend Deca';
        padding: 12px 15px 4px 0px;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    img {
        position: absolute;
        top: 10px;
        right: 10px;
    }

`;

const Span = styled.span`
  position: relative;
  label {
    position: absolute;
    font-family: 'Lexend Deca';
    top: -15px;
    left: 7.5px;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 28px;
    text-align: center;
    color: #DBDBDB;
  }
`

const CheckboxInput = styled.input`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #FFFFFF;
  border: 1px solid #CFCFCF;
  border-radius: 5px;
  position: relative;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
  margin: 0;
  margin-right: 4px;

  &:checked:before {
    content: "${props => props.letter}";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 28px;
    text-align: center;
    color: #FFFFFF;
  }

  &:checked {
    background-color: #CFCFCF;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export default Habit;