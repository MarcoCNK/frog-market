import React, { useState } from 'react'

const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm)
  const handleChange = (event) => {

		const { name, value } = event.target 

		setFormState((prevFormState) => {
			return {...prevFormState, [name]: value}
		})
	}


  return {
	  formState,
	  handleChange
  }
}

export default useForm