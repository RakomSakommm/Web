import { User } from '../../types';
import { UserCard } from './UserCard';

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  if (users.length === 0) {
    return <div className="empty-state">👤 Нет пользователей для отображения</div>;
  }

  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};