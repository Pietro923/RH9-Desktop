// src/components/Dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [organization, setOrganization] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Cargar datos del usuario
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
    
    // Cargar datos de la organización según el rol
    const userData = authUser ? JSON.parse(authUser) : {};
    
    if (userData.role === 'employer') {
      const org = localStorage.getItem('organization');
      if (org) {
        setOrganization(JSON.parse(org));
      }
    } else {
      const userOrg = localStorage.getItem('userOrganization');
      if (userOrg) {
        // En una implementación real, cargaríamos los datos de la organización desde una API
        const orgId = JSON.parse(userOrg).organizationId;
        // Simulación de datos de organización
        setOrganization({
          id: orgId,
          name: `Organización ${orgId.split('-')[1]}`, 
          industry: 'Simulada'
        });
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('organization');
    localStorage.removeItem('userOrganization');
    navigate('/login');
  };
  
  if (!user) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de RRHH</h1>
        <div className="user-info">
          <span>{user.name || user.email}</span>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Bienvenido, {user.name || user.email}!</h2>
          {organization && (
            <p>Organización: {organization.name}</p>
          )}
        </div>
        
        {user.role === 'employer' ? (
          <div className="employer-dashboard">
            <h3>Panel de Empleador</h3>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h4>Empleados</h4>
                <p>Gestiona tus empleados</p>
              </div>
              <div className="dashboard-card">
                <h4>Departamentos</h4>
                <p>Organiza tu estructura</p>
              </div>
              <div className="dashboard-card">
                <h4>Reportes</h4>
                <p>Visualiza estadísticas</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="employee-dashboard">
            <h3>Panel de Empleado</h3>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h4>Mi Perfil</h4>
                <p>Actualiza tus datos</p>
              </div>
              <div className="dashboard-card">
                <h4>Solicitudes</h4>
                <p>Gestiona tus solicitudes</p>
              </div>
              <div className="dashboard-card">
                <h4>Documentos</h4>
                <p>Accede a tus documentos</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};