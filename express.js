// Import required libraries

const express = require('express');
const mongoose = require('mongoose');

// Set up Express
const app = express();
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a todo item schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

// Create a Mongoose model
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
  // Fetch all todos from the database
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  // Create a new todo item
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });

  // Save the todo item to the database
  await newTodo.save();
  res.json(newTodo);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//testtest
//thank you einat
