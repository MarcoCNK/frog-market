import crypto from "crypto"
import CartProductRepository from "../repositories/cart.repository.js"
import ProductRepository from "../repositories/product.repository.js"
import AppError from "../helpers/errors/app.error.js"
import ResponseBuilder from "../helpers/response.builder.js"


export const addToCartController = async (req, res, next) => {
    let cartId = req.cookies.cartId

    if (!cartId) {
        cartId = crypto.randomBytes(16).toString("hex")
        res.cookie("cartId", cartId, { httpOnly: true, secure: true, sameSite: "strict" })
    }
    const { seller_id } = req.body
    const product = await ProductRepository.getProductById({ "seller_id": seller_id, })
    if (!product) {
        return next(new AppError("Product not found", 404))
    }
    const newProduct = await CartProductRepository.createProductCart(product, cartId)
    if (!newProduct) {
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`There's no more products`)
            .setPayload({
                detail: "No more stock"
            })
            .build()
        return res.status(200).json({ response })
    }
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`The product falls on the cart...`)
        .setPayload({
            detail: "Product added"
        })
        .build()
    return res.status(200).json({ response })
}


export const eliminateProductCart = async (req, res, next) => {
    const { seller_id } = req.params
    const cartId = req.cookies.cartId

    if (!cartId) {
        return next(new AppError("There's no cart session ", 400))
    }

    if (!seller_id) {
        return next(new AppError("Requset must contain a query"))
    }

    const retriever = await CartProductRepository.deleteProductCart(seller_id, cartId)
    if (!retriever) {
        return next(new AppError("Cannot delete product", 400))
    }
    const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`The product drops from the cart...`)
        .setPayload({
            detail: retriever
        })
        .build()
    return res.status(200).json({ response })
}

export const getAllCartProducts = async (req, res, next) => {
    try {
        const cartId = req.cookies.cartId
        const productsDetail = await CartProductRepository.getAllProductsDetails(cartId)
        if (!productsDetail) {
            return next(new AppError("There's no cookie", 404))
        }
    
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Get products`)
            .setPayload({
                detail: productsDetail
            })
            .build()
        return res.status(200).json({ response })
    } catch(err){
        return next(new AppError("An error ocurs, try again later!", 500))
    }
}


export const checkoutController = (req, res, next) => {
    // const cartId = req.cookies.cartId
    // const productsDetail = await CartProductRepository.getAllProductsDetails(cartId)
    // if (!productsDetail) {
    //     return next(new AppError("There's no cookie", 404))
    // }
    // const response = new ResponseBuilder()
    //     .setOk(true)
    //     .setStatus(200)
    //     .setMessage(`Get products`)
    //     .setPayload({
    //         detail: productsDetail
    //     })
    //     .build()
    // return res.status(200).json({ response })
    return res.status(200).json({ message: "Checkout" })
}
