import React from 'react';
import Header from '../../components/Header';
import SignUp from '../../components/SignUp';

const SignUpPage = () => {
    return (
        <>
            <Header signedIn={false}/>
            <SignUp />
        </>
    );
};

export default SignUpPage;