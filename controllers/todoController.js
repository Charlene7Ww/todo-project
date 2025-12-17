import Todo from "../models/todo.model.js";

const getTodo = async (req,res) => {
    try {
    
    const todo = await Todo.find({user: req.user._id});
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default getTodo