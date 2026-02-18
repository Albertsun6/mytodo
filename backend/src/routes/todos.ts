import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from '../controllers/todoController.js';

const router = Router();

// GET /api/todos - Get all todos
router.get('/', getAllTodos);

// GET /api/todos/:id - Get single todo
router.get('/:id', getTodoById);

// POST /api/todos - Create new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', updateTodo);

// PATCH /api/todos/:id/toggle - Toggle todo completion
router.patch('/:id/toggle', toggleTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', deleteTodo);

export default router;
