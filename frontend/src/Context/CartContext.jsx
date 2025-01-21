import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getAuthHeaders from '../utils/authHeeders'
import useForm from '../Hooks/useForm'

export const CartContext = createContext()


export const CartProvider = ({ children }) => {
    const navigate = useNavigate()


    const initialForm = ({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        country: '',
        address: '',
    })



    const [basketId, setBasketId] = useState("")
    const { formState, handleChange } = useForm(initialForm)
    

    const fetchCart = async () => {
        try {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout`, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify(formState)
            })
            const basketId = responseHTTP.headers.get("X-Basket-Id")
            setBasketId(basketId)
            console.log("Basket ID:", basketId)
            
            if (responseHTTP.ok) {
                navigate(`/new/checkout/order?cartId=${basketId}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleChekingOut = () => {
        fetchCart()
    }
    useEffect(() => {
        console.log("Basket ID updated:", basketId)
    }, [basketId])

    


    return (
        <CartContext.Provider value={
            {
                initialForm,
                handleChekingOut,
                formState,
            }
            }>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext