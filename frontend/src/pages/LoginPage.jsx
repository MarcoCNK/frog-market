import React, { useContext, useState } from 'react'
import useForm from '../Hooks/useForm';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Form from '../Components/Form';
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../Context/AuthContenxt';

export default function LoginPage() {
	const [message, setMessage] = useState('')

	const navigate = useNavigate()

	const initial_state_form = {
		email: '',
		password: ''
	}

	const { login } = useContext(AuthContext)

	let isOk = false
	const actionLogin = async (formState) => {
		// send the form data to the backend
		try {
			// Send the form data to the backend
			const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formState)
			});

			// Handle the response
			const data = await responseHTTP.json();
			const messageFromData = data.response.message;
			// IsOk
			isOk = data.response.ok


			setMessage(messageFromData)

			if (messageFromData == "Logged successfully!") {
				setTimeout(() => {
					login(data.response.payload.detail)
				}, 2000);
			return {messageFromData, isOk}

			}
			return {messageFromData, isOk}

		} catch (error) {
			setMessage("An error occurred. Please try again later.");
			return {messageFromData, isOk}

		}
	}


	const form_fields = [
		{
			linkDirection: [{
				redirect: "/register",
				text: "I don't have an account?"

			},
			{
				redirect: "/forgot-password",
				text: "Forgot your password?"
			}],
			label_text: [{
				text: "Please enter your email and password",
				htmlFor: "hole",
				className: "block rounded text-sm font-medium text-gray-300"
			  }],
			submit_text: "Login",
			input_classes: {
				className: "block",
				className: "text-sm",
				className: "font-medium",
				className: "text-gray-300"
			},
			field_container_props: {
				className: 'form'
			},
			field_input_props: {
				className: 'form__input'
			},
			field_data_props: [
				{
					field_component: 'input',
					type: "email",
					name: "email",
					id: "email",
					placeholder: "What's your email?",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.email
				},
				{
					field_component: 'input',
					type: "password",
					name: "password",
					id: "password",
					placeholder: "Enter your password",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					// value: formState.password,
					// onChange: handlechange
				}
			]
		}
	]
	return (
			<Form
				form_fields={form_fields}
				action={actionLogin}
				initial_state_form={initial_state_form}
				page_title="LoginPage"
				isBillingFrom={false}
			>
			</Form>


	)
}


// if (messageFromData == "Invalid credentials") {
// 	let retry_token = data.response.payload.retry
// 	console.log("THis is the token before ", retry_token)

// 	let tokenObject = jwtDecode(retry_token)	
// 	tokenObject.try++
// 	console.log("THe number is ", tokenObject)
// 	const responseRetryHTTP = await fetch(`http://localhost:3000/api/auth/password-retry`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({retry: tokenObject.try})
// 	})
// 	const data2 = await responseRetryHTTP.json();

// 	console.log("This is the body of the response ",data2.response.payload[0])
// }