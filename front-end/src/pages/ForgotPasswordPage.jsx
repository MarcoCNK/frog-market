import React from 'react'
import { Link } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import Form from '../Components/Form';

const ForgotPasswordPage = () => {

    const initial_state_form = {
        email: ''
    }


    const actionForgotPassword = async (formState) => {

        try {
            console.log("Sendind request")
            const responseHTTP = await fetch("http://localhost:3000/api/auth/forgot-password", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })
    
            console.log("Body sent: ", formState)
            console.log("The response: ", responseHTTP)

        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            console.error(error);
        }

    }

    const form_fields = [
        {
            label_text: "Enter your email to restore password",
            field_component: 'input',
            submit_text: "Send mail",

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
                },
            ]
        }
    ]

    return (
        <div>
            <h1>Forgot Password</h1>
            <p>When you restore the password you will receive an email</p>
            <Form 
                form_fields={form_fields} 
                action={actionForgotPassword} 
                initial_state_form={initial_state_form} 
                >
               
               <Link to="/login">Login</Link>
           </Form>
        </div>
    )
}

export default ForgotPasswordPage