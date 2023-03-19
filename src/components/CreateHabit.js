import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const HABIT_URL = "/habits";
const TODAY_URL = "/habits/today"

const CreateHabit = (props) => {
  const { setShowCreateHabit, getHabits, isLoading, setIsLoading, setTodayHabits, setPercentage } = props;
  const habitRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [habitName, setHabitName] = useState('');
  const [weekDays, setWeekDays] = useState(Array(7).fill(false))
  const { auth } = useAuth()
  const [fetchError, setFetchError] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${auth.accessToken}` }
  };

  const handleCheckBox = id => {
    const newWeekDays = [...weekDays]
    newWeekDays[id] = !newWeekDays[id]
    setWeekDays(newWeekDays)
  }
  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      await getHabits();
      await getTodayHabits();
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getTodayHabits = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(TODAY_URL, config);
      setTodayHabits(response.data);
      let done = 0;
      let total = 0;
      response.data.length && 
          response.data?.forEach(habit => {
              total++
              habit.done && done++
      })

      const newPercent = done/total*100
      setPercentage(newPercent)
      setFetchError(null);
    } catch (err) {
      console.error(err);
      setFetchError(err.message);
      setTodayHabits([]);
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

    if (!habitName?.length) {
      setIsLoading(false)
      alert("Por favor, insira um nome para este hábito.")
      return false
    }

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
        } else {
            setErrMsg('Attempt to create a new habit failed');
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
          data-test="habit-name-input"
          disabled={isLoading}
        />
        
        {checkboxes.map((cb, id) => 
          <Span key={`checkbox${id}`} data-test="habit-day" disabled={isLoading}>
            <CheckboxInput 
              type="checkbox" 
              id={`checkbox${id}`} 
              onClick={() => handleCheckBox(id)} letter={cb}
              disabled={isLoading}
            /> 
            {!weekDays[id] && <label htmlFor={`checkbox${id}`} disabled={isLoading}>{cb}</label>}
          </Span>
        )}
        <Buttons>
          <Cancel onClick={handleCancel} data-test="habit-create-cancel-btn" disabled={isLoading}>Cancelar</Cancel>
          <Save data-test="habit-create-save-btn" disabled={isLoading}>Salvar</Save>
        </Buttons>
        
      </form>
    </CreateHabitContainer>
  );
};

const FlexContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;

`
const CreateHabitContainer = styled.div`
    position: relative;
    margin: 5px 17px;
    height: 180px;
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