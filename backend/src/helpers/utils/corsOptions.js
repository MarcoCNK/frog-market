const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['X-Basket-Id'], 
}
export default corsOptions