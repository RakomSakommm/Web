import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { TodosPage } from './pages/TodosPage';
import { UsersPage } from './pages/UsersPage';
import { WeatherPage } from './pages/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/todos" replace />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;