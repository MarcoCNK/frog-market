import React from 'react'
import { useParams } from 'react-router-dom'
import useProductDetail from '../Hooks/useProductDetail'

const ProductDetailScreen = () => {

    const { product_id } = useParams()
    console.log(product_id)
    const {
        product_detail_state,
        product_detail_loading_state,
        product_detail_error_state
    } = useProductDetail(product_id)

    return (
        <>
        <div>ProductDetailScreen</div>
        {
            product_detail_loading_state
            ? <p>Loading...</p>
            : <div>
                <h1>{product_detail_state.title}</h1>
                <p>{product_detail_state.description}</p>
                <span>
                <p>{product_detail_state.price}</p>
                <button>Buy Now</button>
                </span>
            </div>    
        }
        </>
    )
}

export default ProductDetailScreen