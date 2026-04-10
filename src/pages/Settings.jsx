import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { 
  User, 
  Bell, 
  Palette, 
  Globe, 
  RotateCcw, 
  Download, 
  Type,
  Monitor,
  AlertCircle
} from 'lucide-react';

const Settings = () => {
  const { config, updateConfig, resetToDefaults, exportSettings } = useConfig();
  const [activeSection, setActiveSection] = useState('profile');

  const themeColors = [
    { label: 'Azure', hex: '#3b82f6' },
    { label: 'Obsidian', hex: '#6366f1' },
    { label: 'Forest', hex: '#10b981' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Amber', hex: '#f59e0b' }
  ];

  const SectionButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        background: activeSection === id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        color: activeSection === id ? 'var(--accent-primary)' : 'var(--text-dim)',
        fontWeight: activeSection === id ? '700' : '500',
        transition: 'var(--transition)',
        textAlign: 'left'
      }}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div style={{ padding: '3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="animate-in" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
            System <span style={{ color: 'var(--accent-primary)' }}>Architecture</span>
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Configure your personalized workspace environment and IDE preferences.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem' }}>
          
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <SectionButton id="profile" label="User Profile" icon={User} />
            <SectionButton id="theme" label="Theme & Display" icon={Palette} />
            <SectionButton id="ide" label="IDE Config" icon={Monitor} />
            <SectionButton id="notifications" label="Notifications" icon={Bell} />
            
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-main)' }}>
              <button onClick={exportSettings} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem', background: 'transparent' }}><Download size={16} /> Export JSON</button>
              <button onClick={resetToDefaults} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: '#f43f5e', fontSize: '0.9rem', background: 'transparent' }}><RotateCcw size={16} /> Reset Default</button>
            </div>
          </aside>

          <div className="animate-in" style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-main)', padding: '2.5rem' }}>
            {activeSection === 'profile' && (
              <div className="section-fade">
                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><User /> Profile Context</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Public Username</label>
                    <input type="text" value={config.username} onChange={(e) => updateConfig('username', e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border-main)', color: 'white' }} />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'theme' && (
              <div className="section-fade">
                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Palette /> UI Theme</h3>
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Primary Palette</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {themeColors.map(color => (
                        <button key={color.hex} onClick={() => updateConfig('themeColor', color.hex)} style={{ width: '40px', height: '40px', background: color.hex, borderRadius: '10px', border: config.themeColor === color.hex ? '3px solid white' : 'none', boxShadow: config.themeColor === color.hex ? `0 0 15px ${color.hex}` : 'none' }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'ide' && (
                <div className="section-fade">
                  <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Monitor /> Editor Configuration</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Type color="var(--accent-primary)" size={20} />
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '600' }}>Font Scale</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Adjust relative size of code characters.</div>
                        </div>
                      </div>
                      <input type="range" min="12" max="24" value={config.fontSize} onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))} style={{ width: '150px' }} />
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', display: 'flex', gap: '0.8rem', alignItems: 'center', maxWidth: '1000px', margin: '2rem auto 0 auto' }}>
          <AlertCircle color="#fbbf24" size={20} />
          <span style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
            <strong>Local Persistence Active:</strong> All configuration is stored locally.
          </span>
        </div>
      </div>

      <style>{`
        .section-fade { animation: sectionFadeIn 0.3s ease-out; }
        @keyframes sectionFadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default Settings;
