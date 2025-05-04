import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import React from 'react'; // Add this import

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}