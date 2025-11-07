// src/components/client/Dashboard.jsx
import React from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


const ClientDashboard = () => {
  const [session] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sesionActiva');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenido, {session?.nombre}</h1>
        <nav className="dashboard-nav">
          <button onClick={() => navigate('/productos')}>Productos</button>
          <button onClick={() => navigate('/carrito')}>Carrito</button>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>
      
      <main className="dashboard-content">
        <section className="welcome-message">
          <h2>¿Qué deseas hacer hoy?</h2>
          <p>Explora nuestros productos o revisa tu carrito de compras.</p>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;