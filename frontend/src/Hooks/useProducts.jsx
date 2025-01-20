import { useEffect, useState } from "react"
import getAuthHeaders from '../utils/authHeeders'

const useProducts = (endPoint) => { 
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [productErrorState, setProductErrorState] = useState(null)


    const getProducts = async () => { 
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endPoint}`, {
            method: 'GET',
            credentials: 'include',
            headers: getAuthHeaders()
        })
        const data = await response.json()


        console.log("Is endpoint cart: ?", endPoint == "cart")
        if (endPoint == "products" ){
          setProducts(data.payload.ProductSearched)
          setLoader(false)
        } else if (endPoint == "cart"){
          if (!data.response.ok) {
            setProductErrorState(data.response.message)
            setLoader(false)
            return 
          }
          setProducts(data.response.payload.detail)
          setLoader(false)
        }
      }
       useEffect(
         () => {
            getProducts()
       }, [endPoint])

      return {
        setProducts,
        products,
        loader,
        productErrorState
      }

}

export default useProducts