import { create } from 'zustand';
import { Todo } from '../types';
import { todoApi } from '../api';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  resultMessage: string | null;
  fetchTodos: () => Promise<void>;
  createTodo: (title: string, completed: boolean) => Promise<void>;
  updateTodo: (id: number, title: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setResultMessage: (message: string | null) => void;
}

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  resultMessage: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await todoApi.getAll(3);
      set({ todos, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  createTodo: async (title: string, completed: boolean) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await todoApi.create(title, completed);
      const { todos } = get();
      set({
        todos: [newTodo, ...todos],
        loading: false,
        resultMessage: `✅ POST успешен! Создана задача "${title}" (ID: ${newTodo.id})`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  updateTodo: async (id: number, title: string, completed: boolean) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await todoApi.update(id, title, completed);
      const { todos } = get();
      set({
        todos: todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        loading: false,
        resultMessage: `✅ PUT успешен! Задача #${id} обновлена`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  deleteTodo: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await todoApi.delete(id);
      const { todos } = get();
      set({
        todos: todos.filter((todo) => todo.id !== id),
        loading: false,
        resultMessage: `✅ DELETE успешен! Задача #${id} удалена`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  setResultMessage: (message: string | null) => set({ resultMessage: message }),
}));