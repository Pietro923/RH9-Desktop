// src/components/common/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  // Verificar si el usuario está autenticado
  const authUser = localStorage.getItem('authUser');
  const user = authUser ? JSON.parse(authUser) : null;
  
  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Si se requiere un rol específico y el usuario no lo tiene, redirigir
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/role-selection" replace />;
  }
  
  // Si todo está bien, mostrar los componentes hijos
  return <>{children}</>;
};