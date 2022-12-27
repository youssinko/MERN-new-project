//make apis in the backend modular
//we gonna be using express router to create routes
import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
const seedRouter = express.Router();
seedRouter.get("/", async (req, res) => {

    
  //return all records inside Product model
  await Product.remove({});
  //create new product that coming from data.js
  //use insertMany to add array of products to the product model in database
  //and return the created product in the createdProducts variable
  const createdProducts = await Product.insertMany(data.products);


  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  //send back products/data to the fronend
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
