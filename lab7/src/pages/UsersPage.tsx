import { useEffect } from 'react';
import { useUsersStore } from '../store/usersStore';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ResultBox } from '../components/common/ResultBox';
import { UsersList } from '../components/users/UsersList';
import { CreateUserForm } from '../components/users/CreateUserForm';
import { UpdateUserForm } from '../components/users/UpdateUserForm';

export const UsersPage = () => {
  const {
    users,
    loading,
    error,
    resultMessage,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="panel active-panel">
      <div className="panel-header">
        <h2>👥 Управление пользователями</h2>
        <p>JSONPlaceholder API — GET, POST, PUT, DELETE</p>
      </div>

      <div className="panel-controls">
        <button onClick={fetchUsers} className="btn btn-primary">
          👥 Загрузить пользователей
        </button>
      </div>

      <div className="two-columns">
        <CreateUserForm onCreate={createUser} />
        <UpdateUserForm onUpdate={updateUser} />
      </div>

      <div className="result-area">
        <ResultBox message={resultMessage} />
        <UsersList users={users} />
      </div>
    </section>
  );
};