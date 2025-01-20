import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContenxt'

const Logout = () => {
    useContext(AuthContext).logout()
}

export default Logout
