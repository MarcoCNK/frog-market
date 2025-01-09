import mongoDB from 'mongoose'

const MONGO_URL = 'mongodb://localhost:27017/users'

mongoDB.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (() => {
    console.log('Database connected')
})
.catch((err) => {
    console.log("EL ERROR INDESCRIPTIBLE: ",err)
})

export default mongoDB  