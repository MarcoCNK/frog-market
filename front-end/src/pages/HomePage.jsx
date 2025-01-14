import React, { useContext, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import getAuthHeaders from '../utils/authHeeders.js'
import useProductDelete from '../Hooks/useProductDelete.jsx'
import NavBar from '../Components/Navbar.jsx'
import fogPicture from '/public/bogCartoon.webp'

const HomePage = () => {
	const { products, loader, productErrorState } = useProducts()
	const { productErrorStateDelete } = useProductDelete()

	console.log("Products: ", products)
	return (
		<>
			<NavBar></NavBar>
			<div className="relative w-full h-[500px]">
				<img
					src={fogPicture}
					alt="Foggy market"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
					<h1 className="text-4xl font-bold">Welcome to Froggy Market</h1>
					<p className="text-lg mt-2">We have all kinds of bogs, frogs and bugs</p>
				</div>
			</div>

			<Link to="/home/create-product">Create a product</Link>
			{loader
				? <p >Loading...</p>
				: <ProductsList products={products} />

			}
		</>

	)
}

const ProductsList = (  { products }) => { 
	<div className='flex items-center px-4 py-3 text-white'>
					{products.map(product => (
						console.log("Product: ", product.seller_id),
						<div key={product._id}>
							<p className='text-3xl font-bold underline' >{product.title}</p>
							<span>{product.price}</span>
							<Link to={`/home/product/${product.seller_id}`}>See detail</Link>
							{console.log("Seller product ID", product.seller_id)}
							<button onClick={() => useProductDelete(product.seller_id)} >Click here to delete</button>
							{/* <span>{productErrorStateDelete}</span> */}
						</div>
					))}
				</div>
 }

export default HomePage