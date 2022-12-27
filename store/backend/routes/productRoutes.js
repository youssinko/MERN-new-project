import express from 'express'
import Product from '../models/productModel.js'
const productRouter =express.Router()
// '/' is the same as "/api/products" defined in server.js
productRouter.get('/',async(req,res)=>{
//return all products (import product from product model)
const products =await Product.find()
//send data to frontend
res.send(products)

})
productRouter.get("/slug/:slug",async(req, res) => {

const product = await Product.findOne({slug: req.params.slug});
//replace slug with the value the user input (req.params.slug)
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  });
  productRouter.get("/:id",async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  });
export default productRouter