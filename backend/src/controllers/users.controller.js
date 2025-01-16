import jwt from 'jsonwebtoken'
import ResponseBuilder from '../helpers/response.builder.js'

export const getUserController = async (req, res) => { 
    try {
        const {access_token } = req.params

        const payload = jwt.verify(access_token, process.env.JWT_SECRET)

        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage(`Sending the user`)
        .setPayload({
            detail: payload
        })
        .build()
    return res.json({ response })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}