import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from '../Components/Form';
import useForm from '../Hooks/useForm';


const RecoveryPasswordPage = () => {
    const [isOk, setIsOk] = useState(false);
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

    const {reset_token} = useParams();
    console.log(reset_token)

    const initial_state_form = {
        password: '',
    }

    const actionRecoveryPassword = async (formState) => {
        console.log("holas")
        try {

            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recovery-password/${reset_token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            
            const data = await responseHTTP.json();
            const messageFromData = data.response.message;
            console.log(messageFromData)
            // IsOk
            setIsOk(data.response.ok)
      
            setMessage(data.response.ok
              ? 'Password changed successfully'
              : messageFromData)
      
            if (messageFromData == "Password changed successfully") {
              console.log("Password changed successfully")
              setTimeout(() => {
                navigate('/login');
              }, 2000);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            console.error(error);
        }

    }

    const form_fields = [
        {
            label_text: "Restore password",
            submit_text: "Restore",
            field_component: 'input',
            field_container_props: {
                className: 'form__input'
            },
            field_data_props: [{
                type: "password",
                name: "password",
                id: "password",
                placeholder: "Choose your new password",
                // onChange: handlechange
            }]
        }
    ]
    

    return (
        <div>
            <h1>Recover password</h1>
            <p>Enter your new password</p>
            <Form 
                form_fields={form_fields} 
                action={actionRecoveryPassword} 
                initial_state_form={initial_state_form} 
                >
                    
                {/* <div>
                    <label>Restore password</label>
                    <input
                        type="text"
                        name='password'
                        id='password'
                        placeholder="Choose your new password"
                        value={formState.password}
                        onChange={handlechange}
                    />
                </div>
                {/* <p id="message" style={{ color: isOk ? 'green' : 'red' }}>
                    {message}
                </p> 
                <button type='submit'>Restore</button>
                <p>Already have an account? <Link to="/register">Register</Link></p> */}
                <p id="message" style={{ color: isOk ? 'green' : 'red' }}>
          {message}
        </p>
                <Link to="/login">Login</Link>
            </Form>
        </div>
    )
}

export default RecoveryPasswordPage