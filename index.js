const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


let todos = [];
let idCounter = 1;


app.get('/todos', (req, res) => {
  res.json(todos);
});


app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// CREATE todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: idCounter++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (title) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully' });
});


app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo API is running 🚀',
    endpoints: {
      getAll: 'GET /todos',
      getOne: 'GET /todos/:id',
      create: 'POST /todos',
      update: 'PUT /todos/:id',
      delete: 'DELETE /todos/:id'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});