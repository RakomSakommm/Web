import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="site-header">
    <div className="container header-inner">
      <div className="logo">🌐API</div>
      <nav className="main-nav">
        <Link to="/todos" className="nav-link">✅ Задачи</Link>
        <Link to="/users" className="nav-link">👥 Пользователи</Link>
        <Link to="/weather" className="nav-link">🌤️ Погода</Link>
      </nav>
    </div>
  </header>
);