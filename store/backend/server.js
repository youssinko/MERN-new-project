import express from 'express';
import data from "./data.js";
const app = express()
app.get('/api/products', (req,res)=>{
    //send back data to front end
    res.send(data.products)
})
app.get('/api/products/slug/:slug', (req,res)=>{
    const product = data.products.find(x=> x.slug === req.params.slug)
    if (product){
    res.send(product)
    }else{
        res.status(404).send({message:'Product not found'})
    }
})
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`on port ${port}`)
})