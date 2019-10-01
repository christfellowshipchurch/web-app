import React, { useState, useEffect } from 'react'

const LOGIN_KEY = 'login-status'
const AUTH_TOKEN_KEY = 'auth-token'

export const useLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(LOGIN_KEY) || false)

    useEffect(() => {
        localStorage.setItem(LOGIN_KEY, isLoggedIn)
    }, [isLoggedIn])

    const setLoginStatus = (status) => setIsLoggedIn(status)

    return { isLoggedIn, setLoginStatus }
}

export const useAuth = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY))
    const [isLoggedIn, setIsLoggedIn] = useState(authToken !== '')

    useEffect(() => {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken)
        setIsLoggedIn(authToken !== '')
    }, [authToken, setIsLoggedIn])

    return {
        isLoggedIn,
        setAuthToken,
        authToken
    }
}