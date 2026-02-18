import { useState } from 'react';
import { CreateTodoInput } from '../types/todo';

interface AddTodoProps {
  onAdd: (input: CreateTodoInput) => Promise<void>;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('请输入待办事项标题');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-smooth">
        <div className="p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="添加新的待办事项..."
            className="w-full text-lg font-medium text-gray-800 placeholder-gray-400 border-none focus:ring-0 bg-transparent"
            disabled={isSubmitting}
          />
          
          {isExpanded && (
            <div className="mt-3 animate-fade-in">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="添加描述（可选）..."
                rows={3}
                className="w-full text-gray-600 placeholder-gray-400 border border-gray-200 rounded-lg p-3 resize-none focus:border-purple-400"
                disabled={isSubmitting}
              />
            </div>
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
          )}
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4 flex justify-end gap-2 animate-fade-in">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setTitle('');
                setDescription('');
                setError(null);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-smooth"
              disabled={isSubmitting}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg 
                       hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed 
                       transition-smooth shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  添加中...
                </span>
              ) : (
                '添加'
              )}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
