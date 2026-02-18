import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { todoStore, Todo } from '../models/Todo.js';
import { validateCreateTodo, validateUpdateTodo } from '../utils/validation.js';
import { createApiError } from '../middleware/errorHandler.js';

// Get all todos
export function getAllTodos(_req: Request, res: Response): void {
  const todos = todoStore.getAll();
  res.json({
    success: true,
    data: todos,
    count: todos.length,
  });
}

// Get single todo by ID
export function getTodoById(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  const todo = todoStore.getById(id);

  if (!todo) {
    return next(createApiError('Todo not found', 404));
  }

  res.json({
    success: true,
    data: todo,
  });
}

// Create new todo
export function createTodo(req: Request, res: Response, next: NextFunction): void {
  const validation = validateCreateTodo(req.body);

  if (!validation.isValid) {
    return next(createApiError('Validation failed', 400, validation.errors));
  }

  const newTodo: Todo = {
    id: uuidv4(),
    title: validation.data!.title,
    description: validation.data!.description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const created = todoStore.create(newTodo);

  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: created,
  });
}

// Update todo
export function updateTodo(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  // Check if todo exists
  const existing = todoStore.getById(id);
  if (!existing) {
    return next(createApiError('Todo not found', 404));
  }

  const validation = validateUpdateTodo(req.body);

  if (!validation.isValid) {
    return next(createApiError('Validation failed', 400, validation.errors));
  }

  const updated = todoStore.update(id, validation.data!);

  res.json({
    success: true,
    message: 'Todo updated successfully',
    data: updated,
  });
}

// Delete todo
export function deleteTodo(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  // Check if todo exists
  const existing = todoStore.getById(id);
  if (!existing) {
    return next(createApiError('Todo not found', 404));
  }

  todoStore.delete(id);

  res.json({
    success: true,
    message: 'Todo deleted successfully',
  });
}

// Toggle todo completion status
export function toggleTodo(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  const existing = todoStore.getById(id);
  if (!existing) {
    return next(createApiError('Todo not found', 404));
  }

  const updated = todoStore.update(id, { completed: !existing.completed });

  res.json({
    success: true,
    message: `Todo marked as ${updated!.completed ? 'completed' : 'incomplete'}`,
    data: updated,
  });
}
