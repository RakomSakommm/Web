import { useState } from 'react';

interface UpdateTodoFormProps {
  onUpdate: (id: number, title: string, completed: boolean) => Promise<void>;
}

export const UpdateTodoForm = ({ onUpdate }: UpdateTodoFormProps) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title.trim()) return;
    await onUpdate(Number(id), title, completed);
    setId('');
    setTitle('');
    setCompleted(false);
  };

  return (
    <div className="card">
      <h3>✏️ Обновить задачу (PUT)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID задачи"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Новое название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Выполнено
        </label>
        <button type="submit" className="btn btn-warning">Обновить</button>
      </form>
    </div>
  );
};