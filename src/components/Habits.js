import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';
const HABIT_URL = '/habits'

const Habits = () => {
    const [ habits, setHabits ] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { auth } = useAuth()


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        };

        const getHabits = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(HABIT_URL, config, {signal: controller.signal})
                isMounted && setHabits(response.data) && setFetchError(null)
            } catch (err) {
                console.error(err)
                setFetchError(err.message)
                setHabits([])
                navigate('/', { state: { from: location }, replace: true })
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        getHabits()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    useEffect(() => {
        
    }, [])
    return (
        <>
        {isLoading && <StatusMsg><p>Carregando</p></StatusMsg>}
        {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
        {!isLoading && !fetchError && (habits?.length ? <> </> : <StatusMsg><p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p></StatusMsg>)}
        </>
    );
};

const StatusMsg = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    padding: 28px 17px;

    p {
        font-weight: 700
    }
`
export default Habits;