import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 
    let name = 'hola'

    const token_string = sessionStorage.getItem('token')

    const [isLoged, setIsLoged] = useState(Boolean(token_string))
    
    useEffect(() => {
        Boolean(token_string) && setIsLoged(true)
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
    
    const [isAdmin, setIsAdmin] = useState(false)
    if (token_string){
        const userObject = jwtDecode(token_string)
        if (userObject.role === 'admin') {
            useEffect(() => {
                Boolean(token_string) && setIsAdmin(true)
            }, [])
            
        }

    }  
    return (
        <AuthContext.Provider value={
                {
                    isLoged,
                    login,
                    logout,
                    isAdmin
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}