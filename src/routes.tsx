import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AuthPage from './pages/Auth/AuthPage';
import ProtectedRoute from './components/shared/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/auth/:mode" element={<AuthPage />} />
    </Routes>
  );
}