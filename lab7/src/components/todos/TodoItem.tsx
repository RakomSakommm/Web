import { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => (
  <div className="todo-item">
    <div className={`todo-status ${todo.completed ? 'completed' : 'pending'}`}>
      {todo.completed ? '✅' : '⭕'}
    </div>
    <div className={`todo-title ${todo.completed ? 'completed-text' : ''}`}>
      {todo.title}
    </div>
    <div className="todo-id">ID: {todo.id}</div>
  </div>
);