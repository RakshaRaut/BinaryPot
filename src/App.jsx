import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import LoginPage from './pages/LoginPage';
import PortalPage from './pages/PortalPage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import SessionsPage from './pages/SessionsPage';
import ResearchPage from './pages/ResearchPage';
import DocsPage from './pages/DocsPage';
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<PortalPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="docs" element={<DocsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
