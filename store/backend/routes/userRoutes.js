/////////=== CREATING API FOR SIGNIN/UP
import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utilities.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();
userRouter.post(
  //instead of typing try and catch , we will be using expressasynchhandler from express package (middleware) to catch error within async/await ()
  //when there is an error, app.use((err,req,res,next)=>{
  // res.status(500).send({message:err.message})
  // }) in "server.js" will be fired.
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid Email or password" });
  })
);

//create a new user from mongoose model====User is coming from user model
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

//first get user from database , check if user exist ,update user name and email
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
export default userRouter;
