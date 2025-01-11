import Product from "../models/product.models"

class ProductRepository {
    // STATIC GUARDA EL METODO EN LA CLASE
    static async createProduct( new_product_data ) {
        const new_product = new Product(new_product_data)
        return await new_product.save()
    }

    static async updateProduct (product_id, update_data) {
        return Product.findByIdAndUpdate(product_id, update_data)
    } 

    static async getAllProducts (){
        return Product.find({active: true})
    }

    static async getAllProducts (product_id){
        return Product.findById(product_id)
    }

    static async deleteProduct (product_id){
        return Product.findByIdAndUpdate(product_id, {active: false}, {new: true})
    }
}

export default ProductRepository