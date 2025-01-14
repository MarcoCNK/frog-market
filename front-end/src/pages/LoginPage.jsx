import React, { useContext, useState } from 'react'
import useForm from '../Hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Components/Form';
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../Context/AuthContenxt';

export default function LoginPage() {
	const [isOk, setIsOk] = useState(false);
	const [message, setMessage] = useState('')
	const [retry, setRetry] = useState(0)

	const navigate = useNavigate()

	const initial_state_form = {
		email: '',
		password: ''
	}

	const {login } = useContext(AuthContext)

	const actionLogin = async (formState) => {
		console.log("hola")
		// send the form data to the backend
		try {
			formState.try = retry
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
			console.log(messageFromData)
			// IsOk
			setIsOk(data.response.ok)

			console.log("Access token: ", data.response.payload.detail)
			
			setRetry((prevRetry) => {
                console.log(`Retry count increased: ${prevRetry + 1}`);
                return prevRetry + 1;
            });
			// let tokenRetry = data.response.payload.retry
			// const tokenObject = jwtDecode(tokenRetry)
			// tokenObject.try
			// console.log("THe number is ", tokenObject.try)
			setMessage(messageFromData)

			if (messageFromData == "Logged successfully!") {
				console.log("logged successfully")
				console.log("Access token: ", data.response.payload.detail)
				setTimeout(() => {
					login(data.response.payload.detail)
				}, 2000);
			}
		} catch (error) {
			console.log(error)
			setMessage("An error occurred. Please try again later.");
		}

	}


	const form_fields = [
		{
			label_text: "Enter your email to restore password",
			field_component: 'input',
			submit_text: "Login",

			field_container_props: {
				className: 'form'
			},
			field_input_props: {
				className: 'form__input'
			},
			field_data_props: [
				{
					type: "email",
					name: "email",
					id: "email",
					placeholder: "What's your email?",
					// value: formState.email
				},
				{
					type: "password",
					name: "password",
					id: "password",
					placeholder: "Choose your new password",
					// value: formState.password,
					// onChange: handlechange
				}
			]
		}
	]

	return (
		<div>
			<h1>LoginPage</h1>
			<Form
				form_fields={form_fields}
				action={actionLogin}
				initial_state_form={initial_state_form}
			>

			</Form>
			<Link to="/register">Are you already registered?</Link>
			<br />
			<Link to="/forgot-password">Forgot your password?</Link>
			<p id="message" style={{ color: isOk ? 'green' : 'red' }}>
				{message}
			</p>
		</div>
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