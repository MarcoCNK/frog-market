import React from 'react'
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {


    const handleForgotPassword = async (event) => {
        event.preventDefault()

        try {
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            console.error(error);
        }

    }

    return (
        <div>
            <h1>LoginPage</h1>
            <p>When you restore the password you will receive an email</p>
            <form onSubmit={handleForgotPassword}>
                <div>
                    <label>Restore password</label>
                    <input
                        type="text"
                        name='email'
                        id='email'
                        placeholder="What's your email?"

                    />
                </div>
                {/* <p id="message" style={{ color: isOk ? 'green' : 'red' }}>
                    {message}
                </p> */}
                <button type='submit'>Restore</button>
                <p>Already have an account? <Link to="/register">Register</Link></p>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default ForgotPasswordPage