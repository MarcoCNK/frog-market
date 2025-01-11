const testMiddleware = (req, res, next) => { 
    if (0.5 < Math.random()) {
        res.status(400).json({message: "Unlucky"})
    } else {
        next()
    }
}

export default testMiddleware