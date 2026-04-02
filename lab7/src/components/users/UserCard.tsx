import { User } from '../../types';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => (
  <div className="user-card">
    <div className="user-name">👤 {user.name}</div>
    <div className="user-info">📧 {user.email}</div>
    <div className="user-info">📱 {user.phone}</div>
    <div className="user-info">🏢 {user.company?.name || '—'}</div>
    <div className="user-info">📍 {user.address?.city || '—'}</div>
    <div className="user-id">ID: {user.id}</div>
  </div>
);