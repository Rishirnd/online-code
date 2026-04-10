import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
  const username = localStorage.getItem('username') || '';
  const [formData, setFormData] = useState({
    name: username,
    email:`${username}@example.com`,
    notifications: true,
    privacy: 'public'
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      localStorage.setItem('username', formData.name);
      // Optional toast notification would go here
    }, 800);
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        
        <div style={{ width: '100%', maxWidth: '700px' }}>
          <header style={{ marginBottom: '3rem' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '2.5rem' }}>Account <span style={{ color: 'var(--accent-primary)' }}>Settings</span></h1>
            <p style={{ color: 'var(--text-secondary)' }} className="animate-fade-in">Manage your profile, preferences, and security.</p>
          </header>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Profile Section */}
            <section className="glass-panel animate-slide-in" style={{ padding: '2.5rem', opacity: 0, animationDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <User color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Public Profile</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Username</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.8rem', borderRadius: '8px', outline: 'none' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.8rem', borderRadius: '8px', outline: 'none' }} 
                  />
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="glass-panel animate-slide-in" style={{ padding: '2.5rem', opacity: 0, animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <Bell color="var(--accent-secondary)" />
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Notifications</h2>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-primary)' }}>Email Notifications</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Receive weekly course progress reports.</p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.notifications}
                    onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                    style={{ opacity: 0, width: 0, height: 0 }} 
                  />
                  <span style={{ 
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: formData.notifications ? 'var(--accent-primary)' : 'var(--border-color)', 
                    transition: '.4s', borderRadius: '34px' 
                  }}>
                    <span style={{ 
                      position: 'absolute', content: '""', height: '16px', width: '16px', 
                      left: formData.notifications ? '30px' : '4px', bottom: '4px', 
                      backgroundColor: 'white', transition: '.4s', borderRadius: '50%' 
                    }}></span>
                  </span>
                </label>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="glass-panel animate-slide-in" style={{ padding: '2.5rem', opacity: 0, animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <Shield color="#ff4081" />
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Privacy</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                  <input type="radio" name="privacy" value="public" checked={formData.privacy === 'public'} onChange={(e) => setFormData({...formData, privacy: e.target.value})} />
                  <span style={{ color: 'var(--text-primary)' }}>Public (Show my profile on Leaderboard)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                  <input type="radio" name="privacy" value="private" checked={formData.privacy === 'private'} onChange={(e) => setFormData({...formData, privacy: e.target.value})} />
                  <span style={{ color: 'var(--text-primary)' }}>Private (Hide my profile)</span>
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="animate-slide-in" style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, animationDelay: '0.4s' }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', fontSize: '1rem' }}>
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
