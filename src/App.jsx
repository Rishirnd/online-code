import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DomainsHub from './pages/DomainsHub';
import ProblemList from './pages/ProblemList';
import ProblemEditor from './pages/ProblemEditor';
import CourseDetail from './pages/CourseDetail';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import './App.css';

// 1. Persistent Layout Component (The "Fixed Frame")
const MainLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: 'var(--bg-main)', 
      color: 'var(--text-main)', 
      overflow: 'hidden' 
    }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <ConfigProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Global Layout Area */}
          <Route element={<MainLayout isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topics" element={<DomainsHub />} />
            <Route path="/domains/:domainId" element={<ProblemList />} />
            <Route path="/problem/:id" element={<ProblemEditor />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
