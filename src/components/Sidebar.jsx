import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Sparkles, 
  Settings 
} from 'lucide-react';

const Sidebar = ({ collapsed: initialCollapsed = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const menuItems = [
    { name: 'CS Pathways', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Curriculum', icon: <BookOpen size={20} />, path: '/course/c1' },
    { name: 'Elite Board', icon: <Trophy size={20} />, path: '/leaderboard' },
    { name: 'Upgrade Pro', icon: <Sparkles size={20} />, path: '/pricing' },
    { name: 'Preferences', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div style={{ 
      width: collapsed ? '80px' : '260px', 
      height: 'calc(100vh - 64px)', 
      background: 'var(--bg-main)', 
      borderRight: '1px solid var(--border-main)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0.75rem',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      zIndex: 50
    }}>
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          right: '-12px',
          top: '20px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-main)',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Menu Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-dim)',
                transition: 'var(--transition)',
                justifyContent: collapsed ? 'center' : 'flex-start',
                width: '100%'
              }}
              className="sidebar-link"
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-main)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              {!collapsed && (
                <span style={{ fontWeight: isActive ? '600' : '500', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
