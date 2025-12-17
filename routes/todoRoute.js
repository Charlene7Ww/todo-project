import getTodo from "../controllers/todoController.js";
import auth from "../middleware/auth.js";
import Todo from "../models/todo.model.js";
import express from "express";
const todoRoute = express.Router()


// post todos
todoRoute.post("/",auth ,async (req, res) => {
  try {
    const todo = await Todo.create({...req.body,user: req.user._id});
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// check all todos
todoRoute.get("/", auth, getTodo);
// check single todo
todoRoute.get("/:id",  auth,async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update todo
todoRoute.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const updateTodo = await Todo.findById(id);
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delet todo
todoRoute.delete("/:id",  auth,async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo was deleted!" })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default todoRoute