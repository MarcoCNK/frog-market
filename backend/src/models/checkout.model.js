import mongoose from 'mongoose'

const CheckoutSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true
    },
    checkoutId: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: Number,
        required: true
    },
    expiryYear: {
        type: Number,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    }
},{
    timestamps: true
})

// CLASS, it utilize our shcema
const CheckoutSession = mongoose.model('Checkout', CheckoutSchema)

export default CheckoutSession