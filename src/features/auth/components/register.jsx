import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [users, setUsers] = useLocalStorage('usuarios', {});
  const [session, setSession] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'cliente'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (users[formData.email]) {
      alert('Este correo ya está registrado');
      return;
    }

    const newUser = {
      ...formData,
      id: Date.now().toString()
    };

    setUsers(prev => ({
      ...prev,
      [formData.email]: newUser
    }));

    // Iniciar sesión automáticamente después del registro
    setSession(newUser);
    navigate('/');
  };

  return (
    <div className="container auth-wrap">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4">
            <h3 className="mb-3">Crear cuenta</h3>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input 
                  type="text"
                  className="form-control"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Crear contraseña"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo de cuenta</label>
                <select 
                  className="form-select"
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
