import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const HistoryPage = (props) => {
    const { percentage } = props
    return (
        <>
            <Header signedIn={true} />
            <Main>
             
            </Main>
            <Footer percentage={percentage}/>
        </>
    );
};
const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
`
export default HistoryPage;