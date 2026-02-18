import { Todo, CreateTodoInput, UpdateTodoInput, ApiResponse } from '../types/todo';

const API_BASE_URL = '/api/todos';

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse<Todo[]>(response);
  return result.data || [];
}

export async function getTodoById(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  const result = await handleResponse<Todo>(response);
  return result.data!;
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const result = await handleResponse<Todo>(response);
  return result.data!;
}

export async function updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const result = await handleResponse<Todo>(response);
  return result.data!;
}

export async function toggleTodo(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  const result = await handleResponse<Todo>(response);
  return result.data!;
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(response);
}
