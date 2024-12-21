import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/auth/Login/Login';
import Layout from './components/layout/Layout/Layout';
import Empleados from './pages/empleados/Empleados';
import Solicitudes from './pages/solicitudes/Solicitudes';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/empleados" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/empleados"
            element={
              <PrivateRoute>
                <Layout>
                  <Empleados />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/solicitudes"
            element={
              <PrivateRoute>
                <Layout>
                  <Solicitudes />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;