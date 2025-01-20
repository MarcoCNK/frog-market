import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"

const authMiddleware = (allowed_roles) => {
    return ( req, res, next) => {
    try{
        const auth_header = req.headers['authorization']
        console.log(auth_header)
        if(!auth_header){
            return res.json({message: "No token"})
        }
        
        const access_token = auth_header.split(" ")[1]
    
        if (!access_token){
            return res.json({message: "Malformed token"})
        }
    
        try {
            const user_session_payload_decoded = jwt.verify(access_token, process.env.JWT_SECRET)            
            if (!allowed_roles.includes(user_session_payload_decoded.role) || !user_session_payload_decoded){
                return res.status(403).json({message: "You're not allowed", })
            }
            
            req.user = user_session_payload_decoded
            
            next()
        } catch (err){
            return res.send({message:  err.message})
        }

    } catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }
}
}

export default authMiddleware