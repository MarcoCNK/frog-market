import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 
    let name = 'hola'

    const [isLoged, setIsLoged] = useState(Boolean(sessionStorage.getItem('token')))

    useEffect(() => {
        Boolean(sessionStorage.getItem('token')) && setIsLoged(true)
    }, [])

    const navigate = useNavigate()
    const login = (authToken) => { 
        sessionStorage.setItem('token', authToken)
        setIsLoged(true)
        navigate('/login')

    }

    const logout = () => { 
        sessionStorage.removeItem('token')
        setIsLoged(false)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={
                {
                    isLoged,
                    login
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}