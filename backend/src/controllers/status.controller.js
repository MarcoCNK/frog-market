export const postPingController = (req, res) => { 
    try{
        console.log("hola")
        return res.json({ status: 'OK' })    
    } catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }
}