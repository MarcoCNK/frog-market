import mongoose from 'mongoose'

// SCHEMA, TYPED
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock:  {
        type: Number,
        required: true,
    },
    description:  {
        type: String,
    },
    category: {
        type: String,
    },
    seller_id: {
        type: String, // mongoose.Schema.Types.ObjectId
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

// CLASS, it utilize our shcema
const Product = mongoose.model('Product', productSchema)

export default Product