import express from 'express';
import data from "./data.js";
const app = express()
app.get('/api/products', (req,res)=>{
    //send back data to front end
    res.send(data.products)
})
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`on port ${port}`)
})