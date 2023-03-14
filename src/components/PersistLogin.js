import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import React from 'react';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)
    
    useEffect(() => {
        let isMounted = true;

        !auth?.accessToken ? console.log("deslogado...") : setIsLoading(false)

        return () => isMounted = false
    }, [])


/*     useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]) */

    return (
        <>
            {!persist
                ? <Outlet />
            :   isLoading
                    ?<p>Loading...</p>
                    :<Outlet />
            }
        </>
    )
}

export default PersistLogin