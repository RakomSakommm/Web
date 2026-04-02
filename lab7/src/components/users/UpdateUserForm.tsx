import { useState } from 'react';

interface UpdateUserFormProps {
  onUpdate: (id: number, name: string, email: string) => Promise<void>;
}

export const UpdateUserForm = ({ onUpdate }: UpdateUserFormProps) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name.trim()) return;
    await onUpdate(Number(id), name, email);
    setId('');
    setName('');
    setEmail('');
  };

  return (
    <div className="card">
      <h3>✏️ Обновить пользователя (PUT)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID пользователя"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Новое имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Новый email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-warning">Обновить</button>
      </form>
    </div>
  );
};