import express from "express";
import mongoose from "mongoose";
import todoRoute from "./routes/todoRoute.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// middleware
app.use(express.json());


// routes
app.use('/api/todos',todoRoute)
app.use('/auth',authRoute)
// main get
app.get("/", (req, res) => {
  res.send("hello from node api");
});

// connect to db
mongoose
  .connect(
    "mongodb+srv://charlene7w:0.0asdASD@cluster0.bez3har.mongodb.net/Node-API?appName=Cluster0"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running on port 3000"); // db OK server 才启动
    });
    console.log("connected to db!");
  })
  .catch(() => {
    console.log("connection failed");
  });
