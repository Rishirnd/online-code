import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, UserPlus, Code2, Rocket, Sparkles, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await axios.post(`http://localhost:3001${endpoint}`, { username, password });
      if (res.data.userId) {
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('username', res.data.username || username);
        // Force reload to initialize ConfigContext with the new user data
        window.location.href = '/'; 
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failure. Is the backend online?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      overflow: 'hidden', 
      position: 'relative',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Premium Gradient Overlays */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        left: '-5%', 
        width: '40%', 
        height: '40%', 
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0 
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-10%', 
        right: '-5%', 
        width: '50%', 
        height: '50%', 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0 
      }} />

      <div style={{ display: 'flex', width: '100%', zIndex: 1 }}>
        
        {/* Left Side: Brand Hero */}
        <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }} className="hero-section">
          <div className="animate-in" style={{ animationDelay: '0.1s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
                padding: '0.6rem', 
                borderRadius: '12px',
                boxShadow: '0 8px 20px var(--accent-glow)' 
              }}>
                <Code2 size={28} color="#fff" />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', letterSpacing: '3px' }}>GRAVITAS</span>
            </div>
            
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: '900',
              lineHeight: '1.05', 
              marginBottom: '1.5rem', 
              color: '#fff',
              letterSpacing: '-2px'
            }}>
              Develop at the <br />
              <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Edge of Reality</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: '#94a3b8', marginBottom: '4rem', maxWidth: '500px', lineHeight: '1.8' }}>
              The most advanced, interactive Computer Science playground for the next generation of engineers.
            </p>
            
            <div style={{ display: 'flex', gap: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                  <Rocket size={20} color="#3b82f6" />
                </div>
                Turbo Execution
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                  <ShieldCheck size={20} color="#8b5cf6" />
                </div>
                Pro Environment
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Workspace */}
        <div style={{ 
          flex: '0.8', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderLeft: '1px solid rgba(255,255,255,0.05)'
        }} className="auth-container">
          <div className="glass-panel animate-in" style={{ 
            padding: '3.5rem', 
            width: '100%', 
            maxWidth: '460px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2.5rem', 
            animationDelay: '0.3s', 
            background: 'rgba(10, 10, 15, 0.8)', 
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.75rem', color: '#fff' }}>
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {isLogin ? 'Sign in to access your secure workspace.' : 'Create your pro profile within minutes.'}
              </p>
            </div>

            {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} /> {error}
            </div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your identifier"
                  required
                  style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.9rem 1.25rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s' }} 
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.9rem 1.25rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s' }} 
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ 
                marginTop: '1rem',
                padding: '1rem', 
                fontSize: '1rem',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.75rem',
                opacity: isLoading ? 0.7 : 1,
              }}
              >
                {isLoading ? 'Decrypting...' : isLogin ? <><LogIn size={20} /> Access Hub</> : <><UserPlus size={20} /> Register Profile</>}
              </button>
            </form>

            {/* Social Authentication Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
                <span style={{ fontSize: '0.7rem', color: '#43536b', fontWeight: '700', textTransform: 'uppercase' }}>Or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  padding: '0.75rem', 
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </button>
                <button style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  padding: '0.75rem', 
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
              </div>
            </div>


            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>
                {isLogin ? "New to Gravitas? " : "Already verified? "}
              </span>
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ background: 'none', color: 'var(--accent-primary)', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
              >
                {isLogin ? "Join now" : "Sign In"}
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          .hero-section { display: none !important; }
          .auth-container { flex: 1 !important; border-left: none !important; padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
