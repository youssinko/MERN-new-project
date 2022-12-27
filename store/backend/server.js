import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from './routes/userRoutes.js'


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
//form data in in the post request (in userroutes.js)will be converted to a json object inside req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/seed", seedRouter);
// in browser , type localhost/5000/api/seed to seed to database

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);


//middleware
app.use((err,req,res,next)=>{
res.status(500).send({message:err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`on port ${port}`);
});
