import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TodayHabit from '../../components/TodayHabit';
import styled from 'styled-components';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Comment } from 'react-loader-spinner';

const TODAY_URL = "/habits/today"

const TodayPage = () => {

    const { auth } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const [todayHabits, setTodayHabits] = useState("")

    const date = new Date()

    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : 
          ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][dayOfWeek];
      }

    const weekday = getDayOfWeek(date)
    let isMounted = true;
    const controller = new AbortController();
    const config = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };
    const getTodayHabits = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(TODAY_URL, config, {
            signal: controller.signal,
          });
          setTodayHabits(response.data);
          setFetchError(null);
        } catch (err) {
          console.error(err);
          setFetchError(err.message);
          setTodayHabits([]);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {

        getTodayHabits();

        return () => {
          isMounted = false;
          controller.abort();
        };
      }, []);

    return (
        <>
            <Header signedIn={true} />
            <Main>
                <h1>{weekday}, {("0" + date.getDate()).slice(-2)}/{("0" + (date.getMonth() + 1)).slice(-2)}</h1>
                <p>{"Nenhum hábito concluído ainda"}</p>
                {isLoading && !fetchError && (
                    <StatusMsg>
                        <Comment
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="#52B6FF"
                        />
                    </StatusMsg>
      )}
                {!isLoading && !fetchError && ( todayHabits?.length ?
                    todayHabits.map((habit, id) => <TodayHabit key={id} habit={habit} getTodayHabits={getTodayHabits}/>) 
                :
                    <p>Teste</p> )
                }
            </Main>
            <Footer />
        </>
    );
};
const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 198px);
    padding: 29px 17px;

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5; 
    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
        margin-bottom: 23px;
    }
`
const StatusMsg = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  color: #666666;
  padding: 28px 17px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 700;
  }
`;
export default TodayPage;