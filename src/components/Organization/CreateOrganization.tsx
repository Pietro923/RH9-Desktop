// src/components/Organization/CreateOrganization.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateOrganization = () => {
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aquí implementaremos la lógica para crear organización más adelante
      console.log('Creando organización:', { orgName, industry, description });
      
      // Simulación de creación exitosa
      const user = JSON.parse(localStorage.getItem('authUser') || '{}');
      const organization = {
        id: 'org-' + Date.now(),
        name: orgName,
        industry,
        description,
        owner: user.email
      };
      
      localStorage.setItem('organization', JSON.stringify(organization));
      navigate('/dashboard');
    } catch (err) {
      setError('Error al crear la organización.');
      console.error(err);
    }
  };

  return (
    <div className="organization-container">
      <h2>Crear Nueva Organización</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orgName">Nombre de la Organización</label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="industry">Industria</label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          >
            <option value="">Seleccionar industria</option>
            <option value="technology">Tecnología</option>
            <option value="healthcare">Salud</option>
            <option value="education">Educación</option>
            <option value="finance">Finanzas</option>
            <option value="retail">Comercio</option>
            <option value="manufacturing">Manufactura</option>
            <option value="other">Otra</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        
        <button type="submit" className="primary-button">Crear Organización</button>
      </form>
    </div>
  );
};