import React, { useContext, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import getAuthHeaders from '../utils/authHeeders.js'
import useProductDelete from '../Hooks/useProductDelete.jsx'



const HomePage = () => {
	const { products, loader, productErrorState } = useProducts()
	const { productErrorStateDelete } = useProductDelete()

	console.log("Products: ", products)
	return (
		<>
			<h1>Bienvenido a Froggy market</h1>
			<Link to="/home/create-product">Create a product</Link>
			{loader
				? <p>Loading...</p>
				: <div>
					{products.map(product => (
						console.log("Product: ", product.seller_id),
						<div key={product._id}>
							<p >{product.title}</p>
							<span>{product.price}</span>
							<Link to={`/home/product/${product.seller_id}`}>See detail</Link>
							{console.log("Seller product ID",product.seller_id)}
							<button onClick={() => useProductDelete(product.seller_id)} >Click here to delete</button> 
							{/* <span>{productErrorStateDelete}</span> */}
						</div>
					))}
				</div>

			}
		</>

	)
}

export default HomePage