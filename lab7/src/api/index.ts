import { Todo, User, WeatherResponse, City } from '../types';

const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const todoApi = {
  getAll: async (limit: number = 3): Promise<Todo[]> => {
    const response = await fetch(`${TODOS_API}?_limit=${limit}`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки задач');
    }
    return response.json();
  },

  create: async (title: string, completed: boolean): Promise<Todo> => {
    const response = await fetch(TODOS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed, userId: 1 }),
    });
    if (!response.ok) {
      throw new Error('Ошибка создания задачи');
    }
    return response.json();
  },

  update: async (id: number, title: string, completed: boolean): Promise<Todo> => {
    const response = await fetch(`${TODOS_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, completed, userId: 1 }),
    });
    if (!response.ok) {
      throw new Error('Ошибка обновления задачи');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${TODOS_API}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка удаления задачи');
    }
  },
};

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(USERS_API);
    if (!response.ok) {
      throw new Error('Ошибка загрузки пользователей');
    }
    return response.json();
  },

  create: async (name: string, email: string, phone: string): Promise<User> => {
    const response = await fetch(USERS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone }),
    });
    if (!response.ok) {
      throw new Error('Ошибка создания пользователя');
    }
    return response.json();
  },

  update: async (id: number, name: string, email: string): Promise<User> => {
    const response = await fetch(`${USERS_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email }),
    });
    if (!response.ok) {
      throw new Error('Ошибка обновления пользователя');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${USERS_API}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка удаления пользователя');
    }
  },
};

export const weatherApi = {
  getByCity: async (city: City): Promise<WeatherResponse> => {
    const url = `${WEATHER_API}?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка загрузки погоды');
    }
    return response.json();
  },
};