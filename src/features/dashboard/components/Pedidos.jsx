// src/components/admin/OrderManagement.jsx
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


const Pedidos = () => {
  const [orders] = useLocalStorage('pedidos', []);
  const [products] = useLocalStorage('productos', {});
  const [session] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    estado: 'todos',
    fechaDesde: '',
    fechaHasta: ''
  });

  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchesEstado = filter.estado === 'todos' || order.estado === filter.estado;
      const fechaDesde = filter.fechaDesde ? new Date(filter.fechaDesde) : null;
      const fechaHasta = filter.fechaHasta ? new Date(filter.fechaHasta) : null;
      const orderDate = new Date(order.fecha);

      const matchesFecha = !fechaDesde || orderDate >= fechaDesde;
      const matchesFechaHasta = !fechaHasta || orderDate <= fechaHasta;

      return matchesEstado && matchesFecha && matchesFechaHasta;
    });

    setFilteredOrders(filtered);
  }, [orders, filter]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? {...order, estado: newStatus} : order
    );
    localStorage.setItem('pedidos', JSON.stringify(updatedOrders));
  };

  const getOrderDetails = (order) => {
    const total = order.productos.reduce((sum, item) => {
      const product = products[item.productoId];
      return sum + (product.precio * item.cantidad);
    }, 0);

    return (
      <div className="order-details">
        <h3>Detalles del Pedido #{order.id}</h3>
        <p>Fecha: {new Date(order.fecha).toLocaleDateString()}</p>
        <p>Estado: {order.estado}</p>
        <p>Total: ${total}</p>
        
        <div className="order-items">
          {order.productos.map(item => {
            const product = products[item.productoId];
            return (
              <div key={item.productoId} className="order-item">
                <p>{product.nombre}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${product.precio}</p>
              </div>
            );
          })}
        </div>

        {order.estado === 'pendiente' && (
          <div className="status-actions">
            <button onClick={() => updateOrderStatus(order.id, 'procesando')}>
              Marcar como Procesando
            </button>
            <button onClick={() => updateOrderStatus(order.id, 'cancelado')}>
              Marcar como Cancelado
            </button>
          </div>
        )}

        {order.estado === 'procesando' && (
          <div className="status-actions">
            <button onClick={() => updateOrderStatus(order.id, 'enviado')}>
              Marcar como Enviado
            </button>
            <button onClick={() => updateOrderStatus(order.id, 'cancelado')}>
              Marcar como Cancelado
            </button>
          </div>
        )}

        {order.estado === 'enviado' && (
          <div className="status-actions">
            <button onClick={() => updateOrderStatus(order.id, 'entregado')}>
              Marcar como Entregado
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="order-management">
      <h1>Gestión de Pedidos</h1>
      
      <div className="filters">
        <select 
          value={filter.estado}
          onChange={(e) => setFilter({...filter, estado: e.target.value})}
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <input
          type="date"
          value={filter.fechaDesde}
          onChange={(e) => setFilter({...filter, fechaDesde: e.target.value})}
          placeholder="Fecha desde"
        />

        <input
          type="date"
          value={filter.fechaHasta}
          onChange={(e) => setFilter({...filter, fechaHasta: e.target.value})}
          placeholder="Fecha hasta"
        />
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            {getOrderDetails(order)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedidos;