import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, UserPlus, Code, Rocket, Sparkles } from 'lucide-react';

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
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Make sure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#0a0a0f', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Animated Blobs */}
      <div className="blob" style={{ background: 'rgba(126, 87, 194, 0.4)', width: '500px', height: '500px', top: '-10%', left: '-10%' }}></div>
      <div className="blob" style={{ background: 'rgba(255, 64, 129, 0.3)', width: '600px', height: '600px', bottom: '-20%', right: '-10%', animationDelay: '2s' }}></div>
      
      {/* Container */}
      <div style={{ display: 'flex', width: '100%', zIndex: 1 }}>
        
        {/* Left Side: Hero Section (Visible on Desktop) */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10%', position: 'relative' }} className="hero-section">
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '0.8rem', borderRadius: '12px' }}>
                <Code size={28} color="#fff" />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '2px' }}>GRAVITAS</span>
            </div>
            
            <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #a6accd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Master <br />
              <span style={{ background: 'linear-gradient(to right, #ff4081, #7e57c2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Programming</span> <br />
              Interactively
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '400px', lineHeight: '1.6' }}>
              Join the ultimate code learning platform. Practice with real-time execution in an immersive environment.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}>
                <Rocket size={20} color="#00e676" /> Fast Execution
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}>
                <Sparkles size={20} color="#ffeb3b" /> Intuitive UI
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div style={{ flex: '0 0 500px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }} className="auth-container">
          <div className="glass-panel animate-fade-in" style={{ padding: '3.5rem', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '2rem', animationDelay: '0.2s', background: 'rgba(20, 21, 30, 0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#fff' }}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                {isLogin ? 'Log in to continue your journey' : 'Sign up and start coding today.'}
              </p>
            </div>

            {error && <div style={{ background: 'rgba(255, 23, 68, 0.1)', color: '#ff1744', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 23, 68, 0.3)', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#a6accd', fontWeight: '500' }}>Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '1rem', borderRadius: '10px', outline: 'none', transition: 'border 0.3s' }} 
                  onFocus={(e) => e.target.style.border = '1px solid var(--accent-primary)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#a6accd', fontWeight: '500' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '1rem', borderRadius: '10px', outline: 'none', transition: 'border 0.3s' }} 
                  onFocus={(e) => e.target.style.border = '1px solid var(--accent-primary)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <button type="submit" disabled={isLoading} style={{ 
                background: 'linear-gradient(135deg, #7e57c2, #ff4081)', 
                color: 'white', 
                padding: '1rem', 
                borderRadius: '10px', 
                fontWeight: '600', 
                fontSize: '1rem',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginTop: '1rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 25px rgba(255, 64, 129, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {isLoading ? 'Processing...' : isLogin ? <><LogIn size={20} /> Sign In</> : <><UserPlus size={20} /> Create Account</>}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: '#ff4081', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', padding: '0' }}>
                {isLogin ? "Register now" : "Sign In"}
              </button>
            </div>

          </div>
        </div>
      </div>
      
      {/* Hide hero on small screens using raw style tag */}
      <style>{`
        @media (max-width: 900px) {
          .hero-section { display: none !important; }
          .auth-container { flex: 1 !important; padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
