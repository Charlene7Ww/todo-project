import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const auth = async (req, res, next) => {
  try {
    // A. 从 headers 里拿 token
    const authHeader = req.headers["authorization"];
    const token = authHeader&&authHeader.split(' ')[1]
    // B. 如果没有 token，return 401
    if(!token){return res.status(401).json({message:'Token not found'})}
    // C. jwt.verify(token, SECRET)
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    // D. 用 decoded.id 找 user
    const user = await User.findById(id)
    // E. 挂到 req.user
    req.user = user
    // F. next()
    next()
  } catch (err) {
    // token 不合法
    res.status(403).json({ message: "Invalid token" })}
  }


export default auth;