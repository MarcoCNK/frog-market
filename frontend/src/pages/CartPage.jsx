import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Layout from '../Components/Layout';

const CartPage = () => {
    return (
        <>
        <NavBar></NavBar>
        {/* <div className="min-h-screen bg-black text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/public/bogCartoon.webp')" }}>
          {product_detail_loading_state ? (
            <p className="text-lg text-center">Loading...</p>
          ) : (
            <div >
              <h1 className="text-4xl font-bold mb-4 text-green-500">
                Your products:
              </h1>
                <hr/>
              <div>
                <img 
                  src={product_detail_state.image}
                  alt={product_detail_state.title}
                  />     
                  <p className="text-2xl font-semibold text-green-500">
                  ${product_detail_state.title}
                </p>           
                <p className="text-2xl font-semibold text-green-500">
                  ${product_detail_state.price}
                </p>
                <hr/>
              </div>
                <button className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300">
                  Buy Now
                </button>
            </div>
          )}
        </div> */}
        </>
    )
}

export default CartPage