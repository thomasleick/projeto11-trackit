import React from 'react';
import Header from '../../components/Header';
import SignIn from '../../components/SignIn';

const HomePage = () => {
    return (
        <>
            <Header signedIn={false}/>
            <SignIn />
        </>
    );
};

export default HomePage;