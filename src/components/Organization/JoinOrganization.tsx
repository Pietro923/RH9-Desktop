// src/components/Organization/JoinOrganization.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinOrganization = () => {
  const [organizationCode, setOrganizationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulación de organizaciones disponibles
  const availableOrgs = [
    { id: 'org-1', name: 'Empresa Ejemplo 1', industry: 'Tecnología' },
    { id: 'org-2', name: 'Empresa Ejemplo 2', industry: 'Salud' },
    { id: 'org-3', name: 'Empresa Ejemplo 3', industry: 'Educación' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulación de unirse a una organización con código
      console.log('Uniendo a organización con código:', organizationCode);
      
      // En una implementación real, verificaríamos el código contra una base de datos
      // Por ahora simulamos una organización encontrada
      const foundOrg = availableOrgs.find(org => org.id === organizationCode);
      
      if (foundOrg) {
        const user = JSON.parse(localStorage.getItem('authUser') || '{}');
        localStorage.setItem('userOrganization', JSON.stringify({
          organizationId: foundOrg.id,
          userEmail: user.email,
          joinDate: new Date().toISOString()
        }));
        navigate('/dashboard');
      } else {
        setError('Código de organización no válido.');
      }
    } catch (err) {
      setError('Error al unirse a la organización.');
      console.error(err);
    }
  };

  const handleSelectOrg = (orgId: string) => {
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    localStorage.setItem('userOrganization', JSON.stringify({
      organizationId: orgId,
      userEmail: user.email,
      joinDate: new Date().toISOString()
    }));
    navigate('/dashboard');
  };

  return (
    <div className="organization-container">
      <h2>Unirse a una Organización</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organizationCode">Código de la Organización</label>
          <input
            type="text"
            id="organizationCode"
            value={organizationCode}
            onChange={(e) => setOrganizationCode(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="primary-button">Unirse con Código</button>
      </form>
      
      <div className="available-organizations">
        <h3>Organizaciones Disponibles</h3>
        <p>O selecciona una organización de la lista:</p>
        
        <div className="organization-list">
          {availableOrgs.map(org => (
            <div key={org.id} className="organization-card" onClick={() => handleSelectOrg(org.id)}>
              <h4>{org.name}</h4>
              <p>Industria: {org.industry}</p>
              <button>Unirse</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};