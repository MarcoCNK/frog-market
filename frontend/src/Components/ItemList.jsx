import React, { useEffect, useState } from 'react';
import getAuthHeaders from '../utils/authHeeders';
import useProducts from '../Hooks/useProducts';
import { CiTrash } from 'react-icons/ci';
import useProductDelete from '../Hooks/useProductDelete';


const ItemList = () => {

    const { products, loader, setProducts, productErrorState } = useProducts("cart")
    
    const { deleteProduct, detail } = useProductDelete()
   
    
    const [ total, setTotal] = useState(0)
    
    
    useEffect(() => {
        if (detail && detail.length > 0) {
            setProducts(detail);
        } else {
            setProducts([]);
        }        
    }, [detail, setProducts]);
    
    useEffect(() => {
        const total_calculation = products.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
        ); 
        
        
        setTotal(Number(total_calculation))
    }, [products]);


    return (
        <div className='w-full'>
            <h1 className="text-4xl font-bold mb-4 text-green-500">
                Your products:
            </h1>
            <hr className='black-500 ' />
            {
                loader
                    ? "loading"
                    : detail &&
                    products.map((element) => {
                        return (

                            <div key={element._id} >
                                <img
                                    src={element.image}
                                    alt={element.title}
                                />
                                <h2 className="text-2xl font-semibold text-green-500">{element.title}</h2>
                                <p className="text-2xl font-semibold text-green-500">
                                    ${element.price}
                                </p>
                                    <span>
                                        <button
                                            key={element.id}
                                            onClick={() => deleteProduct(element.seller_id, "cart")}
                                        >
                                            <CiTrash size={24} />
                                        </button>
                                    </span>
                                    <hr />
                            </div>

                        )
                    }
                    )
            }
            <h4
                className={`text-sm h-6 text-center`}
            >

                Total: 
                <span className='text-4xl h-12 text-center'> 
                    <strong> 
                        ${total} 
                    </strong>
                </span>
            </h4>
            <h4
                id="message"
                className={`text-4xl h-6 text-center ${productErrorState ? 'text-red-500' : 'text-green-500'
                }`}
            >
                {productErrorState || '\u00A0'}
            </h4>
            

        </div>
    )
}
export default ItemList