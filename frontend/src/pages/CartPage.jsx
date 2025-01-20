import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Navbar from '../Components/Navbar'
import BillingForm from '../Components/BillingForm';
import ItemList from '../Components/ItemList';
import getAuthHeaders from '../utils/authHeeders';

const CartPage = () => {

  return (
    <>
        <Navbar />
        <div
            className="min-h-screen bg-black text-white flex flex-col justify-between gap-y-6 pt-16"
            style={{ backgroundImage: "url('/public/bogCartoon.webp')" }}
        >
            {/* Row with ItemList and BillingForm */}
            <div className="flex items-start gap-x-10 justify-center">
                <ItemList />
                <BillingForm />
            </div>            
            <div className="flex justify-center pb-10">
                <button className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300">
                    Buy Now
                </button>
                
            </div>
        </div>
    </>
);

}

export default CartPage