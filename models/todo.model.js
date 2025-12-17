import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "enter todo task"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    //   required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
