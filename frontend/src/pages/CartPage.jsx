import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa"
import Navbar from '../Components/Navbar'
import BillingForm from '../Components/BillingForm'
import ItemList from '../Components/ItemList'
import getAuthHeaders from '../utils/authHeeders'
import { CartContext } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const [basketId, setBasketId] = useState("")

    const initialForm = ({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        country: '',
        address: '',
    })

    // const handleChekingOut = () => {
    //     fetchCart()
    // }
    const navigate = useNavigate()
    const handleCheckout = async (formState) => {
        // send the form data to the backend
        try {
            // Send the form data to the backend
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout`, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify(formState)
            })
            await responseHTTP.json()
            const basketId = responseHTTP.headers.get("X-Basket-Id")
            setBasketId(basketId)
            
            if (responseHTTP.ok){
                navigate(`/new/checkout/order?cartId=${basketId}`)
            }
            } catch (err) {
                console.log(err)
            }
        }
        
        useEffect(() => {
        }, [handleCheckout])
    return (
        <>
            <Navbar />
            <div
                className="min-h-screen bg-black text-white flex flex-col justify-between gap-y-6 pt-16"
                style={{ backgroundImage: "url('/bogCartoon.webp')" }}
            >
                {/* Row with ItemList and BillingForm */}
                <div className="flex items-start gap-x-10 justify-center">
                    <ItemList />
                    <BillingForm initialForm={initialForm} handleCheckout={handleCheckout} />
                </div>
                <div className="flex justify-center pb-10">
                    {/* <button
                        className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300"
                        onClick={handleChekingOut}
                    >
                        Buy Now
                    </button> */}

                </div>
            </div>
        </>
    )

}

export default CartPage