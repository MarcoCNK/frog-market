import React, { useState } from 'react'

const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm)
  const handleChange = (event) => {
		const { name, value } = event.target 

		setFormState((prevFormState) => {
			console.log("PREV FROM STATE",prevFormState) // {email: "", password: ""}
			return {...prevFormState, [name]: value}
		})
	}

	const handleChangeImage = (event, fieldName) => { 
		const FILE_MB_LIMIT = 2
		
		const file = event.target.files[0]

		const reader = new FileReader()

		// if(file && file.size > FILE_MB_LIMIT * 1024 * 1024){
		// 	setFormState((prevFormState) => {

		reader.onloadend = () => {
			const imageBase64 = reader.result
			setFormState((prevFormState) => {
				return {...prevFormState, fieldName: imageBase64}
			})
		}
		if (file){

			reader.readAsDataURL(file)
		}
	}

  return {
	  formState,
	  handleChange
  }
}

export default useForm