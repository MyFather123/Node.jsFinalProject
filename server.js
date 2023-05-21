// Import required libraries
const express = require('express');
const fs = require('fs');
const { push_todo, export_data_to_json } = require('./models');

// Set up Express
const app = express();
app.use(express.json());
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
  
// HTML page route
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
    push_todo();
    export_data_to_json();
  });



