import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  const localUser = localStorage.getItem('user');

  // Si no hay usuario en el contexto ni en el almacenamiento local, bloquea el acceso
  if (!user && !localUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};