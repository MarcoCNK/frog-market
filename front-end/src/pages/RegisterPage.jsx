import React, { useState } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
	const [isOk, setIsOk] = useState(false)
	const [message, setMessage] = useState('')

	const navigate = useNavigate()
	const { formState, handleChange } = useForm({
		name: '',
		email: '',
		password: ''
	})

	// VERIFICATION BACKEND
	const handleRegister = async (event) => {
		// collect the form data
		event.preventDefault()

		// send the form data to the backend
		try {
			// Send the form data to the backend
			const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
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
	console.log(formState)

	return (
		<div>
			<h1>RegisterPage</h1>
			<form onSubmit={handleRegister}>
				<div>
					<label>Username: </label>
					<input
						type="text"
						name='name'
						id='name'
						placeholder="What's your name?"
						value={formState.name}
						onChange={handleChange}

					/>
				</div>
				<div>
					<label>Email: </label>
					<input
						type="text"
						name='email'
						id='email'
						placeholder="What's your email?"
						value={formState.email}
						onChange={handleChange}

					/>
				</div>
				<div>
					<label>Password: </label>
					<input
						type="password"
						name='password'
						id='password'
						placeholder="What's your password?"
						onChange={handleChange}
						value={formState.password}

					/>
				</div>
				<p id="message" style={{ color: isOk ? 'green' : 'red' }}>
					{message}
				</p>
				<button type='submit'>Register</button>
				<p>Already have an account? <Link to="/login">Login</Link></p>
			</form>
		</div>
	)
}