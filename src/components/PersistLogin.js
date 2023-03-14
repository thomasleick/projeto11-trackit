import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import React from 'react';
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)
    const refresh = useRefreshToken()
    
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } 
            catch (err) {
                console.log(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
            :   isLoading
                    ?<p>{localStorage.getItem("loginData")}</p>
                    :<Outlet />
            }
        </>
    )
}

export default PersistLogin