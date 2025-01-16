import React, { useContext, useState } from 'react'
import useForm from '../Hooks/useForm';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContenxt';

let messageFromBackend = ""
let isOkStatus = false

const Form = ({ action, children, form_fields, initial_state_form, page_title, links }) => {
    const [message, setMessage] = useState('')
    const [isOk, setIsOk] = useState(false);
    const { formState, handleChange } = useForm(initial_state_form)
    const {isLoged } = useContext(AuthContext)   

    console.log("Is loged?: ", isLoged)
    const handleSumbit = async (e) => {
        e.preventDefault()
        messageFromBackend, isOkStatus = await action(formState)
        console.log("Message from backend ", isOkStatus.messageFromData)
        console.log("The okey status: ", isOkStatus.isOk)
        console.log("Is okey from the form ", isOkStatus.isOk)
        setMessage(isOkStatus.messageFromData)
        setIsOk(isOkStatus.isOk)
    }
    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen">
            <div className="flex items-start justify-start w-full py-12">
                <Link className="flex items-center max-w-screen-lg mx-auto px-4" to={isLoged ? '/home' : '/login'}>
                        <img
                            src="/public/frogLogo.png"
                            alt="Logo"
                            className="w-18 h-14 rounded-full mr-4"
                        />
                        <h2 className="text-3xl font-bold text-white">
                            Froggy Market
                        </h2>
                </Link>
            </div>
            <div className="w-96 bg-gray-800 rounded-lg p-10 shadow-lg">
                <h1 className='text-3xl font-bold text-white mb-8' >{page_title}</h1>
                <form className='mb-6 space-y-4' onSubmit={handleSumbit}>
                    <FieldList form_fields={form_fields} handleChange={handleChange} formState={formState} />
                    {children}
                </form>
                <div className='flex flex-col justify-between mb-6'>
                </div>
                <p
                    id="message"
                    className={`text-sm h-6 text-center ${isOk ?  'text-green-500' : 'text-red-500'
                        }`}
                >
                    {message || '\u00A0'}
                </p>
                <LinksList form_fields={form_fields} />
            </div>
        </div>
    )
}

const FieldList = ({ form_fields, handleChange, formState }) => {

    return (
        <>
            {form_fields.map((field, index) =>
                <Field
                    key={index + field.field_data_props[0].name}
                    field={field}
                    input_classes={field.input_classes}
                    handleChange={handleChange}
                    state_value={formState[field.field_data_props[index].name]}
                />
            )}
        </>
    )
}

const Field = ({ field, handleChange, state_value, input_classes }) => {
    return (
        <>
            {field.label_text && <label className='block rounded text-sm font-medium text-gray-300'>{field.label_text}</label>}
            <>
                {field.field_component === 'input'
                    ? field.field_data_props.map((field_prop, index) => (
                        <div className='mb-6' key={index} {...field.field_container_props}>
                            <input
                                key={index}
                                {...field_prop[index]}
                                onChange={handleChange}
                                value={state_value[field_prop.name]}
                                type={field_prop.type}
                                id={field_prop.id}
                                name={field_prop.name}
                                className={field_prop.className}
                                placeholder={field_prop.placeholder}
                            />
                        </div>

                    ))
                    : <textarea {...field.field_data_props} />}
                {console.log("The state value: ", state_value)}

                <button className='rounded w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' type='submit'>{field.submit_text}</button>
            </>
        </>

    )
}

const LinksList = ({ form_fields }) => {
    return form_fields[0].linkDirection.map((link, index) => (
        <>
            {console.log("The link from linkslist: ", typeof link.redirect)}
            <Link className='text-sm text-green-500 hover:underline' key={index} to={link.redirect}>{link.text}</Link>
            <br />
        </>
    ))
    //     <Link className='text-sm text-green-500 hover:underline' to="/register">Are you already registered?</Link>
    //                 <br />
    //                 <Link className='text-sm text-green-500 hover:underline' to="/forgot-password">Forgot your password?</Link>
    //  
}

export default Form