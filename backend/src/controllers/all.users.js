import ResponseBuilder from '../helpers/validation.helpers.js'

export const getIdor = (req, res) => {
    
    if (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(200)
        .setMessage(`OK`)
        .setPayload({
            value
        })
        .build()
        return response
    }
    
    console.log("Validated body: ", value)
    const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(200)
        .setMessage(`OK`)
        .setPayload({
            value
        })
        .build()
    return response
}