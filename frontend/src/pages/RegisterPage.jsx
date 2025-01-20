import React, { useState } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../Components/Form'

export default function RegisterPage() {
	const [isOk, setIsOk] = useState(false)
	const [message, setMessage] = useState('')
	const initial_state_form = {
		name: '',
		email: '',
		password: ''
	}
	const navigate = useNavigate()
	// const { formState, handleChange } = useForm(initial_state_form)

	// VERIFICATION BACKEND
	const handleRegister = async (formState) => {

		try {
			// Send the form data to the backend
			const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formState)
			})


			// Handle the response
			const data = await responseHTTP.json()
			const messageFromData = data.response.message
			// IsOk
			setIsOk(data.response.ok)

			if (data.response.ok) {
				setMessage("We have sent you an email to confirm your account.")
				setTimeout(() => {
					navigate('/login');
				}, 2000);
				return { messageFromData, isOk }

			} else {
				setMessage(messageFromData)
				return { messageFromData, isOk }

			}
		} catch (error) {
			setMessage("An error occurred. Please try again later.")
			return { messageFromData, isOk }

		}

	}

	const form_fields = [
		{
			linkDirection: [{
				redirect: "/login",
				text: "Login"

			}],
			label_text: [{
				text: "Register your account",
				className: "block rounded text-sm font-medium text-gray-300"
			  }],
			field_component: 'input',
			submit_text: "Register",

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
					name: "name",
					id: "name",
					placeholder: "What's your name?",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
				},
				{
					field_component: 'input',
					type: "email",
					name: "email",
					id: "email",
					placeholder: "What's your email?",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
				},
				{
					field_component: 'input',
					
					type: "password",
					name: "password",
					id: "password",
					placeholder: "Choose your password",
					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
					//   value: formState.password,
					// onChange: handlechange
				}
			]
		}
	]

	return (

		<Form
			form_fields={form_fields}
			action={handleRegister}
			initial_state_form={initial_state_form}
			page_title="RegisterPage"
			isBillingFrom=""
		>

		</Form>

	)
}