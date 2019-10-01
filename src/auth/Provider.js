import React, {
    useReducer,
    useEffect,
    useState,
    createContext
} from 'react'

export const AUTH_TOKEN_KEY = 'auth-token'
const initialState = ''
const localState = localStorage.getItem(AUTH_TOKEN_KEY)
const AuthContext = createContext()

let reducer = (token, newToken) => {
    if (newToken === null) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        return initialState
    }
    return newToken || token
}

function AuthProvider(props) {
    const [token, setToken] = useReducer(reducer, localState || initialState)
    const [isLoggedIn, setIsLoggedIn] = useState(token && token !== '')
    const logout = () => {
        console.log('handling logout')
        setToken(null)
    }

    useEffect(() => {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        setIsLoggedIn(token && token !== '')
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

export { AuthContext, AuthProvider }
