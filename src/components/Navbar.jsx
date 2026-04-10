import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Globe, 
  ChevronDown, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  Settings as SettingsIcon,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';

const Navbar = () => {
  const { config, updateConfig } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    updateConfig('isDark', !config.isDark);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Topics', path: '/topics', icon: <BookOpen size={18} /> },
    { name: 'Problems', path: '/topics/arrays', icon: <Code2 size={18} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={18} /> },
  ];

  const languages = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' }
  ];

  return (
    <nav style={{ 
      height: '64px', 
      background: 'var(--bg-navbar)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-main)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 200
    }}>
      {/* Left: Logo & Nav Links (Desktop) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
            padding: '0.5rem', 
            borderRadius: '10px',
            display: 'flex',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Code2 size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#fff' }}>GRAVITAS</span>
        </div>

        <div className="desktop-nav" style={{ display: 'flex', gap: '0.25rem' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'var(--text-dim)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? '700' : '500',
                  padding: '0.5rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  transition: 'var(--transition)'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: Controls & Mobile Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Desktop Controls */}
        <div className="desktop-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language Selector */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            background: 'rgba(255,255,255,0.03)', 
            padding: '0.4rem 1rem', 
            borderRadius: '10px', 
            border: '1px solid var(--border-main)' 
          }}>
            <Globe size={15} color="var(--text-muted)" />
            <select 
              value={config.language}
              onChange={(e) => updateConfig('language', e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', outline: 'none', appearance: 'none' }}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id} style={{ background: '#000' }}>{lang.name}</option>
              ))}
            </select>
          </div>

          <button onClick={toggleTheme} style={{ background: 'rgba(255,255,255,0.03)', color: '#fff', width: '38px', height: '38px', borderRadius: '10px', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {config.isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ padding: '2px', background: 'transparent' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '0.9rem', border: '2px solid #000' }}>
                {config.username[0].toUpperCase()}
              </div>
            </button>
            {isProfileOpen && (
              <div className="glass-panel" style={{ position: 'absolute', top: '50px', right: 0, width: '220px', padding: '0.5rem', zIndex: 1000 }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border-main)' }}>
                  <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>{config.username}</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Pro Account</div>
                </div>
                <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444', background: 'transparent', fontSize: '0.85rem', fontWeight: '600' }}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ 
            display: 'none', 
            background: 'var(--accent-primary)', 
            color: '#fff', 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{ 
          position: 'fixed', 
          top: '64px', 
          left: 0, 
          width: '100%', 
          height: 'calc(100vh - 64px)', 
          background: 'rgba(0,0,0,0.95)', 
          backdropFilter: 'blur(20px)',
          zIndex: 300,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          animation: 'mobileFadeIn 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Navigation</span>
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', textDecoration: 'none', fontSize: '1.25rem', fontWeight: '600', padding: '0.5rem 0' }}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preferences</span>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: '600' }}>Theme</span>
                <button onClick={toggleTheme} style={{ background: 'var(--bg-card)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {config.isDark ? <><Sun size={16} /> Light</> : <><Moon size={16} /> Dark</>}
                </button>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: '600' }}>Language</span>
                <select 
                  value={config.language}
                  onChange={(e) => updateConfig('language', e.target.value)}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-main)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600' }}
                >
                  {languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
             </div>
          </div>

          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
            style={{ marginTop: 'auto', padding: '1rem', background: '#ef4444', color: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            <LogOut size={20} /> Terminate Session
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-controls { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @keyframes mobileFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
