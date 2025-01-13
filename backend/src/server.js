import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
// import path from 'path'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import errorHandlerMiddleware from './middlewares/error.middleware.js'


const port = 3000
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

// THE MIDDLEWARE OF ERROR AT LAST
app.use(errorHandlerMiddleware)

// app.use(express.static(path.join(__dirname, 'public')));

// // More robust way to serve a single image
// app.get('/image.jpeg', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'images', 'image.jpeg')); // Assumes image is in public/images
// });

app.post('/', (req, res) => {
    console.log("Request of post method has the body: ",req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})
