import React, { useContext, useState } from 'react'
import useForm from '../Hooks/useForm';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContenxt';

let messageFromBackend = ""
let isOkStatus = false

const Form = ({ action, children, form_fields, initial_state_form, page_title, links, isBillingFrom }) => {
    const [message, setMessage] = useState('')
    const [isOk, setIsOk] = useState(false);
    const { formState, handleChange, handleChangeImage } = useForm(initial_state_form)
    const { isLoged } = useContext(AuthContext)

    const handleSumbit = async (e) => {
        e.preventDefault()
        messageFromBackend, isOkStatus = await action(formState)
        setMessage(isOkStatus.messageFromData)
        setIsOk(isOkStatus.isOk)
    }
    return (

        <div className={` ${isBillingFrom ? 'flex flex-col items-center justify-center bg-transparent min-h-screen' : 'flex flex-col items-center justify-center bg-gray-900 min-h-screen'}`} >
            {
                isBillingFrom ? <p>
                    {'\u00A0'}
                </p>
                    :
                    <div className="flex items-start justify-start w-full py-12">
                        <Link className="flex items-center max-w-screen-lg mx-auto px-4" to={isLoged ? '/home' : '/login'}>
                            <img
                                src="/frogLogo.png"
                                alt="Logo"
                                className="w-18 h-14 rounded-full mr-4"
                            />
                            <h2 className="text-3xl font-bold text-white">
                                Froggy Market
                            </h2>
                        </Link>
                    </div>

            }
            <div className="w-96 bg-gray-800 rounded-lg p-10 shadow-lg">
                <h1 className='text-3xl font-bold text-white mb-8' >{page_title}</h1>
                <form className='mb-6 space-y-4' onSubmit={handleSumbit}>
                    <FieldList isBillingFrom={isBillingFrom} form_fields={form_fields} handleChangeImage={handleChangeImage} handleChange={handleChange} formState={formState} />
                    {children}
                </form>
                <div className='flex flex-col justify-between mb-6'>
                </div>
                <p
                    id="message"
                    className={`text-sm h-6 text-center ${isOk ? 'text-green-500' : 'text-red-500'
                        }`}
                >
                    {message || '\u00A0'}
                </p>
                {isBillingFrom ? <p>
                    {'\u00A0'}
                </p>
                    :
                    <LinksList form_fields={form_fields} />}
            </div>
        </div>
    )
}

const FieldList = ({ form_fields, handleChange, formState, isBillingFrom, handleChangeImage }) => {
    return (
        <>
            {form_fields.map((field, index) => {
                return (
                    <>
                        {field.label_text.length === 1 &&
                            <Label field={field} index={index} />
                        }
                        <Field
                            isBillingFrom={isBillingFrom}
                            key={index + field.field_data_props[0].name}
                            field={field}
                            input_classes={field.input_classes}
                            handleChange={handleChange}
                            handleChangeImage={handleChangeImage}
                            state_value={formState[field.field_data_props[index].name]}
                        />
                            {formState.image_base64 && <img src={formState.image_base64} alt='' /> }
                            <button
                className="rounded w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                type="submit"
            >
                {field.submit_text}
            </button>
                    </>
                )


            }
            )}
        </>
    )
}

const Field = ({ field, handleChange, input_classes, handleChangeImage, state_value, isBillingFrom, image_base64 }) => {
    return (
        <>
            {field.field_data_props.map((field_prop, index) => (
                <div key={index}>
                    { isBillingFrom ? 
                   <label
                        {...(field.label_text[index].htmlFor && { htmlFor: field.label_text[index].htmlFor })}
                        className={field.label_text[index].className}
                    >
                        {field.label_text[index].text}
                    </label> 
                     : <p>
                     {'\u00A0'}
                 </p>
                     }

                    {field.field_data_props[index].field_component === 'input' ? (
                        <div className='mb-6' key={index} {...field.field_container_props}>
                            {console.log("THis is the state ", state_value[0])}
                            <input
                                key={index}
                                {...field_prop}
                                // onChange={handleChange}
                                onChange={field.field_data_props[index].name === 'image_base64' ? (e) => handleChangeImage(e, 'image_base64') : handleChange}
                                // value={state_value[field_prop.name]}
                                type={field_prop.type}
                                id={field_prop.id}
                                name={field_prop.name}
                                className={field_prop.className}
                                placeholder={field_prop.placeholder}
                            />
                        </div>
                    ) : (
                        <div className='mb-6' key={index} {...field.field_container_props}>
                            <select
                                key={index}
                                {...field_prop}
                                onChange={handleChange}
                                value={state_value[field_prop.name]}
                                type={field_prop.type}
                                id={field_prop.id}
                                name={field_prop.name}
                                className={field_prop.className}
                                placeholder={field_prop.placeholder}
                            >
                                {
                                    field.field_data_props[index].country
                                        ? field.field_data_props[index].country.map((element, idx) => (
                                            <option key={idx}>
                                                {element}
                                            </option>
                                        ))
                                        : Array.from({ length: 10 }, (_, i) => (
                                            <option
                                                className="bg-black text-green-500 hover:bg-green-500"
                                                key={i + 2024}
                                                value={(i + 24).toString().padStart(2, '0')}
                                            >
                                                {(i + 24).toString().padStart(2, '0')}
                                            </option>
                                        ))
                                }

                            </select>
                        </div>
                    )}
                </div>
            ))}
             {/* {isBillingFrom ? <p>
                    {'\u00A0'}
                </p>
                    : */}
            
            {/* } */}
        </>
    );
};


const LinksList = ({ form_fields }) => {
    return form_fields[0].linkDirection.map((link, index) => (
        <>
            <Link className='text-sm text-green-500 hover:underline' key={index} to={link.redirect}>{link.text}</Link>
            <br />
        </>
    ))
    //     <Link className='text-sm text-green-500 hover:underline' to="/register">Are you already registered?</Link>
    //                 <br />
    //                 <Link className='text-sm text-green-500 hover:underline' to="/forgot-password">Forgot your password?</Link>
    //  
}

const Label = ({ field, index }) => {
    return (
        <label className={field.label_text[index].className}>
            {field.label_text[index].text}
        </label>
    )
}

export default Form