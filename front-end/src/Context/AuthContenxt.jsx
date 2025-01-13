import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 
    let name = 'hola'

    const [isLoged, setIsLoged] = useState(Boolean(sessionStorage.getItem('token')))

    useEffect(() => {
        Boolean(sessionStorage.getItem('token')) && setIsLoged(true)
    }, [])

    return (
        <AuthContext.Provider value={
                {
                    isLoged
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}