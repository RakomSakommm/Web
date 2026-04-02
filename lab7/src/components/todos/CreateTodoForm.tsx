import { useState } from 'react';

interface CreateTodoFormProps {
  onCreate: (title: string, completed: boolean) => Promise<void>;
}

export const CreateTodoForm = ({ onCreate }: CreateTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate(title, completed);
    setTitle('');
    setCompleted(false);
  };

  return (
    <div className="card">
      <h3>➕ Создать задачу (POST)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Выполнено
        </label>
        <button type="submit" className="btn btn-success">Создать</button>
      </form>
    </div>
  );
};