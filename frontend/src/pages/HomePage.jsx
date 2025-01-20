import React, { useContext, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import getAuthHeaders from '../utils/authHeeders.js'
import useProductDelete from '../Hooks/useProductDelete.jsx'
import { CiTrash } from "react-icons/ci";
import NavBar from '../Components/Navbar.jsx'
import Layout from '../Components/Layout.jsx'
import { AuthContext } from '../Context/AuthContenxt.jsx'
import Footer from '../Components/Footer.jsx'

const HomePage = () => {
	const { products, loader, productErrorState } = useProducts("products")
	const { deleteProduct } = useProductDelete()

	return (
 		<div className='bg-black'>
			<NavBar ></NavBar>
			
			<Layout paragraph={"We have all kinds of bogs, frogs and bugs"} title={"We have all kinds of bogs, frogs and bugs"}></Layout>

			{/* <Link to="/home/create-product">Create a product</Link> */}
			{loader
				? <p >Loading...</p>
				: <ProductsList products={products} />
			}
		<Footer/>
		</div>
	)
}

export const ProductsList = ({ products }) => {

	const {isAdmin } = useContext(AuthContext)
	return (
		<div className="min-h-screen px-4 py-6 text-white">
			

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<div
						key={product._id}
						className="bg-gray-800 rounded-lg hover:shadow-lg transition-shadow flex flex-col justify-between"
					>
						<img
							src={product.image}
							alt={product.title}
							className="w-full h-48 object-cover rounded-t-lg"
						/>

						<div className="p-4 flex-grow flex flex-col items-center">
							<h2 className="text-xl font-bold mb-2 text-center">
								{product.title}
							</h2>
							<p className="text-lg mb-2">${product.price}</p>
							<p className="text-sm mb-4 text-gray-300">{product.description}</p>
						</div>

						<div className="flex items-center justify-between px-4 py-2 border-t border-gray-700">
							<div className="flex-grow flex justify-center">
								<Link
									to={`/home/product/${product.seller_id}`}
									className="text-blue-500 underline hover:text-blue-600 transition-colors"
								>
									See Details
								</Link>
							</div>
							{
								isAdmin &&
							<div className="flex space-x-4">
								{console.log("THE PRODUCT SELLER ID",product.seller_id)} 
								<button
									onClick={() => deleteProduct(product.seller_id, "products")}
									className="text-red-500 hover:text-red-600 transition-colors"
									title="Delete Product"
								>
									<CiTrash size={24} />
								</button>
								{/* Add more admin buttons/icons here */}
							</div>
							}
						</div>

					</div>
				))}
			</div>
		</div>
	);
}

export default HomePage