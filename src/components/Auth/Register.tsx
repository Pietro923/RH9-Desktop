// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Aquí implementaremos la lógica de registro más adelante
      console.log('Registrando usuario:', { name, email, role });
      
      // Simulación de registro exitoso
      localStorage.setItem('authUser', JSON.stringify({ name, email, role }));
      
      // Redirigir según el rol seleccionado
      if (role === 'employer') {
        navigate('/create-organization');
      } else {
        navigate('/join-organization');
      }
    } catch (err) {
      setError('Error al registrar usuario.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Rol</label>
          <div className="role-selection">
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="employee"
                checked={role === 'employee'}
                onChange={() => setRole('employee')}
                required
              />
              <span>Empleado</span>
            </label>
            
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={role === 'employer'}
                onChange={() => setRole('employer')}
              />
              <span>Empleador</span>
            </label>
          </div>
        </div>
        
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
      
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};