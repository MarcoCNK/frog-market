const corsOptions = {
    origin: `${process.env.URL_FRONT}`,
    credentials: true, 
    exposedHeaders: ["X-Basket-Id"]
}
export default corsOptions