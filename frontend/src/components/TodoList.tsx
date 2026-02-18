import { Todo, UpdateTodoInput } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, input: UpdateTodoInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoList({ todos, isLoading, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white font-medium">加载中...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">暂无待办事项</h3>
        <p className="text-white/80">点击上方输入框添加你的第一个待办事项</p>
      </div>
    );
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="space-y-4">
      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            待完成 ({activeTodos.length})
          </h2>
          <div className="space-y-3">
            {activeTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            已完成 ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
