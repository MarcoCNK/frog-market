import React from 'react'
import { useParams } from 'react-router-dom'
import useProductDetail from '../Hooks/useProductDetail'
import { Layout } from '../Components'
import NavBar from '../Components/Navbar'

const ProductDetailScreen = () => {

    const { product_id } = useParams()
    console.log(product_id)
    const {
        product_detail_state,
        product_detail_loading_state,
        product_detail_error_state
    } = useProductDetail(product_id)

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
                <button className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
        
        </>
      );
      
      
}

export default ProductDetailScreen