import mongoose from "mongoose"
import CartProduct from "../models/cart.models.js"

class CartProductRepository {
    static async createProductCart(product, cartId) {
        let cartSession = await CartProduct.findOne({ cartId })
    
        
        if (!cartSession) {    
            cartSession = new CartProduct({
                cartId: cartId,
                detailProducts: [
                    {
                        seller_id: product.seller_id,
                        title: product.title,
                        price: product.price,
                        stock: product.stock,
                    },
                ],
            })
            
            return await cartSession.save()
        } else {
            
            const filtering = cartSession.detailProducts.filter(
                (element ) => element.seller_id == product.seller_id 
            )
            if (filtering.length <= product.stock ){
            console.log("filtering great than products")

                cartSession.detailProducts.push({
                    seller_id: product.seller_id,
                    title: product.title,
                    price: product.price,
                    stock: product.stock,
                })
                return await cartSession.save()
            } else{
            console.log("the else")

                return false
               
            }
        }
    }
    


    static async getAllProductsDetails(cartId) {
        let cartSession = await CartProduct.findOne({ cartId })
        
        if (!cartSession) {
            return false
        }

        return cartSession.detailProducts
    }

    
    static async deleteProductCart(product_id, cartId ) {
        const cartSession = await CartProduct.findOne({ cartId });

        if (!cartSession) {
          return "Cart not found";
        }
      
        const existingProductIndex = cartSession.detailProducts.findIndex(
          (item) => item.seller_id === product_id
        );
      
        if (existingProductIndex === -1) {
          return "Product not found in cart";
        }
        console.log("The product to elliminate, ",cartSession.detailProducts[existingProductIndex].stock)
        if (cartSession.detailProducts[existingProductIndex].stock < cartSession.detailProducts[existingProductIndex].stock){
            return "No more products to delete"
        }
        cartSession.detailProducts.splice(existingProductIndex, 1);
      
        await cartSession.save();
      
        return cartSession.detailProducts
    }
}

export default CartProductRepository