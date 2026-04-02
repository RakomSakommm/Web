import { create } from 'zustand';
import { User } from '../types';
import { userApi } from '../api';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  resultMessage: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (name: string, email: string, phone: string) => Promise<void>;
  updateUser: (id: number, name: string, email: string) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setResultMessage: (message: string | null) => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  resultMessage: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await userApi.getAll();
      set({ users, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  createUser: async (name: string, email: string, phone: string) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userApi.create(name, email, phone);
      const { users } = get();
      set({
        users: [newUser, ...users],
        loading: false,
        resultMessage: `✅ POST успешен! Создан пользователь "${name}" (ID: ${newUser.id})`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  updateUser: async (id: number, name: string, email: string) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userApi.update(id, name, email);
      const { users } = get();
      set({
        users: users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
        resultMessage: `✅ PUT успешен! Пользователь #${id} обновлён`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await userApi.delete(id);
      const { users } = get();
      set({
        users: users.filter((user) => user.id !== id),
        loading: false,
        resultMessage: `✅ DELETE успешен! Пользователь #${id} удалён`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  setResultMessage: (message: string | null) => set({ resultMessage: message }),
}));