import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const CreateHabit = () => {
  const habitRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [weekDays, setWeekDays] = useState(Array(7).fill(false))

  const handleCheckBox = id => {
    const newWeekDays = [...weekDays]
    newWeekDays[id] = !newWeekDays[id]
    setWeekDays(newWeekDays)
  }
  
  const checkboxes = ["D", "S", "T", "Q", "Q", "S", "S"]

  return (
    <CreateHabitContainer>
      <form>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <input type="text" placeholder="nome do hábito" id="habit" ref={habitRef} autoComplete="off" required />
        
        {checkboxes.map((cb, id) => 
          <Span>
            <CheckboxInput type="checkbox" id={`checkbox${id}`} onClick={() => handleCheckBox(id)} letter={cb}/> 
            {!weekDays[id] && <label htmlFor={`checkbox${id}`}>{cb}</label>}
          </Span>
        )}
        
      </form>
    </CreateHabitContainer>
  );
};

const CreateHabitContainer = styled.div`
  margin: 0 17px;
  height: 180px;
  background: #ffffff;
  
  input[type="text"]{
    margin: 18px 18px 4.5px 18px;
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

export default CreateHabit;