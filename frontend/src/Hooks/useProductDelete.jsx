import { useState } from "react"
import getAuthHeaders from "../utils/authHeeders"


const useProductDelete = () => {
    const [ detail, setDetail ] = useState([])
    const deleteProduct = async (product_id, endpoint) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${product_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: getAuthHeaders()
        })
        const data = await response.json()
     
        setDetail(data.response.payload.detail)
    }

    return {
        deleteProduct,
        detail,
    }
    
}

export default useProductDelete
