import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
import Form from './Form';

const BillingForm = ({initialForm, handleCheckout}) => {

    const [message, setMessage] = useState('')

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

      submit_text: "Checkout",
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
        action={handleCheckout}
        initial_state_form={initialForm}
        page_title="Data for billing"
		    isBillingFrom="ok"
      >
      </Form>
  </div>

  )
}

export default BillingForm;