//import required libraries
const express = require('express');
const { push_todo, connect_DB, close_DB, model } = require('./models');

//set up Express
const app = express();
//serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());
//routes
app.get('/todos', async (req, res) => {
  //fetch all todos from the database
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  //create a new todo item
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
  });

  //save the todo item to the database
  await newTodo.save();
  res.json(newTodo);
});

//define to express to use pug
app.set('view engine', 'pug');

//html page route
app.get('/', async (req, res) => {
  try {
    await push_todo();
    console.log("app.get works.");
    //save all objects from bd under variable
    await connect_DB();
    const todos = await model.find();
    res.render('table', { todos });
  }
  catch (err) {
    console.log('Error in app.get:', err);
  }
  finally {
    await close_DB();
  }
});

//start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
  //push_todo();
});



