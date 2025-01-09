import mongoose from 'mongoose'

// SCHEMA, TYPED
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    emailVerified:  {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
})

// CLASS, it utilize our shcema
const User = mongoose.model('User', userSchema)

export default User