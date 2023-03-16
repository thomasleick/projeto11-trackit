import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const HABIT_URL = "/habits";

const CreateHabit = (props) => {
  const { setShowCreateHabit, getHabits, setIsLoading } = props;
  const habitRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [habitName, setHabitName] = useState('');
  const [weekDays, setWeekDays] = useState(Array(7).fill(false))
  const { auth } = useAuth()
  const [fetchError, setFetchError] = useState(null);

  const handleCheckBox = id => {
    const newWeekDays = [...weekDays]
    newWeekDays[id] = !newWeekDays[id]
    setWeekDays(newWeekDays)
  }
  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      await getHabits();
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = e => {
    e.preventDefault()
    setShowCreateHabit(false)
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
  };

    const days = [];
    weekDays.forEach((day, index) => {
      if (day)
        days.push(index)
    })

    try {
        const response = await axios.post(HABIT_URL,
            { "name": habitName, "days": days }, config);
        setIsLoading(false);
        setShowCreateHabit(false)
        fetchHabits()
    } catch (err) {
        setIsLoading(false);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
            console.log(err)
        }
        errRef.current.focus();
    }
}

  
  const checkboxes = ["D", "S", "T", "Q", "Q", "S", "S"]

  return (
    <CreateHabitContainer data-test="habit-create-container">
      <form onSubmit={e => handleSubmit(e)}>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <input 
          type="text" 
          placeholder="nome do hábito" 
          id="habit" 
          ref={habitRef}
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          autoComplete="off" 
          required
          data-test="habit-name-input"
        />
        
        {checkboxes.map((cb, id) => 
          <Span key={`checkbox${id}`} data-test="habit-day">
            <CheckboxInput 
              type="checkbox" 
              id={`checkbox${id}`} 
              onClick={() => handleCheckBox(id)} letter={cb} 
            /> 
            {!weekDays[id] && <label htmlFor={`checkbox${id}`}>{cb}</label>}
          </Span>
        )}
        <Buttons>
          <Cancel onClick={handleCancel} data-test="habit-create-cancel-btn">Cancelar</Cancel>
          <Save data-test="habit-create-save-btn">Salvar</Save>
        </Buttons>
        
      </form>
    </CreateHabitContainer>
  );
};

const CreateHabitContainer = styled.div`
  position: relative;
  margin: 0 17px;
  background: #ffffff;
  width: 340px;
  height: 180px;
  
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
  border: 1px solid #CFCFCF;
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
    background-color: #CFCFCF;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Cancel = styled.button`
  width: 84px;
  height: 35px;
  background: #FFFFFF;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  text-align: center;
  color: #52B6FF;
  position: absolute;
  bottom: 0;
  right: 125px;

`
const Save = styled.button`
  width: 84px;
  height: 35px;
  background: #52B6FF;
  border-radius: 4.63636px;
  position: absolute;
  bottom: 0;
  right: 18px;
`
export default CreateHabit;