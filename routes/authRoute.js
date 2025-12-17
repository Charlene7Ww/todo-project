import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const authRoute = express.Router();

authRoute.post("/register", async (req, res) => {
  // add user to db
  try {
    const { email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hasedPassword,
    });
    res.status(200).json({ message: "Register success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const pwMatched = await bcrypt.compare(password, user.password)
    if (pwMatched) {
    //   res.status(200).json({ message: "Login success" });
      const accessToken = generateAccessToken(user)
      res.status(200).json({token:accessToken})
    } else {
      res.status(401).json({ message: "Password not matched" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// funcs
const generateAccessToken = (user)=>{
    return jwt.sign({ id: user._id },process.env.JWT_SECRET,{expiresIn: "15m"})
}
export default authRoute;
