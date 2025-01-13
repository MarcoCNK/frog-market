import AppError from "../helpers/errors/app.error.js";
import ResponseBuilder from "../helpers/response.builder.js";
import ProductRepository from "../repositories/product.repository.js";

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

export const createProductController = async (req, res, next) => {
    try {

        // LACK VALIDATIONS OF REQ BODY

        if (isEmptyObject(req.body)) {
            return next(new AppError("Wrong product", 400))
        }

        const new_object = await ProductRepository.createProduct(req.body)
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(201)
            .setMessage(`Product created`)
            .setPayload({
                new_object
            })
            .build()
        return res.json({ response })
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log("This is the id", id)
        if (!id) {
            return next(new AppError("You must provide an id", 400))

        }
        const new_object = await ProductRepository.deleteProduct({ seller_id: id })
        
        if (isEmptyObject(new_object)) {
            return next(new AppError("Product not found", 404))
        } 

        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`Product eliminated`)
        .setPayload({
            new_object
        })
        .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        next(error)
    }

}

export const updateProductController = async (req, res, next) => {
    try {

        const { id } = req.params

        if (!id) {
            return next(new AppError("There's no id", 400))
        }
        if (isEmptyObject(req.body)) {
            return next(new AppError("You have sent a wrong body", 400))
        }

        const new_object = await ProductRepository.updateProduct({ seller_id: id }, req.body)
        
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`Product Updated`)
        .setPayload({
            new_object
        })
        .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        next(error)
    }

}

export const getProductByIdController = async (req, res, next) => {
    try {

        const { id } = req.params

        if (!id) {
            return next(new AppError("There's no id", 400))
        }

        const ProductsSearched = await ProductRepository.getProductById({ "seller_id": id, }) // []

        // if (isEmptyObject(object_searched)) {
        //     return next(new AppError("Product not found", 404))
        // }
        
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`Get product by id`)
        .setPayload({
            ProductsSearched
        })
        .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export const getAllProductController = async (req, res, next) => {
    try {
        const ProductSearched = await ProductRepository.getAllProducts()
        if (isEmptyObject(ProductSearched)) {
            return next(new AppError("Product not found", 404))
        }
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`All products`)
        .setPayload({
            ProductSearched
        })
        .build()
        return res.json(response)
    } catch (error) {
        console.error(error);
        next(error)
    }
}