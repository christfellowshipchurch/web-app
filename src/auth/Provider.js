import React, {
    useReducer,
    useEffect,
    useState,
    useContext,
    createContext
} from 'react'

export const AUTH_TOKEN_KEY = 'auth-token'
const initialState = ''
const localState = localStorage.getItem(AUTH_TOKEN_KEY)
const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)

let reducer = (token, newToken) => {
    if (newToken === null) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        return initialState
    }
    return newToken || token
}

const AuthProvider = (props) => {
    const [token, setToken] = useReducer(reducer, localState || initialState)
    const [isLoggedIn, setIsLoggedIn] = useState(!!token)
    const logout = () => {
        setToken(null)
    }

    useEffect(() => {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        setIsLoggedIn(!!token)
    }, [token])

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                isLoggedIn,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}
