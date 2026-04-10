import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { preferredLanguage, setPreferredLanguage } = useLanguage();

  const languages = [
    { id: 'python', name: 'Python', color: '#3776ab' },
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' },
    { id: 'cpp', name: 'C++', color: '#00599c' },
    { id: 'java', name: 'Java', color: '#007396' },
    { id: 'go', name: 'Go', color: '#00add8' },
    { id: 'swift', name: 'Swift', color: '#f05138' }
  ];

  return (
    <nav style={{ 
      height: '70px', 
      background: 'rgba(10,10,15,0.8)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 3rem',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ padding: '0.6rem', background: 'var(--accent-primary)', borderRadius: '12px', boxShadow: '0 0 20px var(--accent-glow)' }}>
          <Globe size={24} color="white" />
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px' }}>QUEST ACADEMY</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.2rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>IDE PREFERENCE:</span>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select 
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'white', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                cursor: 'pointer',
                appearance: 'none',
                paddingRight: '1.5rem',
                outline: 'none'
              }}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id} style={{ background: 'var(--bg-secondary)', color: 'white' }}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
          </div>
        </div>
        
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', border: '2px solid rgba(255,255,255,0.1)' }}></div>
      </div>
    </nav>
  );
};

export default Navbar;
