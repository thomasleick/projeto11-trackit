import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Habits from '../../components/Habits';
import styled from 'styled-components';
import plus from '../../images/plus.svg';
import CreateHabit from '../../components/CreateHabit';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
const HABIT_URL = '/habits'

const HabitsPage = (props) => {
    const { percentage } = props
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const [showCreateHabit, setShowCreateHabit] = useState(false);
    let isMounted = true;
    const controller = new AbortController();
    const config = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };
  
    const getHabits = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(HABIT_URL, config, {
          signal: controller.signal,
        });
        setHabits(response.data);
        setFetchError(null);
      } catch (err) {
        console.error(err);
        setFetchError(err.message);
        setHabits([]);
        navigate('/', { state: { from: location }, replace: true });
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getHabits();
      return () => {
        isMounted = false;
        controller.abort();
      };
    }, []);
  
    return (
      <>
        <Header signedIn={true} />
        <Main>
          <MyHabits>
            <h1>Meus Hábitos</h1>
            <img
              src={plus}
              alt="Adicionar"
              onClick={() => setShowCreateHabit(!showCreateHabit)}
              data-test="habit-create-btn"
            />
          </MyHabits>
          {showCreateHabit && (
            <CreateContainer>
              <CreateHabit setShowCreateHabit={setShowCreateHabit} getHabits={getHabits} setIsLoading={setIsLoading} />
            </CreateContainer>
          )}
          <Habits habits={habits} getHabits={getHabits} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </Main>
        <Footer percentage={percentage} />
      </>
    );
  };


const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
    overflow: scroll;
`
const CreateContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-around;`

const MyHabits = styled.div`
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
export default HabitsPage;