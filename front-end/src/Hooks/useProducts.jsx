import { useEffect, useState } from "react"
import getAuthHeaders from '../utils/authHeeders'

const useProducts = () => { 
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [productErrorState, setProductErrorState] = useState(null)

    const getProducts = async () => { 
        const response = await fetch('http://localhost:3000/api/products/', {
            method: 'GET',
            headers: getAuthHeaders()
        })
        const data = await response.json()
        await console.log("Data: ",  )
        if (!data.ok) {
            setProductErrorState(data.error)
            setLoader(false)
            return 
        }
        
        setProducts(data.payload.ProductSearched)
        setLoader(false)
      }
       useEffect(
         () => {
            getProducts()
       }, [])

      return {
        products,
        loader,
        productErrorState
      }

}

export default useProducts