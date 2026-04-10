import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Domains from './pages/Domains';
import ProblemList from './pages/ProblemList';
import ProblemEditor from './pages/ProblemEditor';
import CourseDetail from './pages/CourseDetail';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <LanguageProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)' }}>
          {isAuthenticated && <Navbar />}
          <div className="app-container" style={{ flex: 1, overflow: 'hidden' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={isAuthenticated ? <Domains /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/domains/:domainId" 
                element={isAuthenticated ? <ProblemList /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/problem/:id" 
                element={isAuthenticated ? <ProblemEditor /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/course/:courseId" 
                element={isAuthenticated ? <CourseDetail /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/leaderboard" 
                element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/pricing" 
                element={isAuthenticated ? <Pricing /> : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
