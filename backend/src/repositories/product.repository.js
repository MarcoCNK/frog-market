import Product from "../models/product.models.js"

class ProductRepository {
    // STATIC GUARDA EL METODO EN LA CLASE
    static async createProduct( new_product_data ) {
        const new_product = new Product(new_product_data)
        return await new_product.save()
    }

    static async updateProduct (product_id, update_data) {
        return Product.findOneAndUpdate(product_id, update_data)
    } 

    static async getAllProducts (){
        return Product.find({active: true})
    }

    static async getProductById (product_id){
        return Product.findOne(product_id)
    }

    static async deleteProduct (filter){
        return Product.findOneAndUpdate(filter, { active: false }, { new: true });
    }
}

export default ProductRepository
