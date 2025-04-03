// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { RoleSelection } from './components/Auth/RoleSelection';
import { CreateOrganization } from './components/Organization/CreateOrganization';
import { JoinOrganization } from './components/Organization/JoinOrganization';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PrivateRoute } from './components/common/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={
            <PrivateRoute>
              <RoleSelection />
            </PrivateRoute>
          } />
          <Route path="/create-organization" element={
            <PrivateRoute requiredRole="employer">
              <CreateOrganization />
            </PrivateRoute>
          } />
          <Route path="/join-organization" element={
            <PrivateRoute requiredRole="employee">
              <JoinOrganization />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
