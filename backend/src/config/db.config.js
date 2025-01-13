import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.error('Database connection error:', err);
});

export default mongoose;