import ProductRepository from "../repositories/product.repository";

export const createProductController = (req, res) => { 
    const new_object = new ProductRepository.createProduct( {"title": "Nasty Habit", "price": 500, "stock":  50, "description":  "Everyone want a nasy habit", "category": "service", "seller_id": "asd", "active": true})

    res.json(JSON.stringify(new_object))
}

const deleteProductController = (req, res) => { 
    
}

const updateProductController = (req, res) => {
    
}

const getProductByIdController = (req, res) => {
    
}

const getAllProductController = (req, res) => { 

}