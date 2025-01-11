import React from 'react'
import { LoginPage, RegisterPage, HomePage, ForgotPasswordPage, RecoveryPasswordPage } from './pages'
import { Route, Routes } from 'react-router-dom'

export default function App() {

return (
    <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordPage />} />


            </Routes>
    )
}
