import React, { useState } from 'react'
import useForm from '../Hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isOk, setIsOk] = useState(false);
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  
  const {formState, handleChange} = useForm({
    email: '',
    password: ''
  })
  
  const handleLogin = async (event) => {

    
    event.preventDefault()

    // send the form data to the backend
    try {
      // Send the form data to the backend
      const responseHTTP = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      // Handle the response
      const data = await responseHTTP.json();
      const messageFromData = data.response.message;
      console.log(messageFromData)
      // IsOk
      setIsOk(data.response.ok)

      setMessage(data.response.ok
        ? 'We have sent you an email to confirm your account.'
        : messageFromData)

      if (messageFromData == "Logged successfully!") {
        console.log("logged successfully")
        setTimeout(() => {
					navigate('/home');
				}, 2000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later."); 
    }

  }

  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={handleLogin}>
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
				<button type='submit'>Login</button>
				<p>Already have an account? <Link to="/register">Register</Link></p>
        <Link to="/forgot-password">I forget my password</Link>
			</form>
    </div>
  )
}
