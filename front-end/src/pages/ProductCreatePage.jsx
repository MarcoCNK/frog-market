import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from '../Components/Form';
import getAuthHeaders from '../utils/authHeeders';

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

	}

	const actionLogin = async (formState) => {
		console.log("hola")
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
			console.log("This is the data: ",data.response.message)
			// IsOk
			setIsOk(data.response.ok)
            
            if (messageFromData){
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
			label_text: "Enter your product details",
			field_component: 'input',
			submit_text: "Create product",

			field_container_props: {
				className: 'form'
			},
			field_input_props: {
				className: 'form__input'
			},
			field_data_props: [
				{
					type: "text",
					name: "title",
					id: "title",
					placeholder: "What's the product you want to create?",
					// value: formState.email
				},
				{
					type: "number",
					name: "price",
					id: "price",
					placeholder: "How much books it cost, buddy?",
					// value: formState.password,
					// onChange: handlechange
				},
                {
					type: "number",
					name: "stock",
					id: "stock",
					placeholder: "Qunatity of the product in stock",
					// value: formState.password,
					// onChange: handlechange
				},
                {
					type: "textarea",
					name: "description",
					id: "description",
					placeholder: "Describe your product",
					// value: formState.password,
					// onChange: handlechange
				}
                ,
                {
					type: "text",
					name: "seller_id",
					id: "seller_id",
					placeholder: "A unique identifier",
					// value: formState.password,
					// onChange: handlechange
				}
			]
		}
	]

	return (
		<div>

			<h1>Create Products</h1>
			<span> 
                <Link to="/home">Home</Link>
            </span>
            <Form
				form_fields={form_fields}
				action={actionLogin}
				initial_state_form={initial_state_form}
			>

			</Form>
			
			<p id="message" style={{ color: isOk ? 'green' : 'red' }}>
				{message}
			</p>
		</div>
	)
}

export default ProductCreatePage