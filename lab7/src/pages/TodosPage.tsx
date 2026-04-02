    import { useEffect } from 'react';
import { useTodosStore } from '../store/todosStore';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ResultBox } from '../components/common/ResultBox';
import { TodosList } from '../components/todos/TodosList';
import { CreateTodoForm } from '../components/todos/CreateTodoForm';
import { UpdateTodoForm } from '../components/todos/UpdateTodoForm';

export const TodosPage = () => {
  const {
    todos,
    loading,
    error,
    resultMessage,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodosStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="panel active-panel">
      <div className="panel-header">
        <h2>✅ Управление задачами</h2>
        <p>JSONPlaceholder API — GET, POST, PUT, DELETE</p>
      </div>

      <div className="panel-controls">
        <button onClick={fetchTodos} className="btn btn-primary">
          📋 Загрузить задачи
        </button>
      </div>

      <div className="two-columns">
        <CreateTodoForm onCreate={createTodo} />
        <UpdateTodoForm onUpdate={updateTodo} />
      </div>

      <div className="result-area">
        <ResultBox message={resultMessage} />
        <TodosList todos={todos} />
      </div>
    </section>
  );
};