import { useState } from "react"
import getAuthHeaders from "../utils/authHeeders"


const useProductDelete = (product_id) => {
    // const [productErrorStateDelete, setproductErrorStateDelete] = useState("")
    console.log("Id global". product_id) // SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button, …
    const deleteProduct = async (product_id) => {
        console.log("Id local ",product_id)
        let id_string = String(product_id)
        console.log("Type of product id", id_string)

        const response = await fetch(`http://localhost:3000/api/products/${id_string}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        const data = await response.json()
        console.log(data)
    }

    return deleteProduct
        // productErrorStateDelete
    
}

export default useProductDelete
// const deleteProduct = useProductDelete();

// ...

// ...

{/* <button onClick=>Click here to delete</button> */}