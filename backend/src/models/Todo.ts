export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// In-memory storage for todos
class TodoStore {
  private todos: Map<string, Todo> = new Map();

  getAll(): Todo[] {
    return Array.from(this.todos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  create(todo: Todo): Todo {
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: string, updates: Partial<Todo>): Todo | undefined {
    const existing = this.todos.get(id);
    if (!existing) return undefined;

    const updated: Todo = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.todos.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }
}

export const todoStore = new TodoStore();
