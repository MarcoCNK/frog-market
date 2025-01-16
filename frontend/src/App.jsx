import React from 'react'
import { LoginPage, RegisterPage, HomePage, ForgotPasswordPage, RecoveryPasswordPage, ProductDetailScreen, ProductCreatePage, CartPage, DefaultPage, MyProfile } from './pages'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'

export default function App() {

return (
        <Routes>
            <Route element={<ProtectedRoute />} >
                <Route path="/home" element={<HomePage />} />
                <Route path='/home/product/:product_id' element={<ProductDetailScreen />} />
                <Route path="/home/create-product" element={<ProductCreatePage />} />
                <Route path='/supercart' element={<CartPage />} />
                <Route path="/profile" element={<MyProfile />} />
            </Route >

            <Route path="/*" element={<DefaultPage />} />
            <Route path="/login-please" element={<DefaultPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordPage />} />


        </Routes>
    )
}
