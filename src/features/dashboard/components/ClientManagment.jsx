// src/components/admin/ClientManagement.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


const ClientManagement = () => {
  const [clients] = useLocalStorage('clientes', {});
  const [session] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();

  const [newClient, setNewClient] = useState({
    nombre: '',
    documento: '',
    direccion: '',
    telefono: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newClient.nombre || !newClient.documento) {
      alert('Nombre y documento son campos requeridos');
      return;
    }

    const existingClient = Object.values(clients).find(
      c => c.documento === newClient.documento
    );

    if (existingClient) {
      alert('Ya existe un cliente con este documento');
      return;
    }

    const client = {
      ...newClient,
      id: Date.now().toString()
    };

    localStorage.setItem('clientes', JSON.stringify({
      ...clients,
      [client.id]: client
    }));

    setNewClient({ nombre: '', documento: '', direccion: '', telefono: '' });
    alert('Cliente registrado exitosamente');
  };

  const deleteClient = (clientId) => {
    const confirmed = window.confirm('¿Está seguro de eliminar este cliente?');
    if (confirmed) {
      const updatedClients = {...clients};
      delete updatedClients[clientId];
      localStorage.setItem('clientes', JSON.stringify(updatedClients));
    }
  };

  return (
    <div className="client-management">
      <h1>Gestión de Clientes</h1>
      
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={newClient.nombre}
            onChange={(e) => setNewClient({...newClient, nombre: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="documento">Documento:</label>
          <input
            type="text"
            id="documento"
            value={newClient.documento}
            onChange={(e) => setNewClient({...newClient, documento: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={newClient.direccion}
            onChange={(e) => setNewClient({...newClient, direccion: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={newClient.telefono}
            onChange={(e) => setNewClient({...newClient, telefono: e.target.value})}
          />
        </div>

        <button type="submit" className="submit-button">
          Registrar Cliente
        </button>
      </form>

      <div className="clients-list">
        <h2>Lista de Clientes</h2>
        <div className="clients-grid">
          {Object.values(clients).map(client => (
            <div key={client.id} className="client-card">
              <h3>{client.nombre}</h3>
              <p>Documento: {client.documento}</p>
              <p>Dirección: {client.direccion}</p>
              <p>Teléfono: {client.telefono}</p>
              <button onClick={() => deleteClient(client.id)} className="delete-button">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;