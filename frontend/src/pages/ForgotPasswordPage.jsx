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
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
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
			linkDirection: [{
				redirect: "/login",
				text: "Login"
				
			}],
            label_text: [{
				text: "Please enter your email and password",
				className: "block rounded text-sm font-medium text-gray-300"
			  }],
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
				field_component: 'input',
                type: "email",
                name: "email",
                id: "email",
                placeholder: "What's your email?",
                className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                },
            ]
        }
    ]

    return (
            <Form 
                form_fields={form_fields} 
                action={actionForgotPassword} 
                initial_state_form={initial_state_form} 
				page_title="Forgot my pass"
				isBillingFrom=""
                >
               
           </Form>
    )
}

export default ForgotPasswordPage