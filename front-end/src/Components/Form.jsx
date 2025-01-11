import React from 'react'
import useForm from '../Hooks/useForm';


const Form = ({ action, children, form_fields, initial_state_form }) => {
    console.log("Initial state: ", initial_state_form)
    const { formState, handleChange } = useForm(initial_state_form)
    console.log("THe from state: ", formState)

    const handleSumbit = (e) => {
        e.preventDefault()
        action(formState)
    }
    return (
        <form onSubmit={handleSumbit}>
            <FieldList form_fields={form_fields} handleChange={handleChange} formState={formState} />
            {children}
        </form>
    )
}

const FieldList = ({ form_fields, handleChange, formState }) => {

    return (
        <div>
            {form_fields.map((field, index) =>
                <Field
                    key={index + field.field_data_props[0].name}
                    field={field}
                    handleChange={handleChange}
                    state_value={formState[field.field_data_props[index].name]}
                />
            )}
        </div>
    )
}

const Field = ({ field, handleChange, state_value }) => {
    return (
        <>
            {field.label_text && <label>{field.label_text}</label>}
            <>
                {field.field_component === 'input'
                    ? field.field_data_props.map((field_prop, index) => (
                        <div key={index} {...field.field_container_props}>
                            <input 
                                key={index}
                                {...field_prop[index]}
                                onChange={handleChange}
                                value={state_value[field_prop.name]}
                                name={field_prop.name}
                                type={field_prop.type}
                                id={field_prop.id}
                                placeholder={field_prop.placeholder}
                            />
                        </div>

                    ))
                    : <textarea {...field.field_data_props} />}
                        {console.log("The state value: ", state_value)}

                <button type='submit'>{field.submit_text}</button>
            </>
        </>

    )
}

export default Form