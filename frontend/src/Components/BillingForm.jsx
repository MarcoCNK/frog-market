import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
import Form from './Form';

const BillingForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('01');
  const [expiryYear, setExpiryYear] = useState('27');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('Liniers');
  const [address2, setAddress2] = useState('854');
  const [city, setCity] = useState('Buenos Aires');
  const [state, setState] = useState('Buenos Aires');
  const [postalCode, setPostalCode] = useState('B1752');

  const actionLogin = async (formState) => {
    // send the form data to the backend
    try {
      // Send the form data to the backend
      const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState)
      });

      // Handle the response
      const data = await responseHTTP.json();
      const messageFromData = data.response.message;
      console.log(data)
      // IsOk
      console.log("State from the response: ", data.response.ok)
      isOk = data.response.ok

      console.log("Access token: ", data.response.payload.detail)

      setMessage(messageFromData)

      if (messageFromData == "Logged successfully!") {
        console.log("logged successfully")
        console.log("Access token: ", data.response.payload.detail)
        setTimeout(() => {
          login(data.response.payload.detail)
        }, 2000);
        console.log("Is okey from the action", isOk)
        return { messageFromData, isOk }

      }
      return { messageFromData, isOk }

    } catch (error) {
      console.log(error)
      setMessage("An error occurred. Please try again later.");
      return { messageFromData, isOk }

    }
  }

  const initialForm = ({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    country: '',
    address: '',
  });


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
        text: "Card number *",
        className: "block text-green-500 font-medium mb-2 text-2xl",
      },
      {
        text: "Expiration month *",
        className: "block text-green-500 font-medium mb-2 text-2xl",
        htmlFor: "expiryMonth"
      },
      {
        text: "Expiration year *",
        className: "block text-green-500 font-medium mb-2 text-2xl",
        htmlFor: "expiryYear"
      },
      {
        text: "CVV",
        className: "block text-green-500 font-medium mb-2 text-2xl",
        htmlFor: "cvv"
      },
      {
        htmlFor: "country",
        className: "block text-green-500 font-medium mb-2 text-2xl",
        text: "Country *"
      },
      {
        className: "block text-green-500 font-medium mb-2 text-2xl",
        text: "Address *"
      }
      ],

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
          type: "text",
          name: "cardNumber",
          id: "cardNumber",
          placeholder: "Credit card number",
          className: "border bg-black border-gray-300 text-green-500   rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          // value: formState.email
        },
        {
          field_component: 'select',
          type: "text",
          name: "expiryMonth",
          id: "expiryMonth",
          placeholder: "Exp Month",
          className: "border bg-black border-gray-300 rounded-md px-3 text-green-500  py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          // value: formState.password,
          // onChange: handlechange
        },
        {
          field_component: 'select',
          type: "text",
          name: "expiryYear",
          id: "expiryYear",
          placeholder: "Exp year",
          className: "border bg-black border-gray-300 rounded-md px-3 text-green-500  py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          // value: formState.password,
          // onChange: handlechange
        },
        {
        field_component: 'input',
        type: "number",
        name: "cvv",
        id: "cvv",
        placeholder: "666",
        className: "border bg-black border-gray-300 rounded-md px-3 text-green-500  py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        // value: formState.password,
        // onChange: handlechange
      },
      {
        field_component: 'slect',
        type: "text",
        name: "country",
        id: "country",
        placeholder: "Kiribati",
        className: "border bg-black border-gray-300 text-green-500  rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500",
        country: [
          "Antigua y Barbuda",
          "Burkina Faso",
          "England",
          "Tuvalu",
          "Kiribati"
        ]
        // value: formState.password,
        // onChange: handlechange
      },
      {
        field_component: 'input',
        type: "text",
        name: "address",
        id: "address",
        placeholder: "742 Evergreen Terrace",
        className: "border bg-black border-gray-300 text-green-500  rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        // value: formState.password,
        // onChange: handlechange
      }
      ]
    }
  ]

  return (
    <div className='w-full'>
      <div className="flex flex-col items-center justify-center bg-transparent">
        <p className="block text-white-500 font-medium mb-2 text-4xl">Acepted credit cards</p>
        <div className="flex space-x-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png" alt="Amex" className="h-6" />
        </div>
      </div>
      <Form
        form_fields={form_fields}
        action={actionLogin}
        initial_state_form={initialForm}
        page_title="Data for billing"
		    isBillingFrom="ok"
      >
      </Form>
  </div>

  )
}

export default BillingForm;