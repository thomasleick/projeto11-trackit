import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const TodayPage = () => {
    return (
        <>
            <Header signedIn={true} />
            <Main>
             
            </Main>
            <Footer />
        </>
    );
};
const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
`
export default TodayPage;