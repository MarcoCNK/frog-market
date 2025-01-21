import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import {CartContext} from "../Context/CartContext";
import getAuthHeaders from "../utils/authHeeders";

const CheckoutPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [sessionData, setSessionData] = useState([])
    const [loader2, setLoader2] = useState(true)


    const queryParams = new URLSearchParams(location.search)
    const cartId = queryParams.get("cartId") 
    console.log(cartId)

    const effectoMandela = async () => { 
        try {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout-router/${cartId}`, {
                method: "GET",
                credentials: "include",
                headers: getAuthHeaders()
            })
            if (!responseHTTP.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await responseHTTP.json();
            setProducts(data.response.payload.productsDetail)
            setLoader(false)

            setSessionData(data.response.payload.session)
            setLoader2(false)

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        if (cartId) {
            effectoMandela()
        }
    }, [cartId])

    return (
        <>
        { loader ? <p>
            Loading
        </p> 
        :
        
            <div>
        <h2>Products in your cart:</h2>
        <ul>
            {products.map((product, index) => (
                <li key={index}>
                    <img src={product.image} />
                    <p>Product Name: {product.title}</p>
                    <p>Price: ${product.price}</p>
                </li>
            ))}
        </ul>
        </div>
            
        }
        { loader2 ? <p>
            Loading
        </p> 
        :
        
            <div>
        <h2>Products in your cart:</h2>
        <ul>
            {Object.entries(sessionData).map((product, index) => (
                <li key={index}>
                    <p>Product Name: {product[0]}</p>
                    <p>Price: ${product[1]}</p>
                </li>
            ))}
        </ul>
        </div>
            
        }
        </>
    )
}

export default CheckoutPage
