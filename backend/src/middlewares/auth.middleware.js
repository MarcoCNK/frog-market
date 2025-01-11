import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"

const authMiddleware = ( req, res, next) => {
    try{
        const auth_header = req.headers['authorization']

        if(!auth_header){
            res.json({message: "No token "})
        }
        
        const access_token = auth_header.split(" ")[1]
    
        if (!access_token){
            res.json({message: "Malformed token"})
        }
    
        const user_session_payload_decoded = jwt.verify(access_token, process.env.JWT_SECRET)
        
        req.user = user_session_payload_decoded
    
        next()

    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
    
}

export default authMiddleware