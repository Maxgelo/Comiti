// src/components/admin/Dashboard.jsx
import React from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [session] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sesionActiva');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <nav className="admin-nav">
          <button onClick={() => navigate('/admin/productos')}>Productos</button>
          <button onClick={() => navigate('/admin/clientes')}>Clientes</button>
          <button onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>

      <main className="admin-content">
        <section className="welcome-message">
          <h2>Bienvenido, Administrador</h2>
          <p>Gestiona tu tienda desde aquí:</p>
          <ul>
            <li>Administra productos y stock</li>
            <li>Visualiza y gestiona clientes</li>
            <li>Monitorea y gestiona pedidos</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;