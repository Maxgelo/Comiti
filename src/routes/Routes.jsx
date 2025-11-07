// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from '../features/auth/hooks/useLocalStorage';

// Componentes de autenticación
import Login from '../features/auth/components/login';
import Register from '../features/auth/components/register';

// Componentes de administrador
import AdminDashboard from '../features/dashboard/components/AdminDashboard';
import ProductManagement from '../features/dashboard/components/ProductMagnament';
import ClientManagement from '../features/dashboard/components/ClientManagment';
import Pedidos from '../features/dashboard/components/Pedidos';

// Componentes de cliente
import ClientDashboard from '../features/dashboard/components/ClientDashboard';
import ProductList from '../features/dashboard/components/ProductList';
import Cart from '../features/dashboard/components/Cart';

const RoutesModule = () => {
  const [session] = useLocalStorage('sesionActiva', null);

  // Verifica si el usuario está autenticado
  const PrivateRoute = ({ children }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Verifica si el usuario es administrador
  const AdminRoute = ({ children }) => {
    if (!session || session.tipo !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    
    <Routes>
    {/* Rutas públicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Rutas privadas */}
    <Route path="/" element={
        <PrivateRoute>
        <ClientDashboard />
        </PrivateRoute>
    } />
    <Route path="/productos" element={
        <PrivateRoute>
        <ProductList />
        </PrivateRoute>
    } />
    <Route path="/carrito" element={
        <PrivateRoute>
        <Cart />
        </PrivateRoute>
    } />

    {/* Rutas de administrador */}
    <Route path="/admin" element={
        <AdminRoute>
        <AdminDashboard />
        </AdminRoute>
    } />
    <Route path="/admin/productos" element={
        <AdminRoute>
        <ProductManagement />
        </AdminRoute>
    } />
    <Route path="/admin/clientes" element={
        <AdminRoute>
        <ClientManagement />
        </AdminRoute>
    } />
    <Route path="/admin/pedidos" element={
        <AdminRoute>
        <Pedidos />
        </AdminRoute>
    } />

    {/* Ruta por defecto */}
    <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
};

export default RoutesModule;