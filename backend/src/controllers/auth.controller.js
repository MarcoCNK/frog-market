import Joi from 'joi'
import ResponseBuilder from '../helpers/response.builder.js'
import User from '../models/user.models.js'
// import nodemailer from 'nodemailer'
import transportEmail from '../helpers/email.transporter.helpers.js'
import ENVIRONMENT from '../config/environment.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        // VALIDATIONS OF THE BODY
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = schema.validate(req.body)
        if (error) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(error.message)
                .setPayload({
                    value
                })
                .build()
            return res.json({ response })
        }
        const hashedPassword = await bcrypt.hash(value.password, 10)

        const user = new User({
            name: value.name,
            email: value.email,
            password: hashedPassword,
            emailVerified: false,
            verificationToken: ''
        })
        await user.save()

        // VERIFY TOKEN
        const validationToken = jwt.sign({
            email: value.email,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })

        const redirectURL = `http://localhost:${process.env.PORT}/api/auth/verify-email/` + validationToken

        // SEND MAIL
        const mailOptions = {
            from: {
                name: "Froggy Market",
                address: process.env.EMAIL_USER
            },
            subject: 'Email verification',
            to: value.email,
            html: `
                 <h1>Verify Your Email</h1>
                <p>Please click the link below to verify your email </p>
                <a href=${redirectURL} >Verify</a>
                `,
            attachments: [
                {
                    filename: '/home/pull/labs/clases-backend/backend/images.jpeg',
                    contentType: 'image/jpeg'
                }
            ]
        }
        const result = transportEmail.sendMail(mailOptions)


        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`OK`)
            .setPayload({
                value
            })
            .build()
        return res.json({ response })
    } catch (error) {

        if (error.code === 11000) {
            console.log(error.code)
            console.log(typeof error.code)
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Email already exists`)
                .setPayload({
                    detail: "Email already registered!"
                })
                .build()
            return res.json({ response })
        } else {
            console.log(error)
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(500)
                .setMessage(`Internal server error`)
                .setPayload({
                    error
                })

                .build()
            return res.json({ response })
        }
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { validation_token } = req.params
        const payload = jwt.verify(validation_token, process.env.JWT_SECRET)
        console.log("Token tecibido: ", payload)
        const user_to_verify = await User.findOne({ email: payload.email })
        console.log(user_to_verify)
        user_to_verify.emailVerified = true
        await user_to_verify.save()

        res.redirect('http://localhost:5173/login')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

export const loginController = async (req, res) => {
    try {

        // VALIDATIONS
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = loginSchema.validate(req.body)

        // check if its registerred
        const user = await User.findOne({ email: value.email })
        if (!user) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.json({ response })
        }

        // check if the password is correct
        const isValidPassword = await bcrypt.compare(value.password, user.password)

        // Count retries
        
        let acc = 0
        if (!isValidPassword) {
            const retries_token = jwt.sign({
                try: acc++
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })
            console.log("Invalid creds")
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Invalid credentials`)
                .setPayload({
                    detail: "Bad credentials",
                    retry: retries_token
                })
                .build()
            return res.json({ response })
        }
        // Verify if us the token verified
        if (!user.emailVerified) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Please verify your email before logging in`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.json({ response })
        }

        // generate an access token
        const access_token = jwt.sign({
            user_id: user._id,
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Logged successfully!`)
            .setPayload({
                detail: access_token
            })
            .build()
        return res.status(200).json({ response })

    } catch (err) {
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })
    }

}


export const forgotPasswordController = async (req, res) => {
    try{
        const { email } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.json({ response })
        }
        console.log(`user_id: ${user._id},
            name: ${user.name},
            email: ${user.email}`)
    
        const reset_token = jwt.sign({
            user_id: user._id,
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })
        console.log("The reset token is: ", reset_token)
        const redirectURL = `http://localhost:5173/auth/recovery-password/` + reset_token
    
    
        const mailOptions = {
            from: {
                name: "Froggy Market",
                address: process.env.EMAIL_USER
            },
            subject: 'Update your password',
            to: email,
            html: `
                <h1>Hello ${user.name}</h1>
                <p>CLick here and you could verify your password </p>
                <a href=${redirectURL} >Reset password</a>
                `,
            attachments: [
                {
                    filename: '/home/pull/labs/clases-backend/backend/images.jpeg',
                    contentType: 'image/jpeg'
                }
            ]
        }
        const result = transportEmail.sendMail(mailOptions)
    
        const response = new ResponseBuilder()
                .setOk(true)
                .setStatus(200)
                .setMessage(`We have send you an email`)
                .setPayload({
                    detail: "Reach your mail"
                })
                .build()
            return res.status(200).json({ response })
    } catch(err){
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })

    }
    
}

export const recoveryPasswordController = async (req, res) => { 
    try {
        const { reset_token } = req.params
        const {password } = req.body
        console.log("New pass ",password)
        const virifiedToken = jwt.verify(reset_token, process.env.JWT_SECRET)
        console.log("Token tecibido: ", virifiedToken)
        if (!virifiedToken) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Invalid credentials`)
                .setPayload({
                    detail: "Bad credentials"
                })
                .build()
            return res.json({ response })
        }
        // get the user
        const user_to_verify = await User.findOne({ email: virifiedToken.email })
        console.log("get the user", user_to_verify)
        
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hash the password", hashedPassword)
        user_to_verify.password = hashedPassword
        await user_to_verify.save()

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Password changed successfully`)
            .setPayload({
                detail: "Password changed successfully"
            })
            .build()
        return res.json({ response })
        

    } catch(error) {
        console.error(error)
    }
 }

export const retryPasswordController  = async (req, res) => { 
    const { retry } = req.body

    const validationToken = jwt.sign({try: retry},
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        })
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage(`Invalid creds`)
        .setPayload({
            detail: validationToken
        })
        .build()
    return res.json({ response })
}