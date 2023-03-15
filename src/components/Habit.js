import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const HABIT_URL = "/habits";

const Habit = (props) => {
  const { habit } = props;
  const [isLoading, setIsLoading] = useState(false)
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const { auth } = useAuth()
 
  const checkboxes = ["D", "S", "T", "Q", "Q", "S", "S"]

  return (
    <HabitContainer>
        <p>{habit.name}</p>
        
        {checkboxes.map((cb, id) => 
          <Span key={`checkbox${habit.id}${id}`}>
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

    </HabitContainer>
  );
};

const HabitContainer = styled.div`
    position: relative;
    margin: 5px 17px;
    height: 91px;
    background: #ffffff;
    width: 340px;

    p {
        font-family: 'Lexend Deca';
        padding: 12px 15px 4px 20px;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

`;

const Span = styled.span`
  position: relative;
  label {
    position: absolute;
    font-family: 'Lexend Deca';
    top: -21px;
    left: 27.5px;
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
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  position: relative;
  margin-right: -15px;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s;

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
    background-color: #ccc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export default Habit;