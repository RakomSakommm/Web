import { useState } from 'react';

interface CreateUserFormProps {
  onCreate: (name: string, email: string, phone: string) => Promise<void>;
}

export const CreateUserForm = ({ onCreate }: CreateUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await onCreate(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="card">
      <h3>➕ Создать пользователя (POST)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Создать</button>
      </form>
    </div>
  );
};