import React, { useState } from 'react'

const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm)
  const handleChange = (event) => {

		const { name, value } = event.target 

		console.log("The value: ", value)
		setFormState((prevFormState) => {
			return {...prevFormState, [name]: value}
		})
	}

	const handleChangeImage = (event, field_name) => {
		const file = event.target.files[0]

		const FILE_MB_LIMIT = 2

		if (file && file.size > FILE_MB_LIMIT * 1024 * 1024){
			alert("The file is big")
		}

		console.log("The file: ", file)
		console.log("Handling image properly")
		console.log("The image: ",field_name)
		const reader = new FileReader()
		// es yun evento que se va a activar cuand ose termine de cargar el archivo
		reader.onloadend = () => {
			const image_base64 = reader.result // El resultado de la lectura del archivo, y esta en base 64
			setFormState(
				(prevState) => {
					return { ...prevState, [field_name]: image_base64 }
				}
			)
			// console.log("THis is the image base 64: ",image_base64)
		}

		if(file){
			// Read file and tranform it to base 64
			reader.readAsDataURL(file)
		}
	}

  return {
	  formState,
	  handleChange,
	  handleChangeImage
  }
}

export default useForm