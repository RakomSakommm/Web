import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => (
  <>
    <Header />
    <main className="container main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);