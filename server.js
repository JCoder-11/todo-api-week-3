const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// In-memory storage
let todos = [];
let idCounter = 1;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running 🚀' });
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

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

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});