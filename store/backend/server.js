import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from './routes/seedRoutes.js'

//to fetch variables in the env file
dotenv.config();
//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo db");
  })
  .catch((err) => {
    console.Console(err.message);
  });

const app = express();

app.use('/api/seed' , seedRouter)
// in browser , type localhost/5000/api/seed to seed to database

app.get("/api/products", (req, res) => {
  //send back data to front end
  res.send(data.products);
});
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`on port ${port}`);
});
