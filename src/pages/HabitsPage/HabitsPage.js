import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Habits from '../../components/Habits';
import styled from 'styled-components';
import plus from '../../images/plus.svg';
import CreateHabit from '../../components/CreateHabit';

const HabitsPage = () => {
    const [showCreateHabit, setShowCreateHabit] = useState(false)

    return (
        <>
            <Header signedIn={true} />
            <Main>
                <MyHabits>
                    <h1>Meus Hábitos</h1>
                    <img src={plus} alt="Adicionar" onClick={() => setShowCreateHabit(!showCreateHabit)}/>
                </MyHabits>
                {showCreateHabit && <CreateContainer><CreateHabit setShowCreateHabit={setShowCreateHabit}/></CreateContainer>}
                <Habits />
            </Main>
            <Footer />
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