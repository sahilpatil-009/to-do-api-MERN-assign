const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ConnectDb = require("./dbconnect/dbConnect");
const cors = require("cors");
const todo = require("./modes/todolist");

dotenv.config({});
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
ConnectDb();

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});

// get all tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await todo.find();
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res
        .status(404)
        .json({ success: false, message: "No task found ! Add tasks" });
    }
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

// add new Task
app.post("/", async (req, res) => {
  const { task, status } = req.body;
  try {
    if (!task) {
      return res
        .status(400)
        .json({ success: true, message: "All fields Required" });
    }

    const newTask = new todo({
      task,
      status: status || false,
    });

    await newTask.save();
    res.status(200).json({ success: true, message: "New Task added", id: newTask._id });
  } catch (error) {
    console.log(error);
  }
});


// delete Task
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await todo.findById(id);
    if(!task){
        return res.status(404).json({success:false, message:'Task Not Found'})
    }else{
        await todo.deleteOne({_id:id});
        res.status(200).json({success:true, message:"Task deleted"});
    }
  } catch (error) {
    console.log(error)
  }
});


