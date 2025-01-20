import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import errorHandlerMiddleware from './middlewares/error.middleware.js'
// import pool from './config/dbMysql.config.js'
import ProductRepository from './repositories/product.repository.js'
import cartRouter from './routes/cart.route.js'
import corsOptions from './helpers/utils/corsOptions.js'
// import userRouter from './routes/users.route.js'

const port = 3000
const app = express()

app.use(cors(corsOptions))

app.disable('x-powered-by')
app.disable('If-None-Match')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/status', statusRouter)

app.use('/api/auth', authRouter)

app.use('/api/products', productRouter)

// app.use('/api/users', userRouter )Product

app.use('/api/cart', cartRouter)


// THE MIDDLEWARE OF ERROR AT LAST
app.use(errorHandlerMiddleware)

app.post('/', (req, res) => {
    console.log("Request of post method has the body: ", req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})

// ProductRepository.createProduct({
//     title: "Test",
//     price: 100,
//     stock: 10,
//     description: "Test",
//     category: "Test",
//     seller_id: 1,
//     image_base64: "Test"   
// })

// ProductRepository.getAllProducts({

// })

// const person = {
//     name: "",
//     isHuman: false
//   };

// const me = Object.create(person);

// let accArr = []

// for (let i = 0; i < 3; i++){
//   	me.name = 'Andrew'; // "name" is a property set on "me", but not on "person"
// 	me.isHuman = true;
//   	accArr.push(me)
// }

// console.log(accArr) 

// const new_array = Array.from({length: 3})
// const iterator = new_array.keys();

// for (const key of iterator) {
//  new_array[key] = Object({
//     name: "Andrew",
//     isHuman: true
//   })
// }
// console.log(new_array)