import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import PublicationsPage from './pages/PublicationsPage';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl text-white">404 - Page Not Found</h1>
  </div>
);

export default App;