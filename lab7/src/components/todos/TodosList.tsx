import { Todo } from '../../types';
import { TodoItem } from './TodoItem';

interface TodosListProps {
  todos: Todo[];
}

export const TodosList = ({ todos }: TodosListProps) => {
  if (todos.length === 0) {
    return <div className="empty-state">✨ Нет задач для отображения</div>;
  }

  return (
    <div className="todos-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};