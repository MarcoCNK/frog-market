

const errorHandlerMiddleware = (err, req, res, next) => { 
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    console.error('PANIC: ',err)

    return res.status(500).json({
        status: err.status,
        message: 'Something went wrong'
    })
}

export default errorHandlerMiddleware