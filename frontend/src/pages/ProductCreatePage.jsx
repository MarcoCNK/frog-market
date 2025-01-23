import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from '../Components/Form';
import getAuthHeaders from '../utils/authHeeders';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';

const ProductCreatePage = () => {
	const [isOk, setIsOk] = useState(false);
	const [message, setMessage] = useState('')

	const initial_state_form = {
		title: '',
		price: 0,
		stock: 0,
		description: '',
		category: '',
		seller_id: '',
		image_base64: ''

	}
	const actionCreateProduct = async (formState) => {
		// send the form data to the backend
		try {
			// Send the form data to the backend
			const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify(formState)
			});


			// Handle the response
			const data = await responseHTTP.json();
			const messageFromData = data.message;
			console.log("This is the data: ", data.response.message)
			// IsOk
			setIsOk(data.response.ok)

			if (messageFromData) {
				setMessage(messageFromData)
				return
			}
			setMessage(data.response.message)

		} catch (error) {
			console.log(error)
			setMessage("An error occurred. Please try again later.");
		}

	}


	const form_fields = [
		{
			linkDirection: [{
				redirect: "/home",
				text: "Back to the store"

			}],
			submit_text: "Create Product",
			label_text: [{
				className: "block text-green-500 font-medium mb-2 text-2xl",
       			 text: "Product title"
			},
			{
				className: "block text-green-500 font-medium mb-2 text-2xl",
       			 text: "Product Price"
			},
			{
				className: "block text-green-500 font-medium mb-2 text-2xl",
        		text: "Product Stock"
			},
			{
				className: "block text-green-500 font-medium mb-2 text-2xl",
        		text: "Description"
			},
			{
				className: "block text-green-500 font-medium mb-2 text-2xl",
        		text: "Unique identfier"
			},
			{
				className: "block text-green-500 font-medium mb-2 text-2xl",
        		text: "Select an image",
				htmflFor: "image",
			}],
			field_container_props: {
				className: 'form'
			},
			field_input_props: {
				className: 'form__input'
			},
			field_data_props: [
				{
					field_component: 'input',
					type: "text",
					name: "title",
					id: "title",
					placeholder: "What's the product you want to create?",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.email
				},
				{
					field_component: 'input',
					type: "number",
					name: "price",
					id: "price",
					placeholder: "How much books it cost, buddy?",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				},
				{
					field_component: 'input',
					type: "number",
					name: "stock",
					id: "stock",
					placeholder: "Qunatity of the product in stock",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				},
				{
					field_component: 'input',

					type: "textarea",
					name: "description",
					id: "description",
					placeholder: "Describe your product",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				}
				,
				{
					field_component: 'input',

					type: "text",
					name: "seller_id",
					id: "seller_id",
					placeholder: "A unique identifier",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				}
				,
				{
					field_component: 'input',

					type: "file",
					name: "image_base64",
					id: "image",
					placeholder: "Please select an image",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				}
			]
		}
	]

	return (
		<div className='bg-black flex flex-col items-center justify-center' style={{ backgroundImage: "url('/bogCartoon.webp')" }}>
			<Navbar/>
			<Form
				form_fields={form_fields}
				action={actionCreateProduct}
				initial_state_form={initial_state_form}
				isBillingFrom={true}
			>

			</Form>

			<p id="message" 
				className={`text-2xl ${isOk ? 'text-green-500' : 'text-red-500'}`}
			>
				{message}
			</p>
			<Footer/>
		</div>
	)
}

export default ProductCreatePage