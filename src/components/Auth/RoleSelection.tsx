// src/components/Auth/RoleSelection.tsx
import { useNavigate } from 'react-router-dom';

export const RoleSelection = () => {
  const navigate = useNavigate();

  const selectRole = (role: string) => {
    // Guardar el rol seleccionado
    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    localStorage.setItem('authUser', JSON.stringify({ ...user, role }));
    
    // Redirigir según el rol
    if (role === 'employer') {
      navigate('/create-organization');
    } else {
      navigate('/join-organization');
    }
  };

  return (
    <div className="role-selection-container">
      <h2>Selecciona tu rol</h2>
      <p>Elige cómo deseas utilizar nuestra plataforma de Recursos Humanos</p>
      
      <div className="role-options">
        <div className="role-card" onClick={() => selectRole('employee')}>
          <h3>Empleado</h3>
          <p>Únete a una organización existente y gestiona tus datos laborales</p>
          <button>Seleccionar</button>
        </div>
        
        <div className="role-card" onClick={() => selectRole('employer')}>
          <h3>Empleador</h3>
          <p>Crea y administra tu organización y gestiona a tus empleados</p>
          <button>Seleccionar</button>
        </div>
      </div>
    </div>
  );
};