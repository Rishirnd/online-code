import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Settings, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'My Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { name: 'Leaderboard', icon: <Trophy size={20} />, path: '/leaderboard' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside style={{ 
      width: collapsed ? '80px' : '260px', 
      background: 'var(--bg-secondary)', 
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width var(--transition-normal)'
    }}>
      <div style={{ padding: collapsed ? '0' : '0 2rem', marginBottom: '3rem', textAlign: collapsed ? 'center' : 'left' }}>
        <h2 style={{ 
          background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          fontSize: collapsed ? '1.5rem' : '1.8rem',
          margin: 0
        }}>
          {collapsed ? 'G' : 'Gravitas'}
        </h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
             <button 
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem 1rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? 'rgba(126, 87, 194, 0.15)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                borderRight: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }}>
                {item.icon}
              </div>
              {!collapsed && <span style={{ fontWeight: isActive ? '500' : '400' }}>{item.name}</span>}
            </button>
          )
        })}
      </nav>
      
      <div style={{ padding: '0 2rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button 
          onClick={toggleTheme} 
          style={{ 
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', 
            gap: '1rem', background: 'transparent', color: 'var(--text-secondary)', 
            border: 'none', cursor: 'pointer', padding: collapsed ? '0' : '0.5rem 0' 
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {!collapsed && (
          <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pro Plan unlocks all modules.</p>
            <button className="btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>Upgrade Now</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
