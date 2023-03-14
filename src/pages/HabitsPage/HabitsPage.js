import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Habits from '../../components/Habits';

const HabitsPage = () => {
    return (
        <>
            <Header signedIn={true} />
            <Habits />
            <Footer />
        </>
    );
};

export default HabitsPage;