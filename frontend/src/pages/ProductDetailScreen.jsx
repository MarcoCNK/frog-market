import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductDetail from '../Hooks/useProductDetail'
import NavBar from '../Components/Navbar'
import getAuthHeaders from '../utils/authHeeders'

const ProductDetailScreen = () => {
    const [message, setMessage] = useState('')
    const [isOk, setIsOk ] = useState(false)
  
    const { product_id } = useParams()
    const {
        product_detail_state,
        product_detail_loading_state,
        product_detail_error_state
    } = useProductDetail(product_id)

      const addToCart = async () => {
        const resposHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
          method: 'POST',
          headers: getAuthHeaders(),
          credentials: 'include',
          body: JSON.stringify({"seller_id": product_detail_state.seller_id })
        })
        const data = await resposHTTP.json();
        setMessage(data.response.message)
        setIsOk(data.response.ok)
        setMessage(data.response.message)
      }

      useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")
            }, 1000);

            return () => clearTimeout(timer)
        }
    }, [message]);

    return (
        <>
        
        <NavBar></NavBar>
			
        <div className="min-h-screen bg-black text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/public/bogCartoon.webp')" }}>
          {product_detail_loading_state ? (
            <p className="text-lg text-center">Loading...</p>
          ) : (
            <div className="max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg">
              {/* Title */}
              <h1 className="text-4xl font-bold mb-4 text-green-500">
                {product_detail_state.title}
              </h1>
      
              {/* Product Image */}
              <div className="w-full flex justify-center mb-6">
                <img
                  src={product_detail_state.image}
                  alt={product_detail_state.title}
                  className="rounded-lg shadow-md max-h-80 object-contain"
                />
              </div>
      
              {/* Product Description */}
              <p className="text-gray-300 text-lg mb-6">
                {product_detail_state.description}
              </p>
      
              {/* Price and Buy Button */}
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-green-500">
                  ${product_detail_state.price}
                </p>
                <button onClick={addToCart} className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300">
                  Add to cart
                </button>
              </div>
                <p
                    id="message"
                    className={`text-sm h-6 text-center ${isOk ?  'text-green-500' : 'text-red-500'
                        }`}
                >
                    {message || '\u00A0'}
                </p>
            </div>
          )}
        </div>
        
        </>
      );
      
      
}

export default ProductDetailScreen