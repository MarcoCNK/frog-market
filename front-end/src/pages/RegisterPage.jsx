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
			} else {
				setMessage(messageFromData)
			}
		} catch (error) {
			setMessage("An error occurred. Please try again later.")
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
				type: "text",
				name: "name",
				id: "name",
				placeholder: "What's your name?",
			  },
			{
			  type: "email",
			  name: "email",
			  id: "email",
			  placeholder: "What's your email?",
			},
			{
			  type: "password",
			  name: "password",
			  id: "password",
			  placeholder: "Choose your password",
			//   value: formState.password,
			  // onChange: handlechange
			}
		  ]
		}
	  ]

	return (
		<div>
			<h1>Register</h1>
			<Form 
                form_fields={form_fields} 
                action={handleRegister} 
                initial_state_form={initial_state_form} 
                >
               
           </Form>
				<p>Already have an account? <Link to="/login">Login</Link></p>
				<p id="message" style={{ color: isOk ? 'green' : 'red' }}>
					{message}
				</p>
		</div>
	)
}