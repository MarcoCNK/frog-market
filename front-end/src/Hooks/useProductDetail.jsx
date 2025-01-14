import { useEffect, useState } from "react"
import getAuthHeaders from "../utils/authHeeders"


const useProductDetail = (product_id) => { 
    const [product_detail_state, setProductDetail] = useState()
    const [product_detail_loading_state, setProductDetailLoading] = useState(true)
    const [product_detail_error_state, setProductDetailError] = useState(null)


    const getProductDetail = async (product_id) => { 
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, { 
            method: 'GET',
            headers: getAuthHeaders()
        })
        console.log(response)
        const data = await response.json()
        console.log(data)

        if (!data.ok) {
            setProductDetailError(data.error)
        }
        
        setProductDetail(data.payload.ProductsSearched)
        setProductDetailLoading(false)
    }
        useEffect(
            () => {
               getProductDetail(product_id)
          }, [])

        return {
            product_detail_state,
            product_detail_loading_state,
            product_detail_error_state
        }
      

}

export default useProductDetail