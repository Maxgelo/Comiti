// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [users] = useLocalStorage('usuarios', {});
  const [session, setSession] = useLocalStorage('sesionActiva', null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = users[formData.email];
    
    if (!user) {
      setError('Usuario no encontrado');
      return;
    }

    if (user.password !== formData.password) {
      setError('Contraseña incorrecta');
      return;
    }

  };

  return (
      <div className="container auth-wrap">
        <div className="row justify-content-center">
    <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4">
              <h2 className="mb-3">Iniciar Sesión</h2>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <div className="field-input">
                    <span className="input-icon">@</span>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Contraseña</label>
                  <div className="field-input">
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Tu contraseña"
                      required
                    />
                  </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Iniciar Sesión
                  </button>
                </div>

                <p className="register-link text-center mt-3">
                  ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;