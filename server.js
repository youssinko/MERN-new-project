import express from "express";
import path from 'path'
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./store/backend/routes/seedRoutes.js";
import productRouter from "./store/backend/routes/productRoutes.js";
import userRouter from "./store/backend/routes/userRoutes.js";
import orderRouter from "./store/backend/routes/orderRoutes.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/keys/paypal", (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});
//sb stands for sandbox
app.use("/api/seed", seedRouter);
// in browser , type localhost/5000/api/seed to seed to database

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);


// ========= middleware ===========
//get directory name from path.resolve
const __direname = path.resolve()
//serve all files inside frontend build folder as a static folder
app.use(express.static(path.join(__direname,'frontend/build')))
//everything user enter after website domain, will be served by index.html
app.get('*',(req,res)=>{
  res.sendFile(path.join(__direname,'/frontend/build/index.html'))
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`on port ${port}`);
});
