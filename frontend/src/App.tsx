import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from './types/todo';
import * as todoApi from './api/todoApi';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取待办事项失败');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (input: CreateTodoInput) => {
    const newTodo = await todoApi.createTodo(input);
    setTodos(prev => [newTodo, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const updatedTodo = await todoApi.toggleTodo(id);
    setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
  };

  const handleUpdate = async (id: string, input: UpdateTodoInput) => {
    const updatedTodo = await todoApi.updateTodo(id, input);
    setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
  };

  const handleDelete = async (id: string) => {
    await todoApi.deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MyTodo</h1>
          <p className="text-white/80">简洁高效的待办事项管理</p>
          
          {totalTodos > 0 && (
            <div className="mt-4 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-white/90 text-sm">
                <span className="font-semibold">{completedTodos}</span> / {totalTodos} 已完成
              </span>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-200">{error}</p>
              <button 
                onClick={fetchTodos}
                className="ml-auto text-red-200 hover:text-white transition-colors"
              >
                重试
              </button>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <AddTodo onAdd={handleAdd} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            使用 React + TypeScript + Tailwind CSS 构建
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
