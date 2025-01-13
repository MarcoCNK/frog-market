import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContenxt'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isLoged } = useContext(AuthContext)

  return (
    isLoged
    ? <Outlet />     // Is like a middleware
    : <Navigate to={"/login"} />
  )
}

export default ProtectedRoute