import nodemailer from 'nodemailer'
import ENVIRONMENT from '../config/environment.js'

const transportEmail = nodemailer.createTransport({
    service: 'gmail',
    // secure: true,
    // logger: true,
    // debug: true,
    // secureConnection: false,
    // host: "smpt.gmail.com",
    // port: 587,
    // tls: {
    //     rejectUnauthorized: false,
    //     minVersion: "TLSv1.2"
    // },
    auth: {
        user: ENVIRONMENT.EMAIL_USER,
        pass: ENVIRONMENT.EMAIL_PASSWORD
    }
})

export default transportEmail   