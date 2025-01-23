import nodemailer from 'nodemailer'
import ENVIRONMENT from '../config/environment.js'

const transportEmail = nodemailer.createTransport({
    
    host: "mailhog",
    port: 1025,
    // tls: {
    //     rejectUnauthorized: false,
    //     minVersion: "TLSv1.2"
    // },
    // auth: {
    //     user: ENVIRONMENT.EMAIL_USER,
    //     pass: ENVIRONMENT.EMAIL_PASSWORD
    // }
})

export default transportEmail   