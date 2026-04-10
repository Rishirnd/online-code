import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Check, ShieldCheck, Mail, Upload, Sparkles } from 'lucide-react';

const Pricing = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('student_verified') === 'true';
    setIsVerified(status);
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setVerifying(true);
    // Mock verification
    setTimeout(() => {
      localStorage.setItem('student_verified', 'true');
      setIsVerified(true);
      setVerifying(false);
    }, 1500);
  };

  const prices = {
    regular: { monthly: 15, yearly: 150 },
    student: { monthly: 5, yearly: 50 }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Elevate Your <span style={{ color: 'var(--accent-primary)' }}>Learning</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Get full access to all dynamic programming, system design, and advanced graph problems.</p>
        </header>

        <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '900px', marginBottom: '4rem' }}>
          {/* Pro Plan Card */}
          <div className="glass-panel animate-slide-in" style={{ 
            flex: 1, 
            padding: '3rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem',
            border: isVerified ? '1px solid rgba(255,255,255,0.05)' : '1px solid var(--accent-primary)',
            background: isVerified ? 'var(--bg-glass)' : 'linear-gradient(135deg, rgba(126, 87, 194, 0.1), var(--bg-glass))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Pro Membership</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Everything you need to land your dream job.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>${isVerified ? prices.student.monthly : prices.regular.monthly}</span>
              <span style={{ color: 'var(--text-secondary)' }}>/ month</span>
              {isVerified && (
                <span style={{ marginLeft: '1rem', color: '#00e676', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,230,118,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  STUDENT DISCOUNT APPLIED
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Unlimited Code Submissions', 'Access to Premium Problems', 'Advanced Progress Analytics', 'Mock Interview Mode', 'Company-specific Challenges'].map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem' }}>
                  <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.2rem', borderRadius: '50%', display: 'flex' }}>
                    <Check size={14} />
                  </div>
                  {feat}
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
              {isVerified ? 'Choose Student Pro' : 'Get Started Now'}
            </button>
          </div>
        </div>

        {/* Verification Section */}
        {!isVerified ? (
          <section className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '3rem', textAlign: 'center', animationDelay: '0.2s' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(255, 64, 129, 0.1)', color: '#ff4081', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem' }}>
              <Sparkles size={30} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Are you a Student?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Verify your student status to unlock a 66% permanent discount on all plans.</p>

            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>College Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="email"
                    required
                    placeholder="john@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ fontSize: '0.8rem' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>

              <div style={{ 
                border: '2px dashed var(--border-color)', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <Upload size={24} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Student ID Card</div>
              </div>

              <button type="submit" disabled={verifying} className="btn-secondary" style={{ padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 'bold' }}>
                {verifying ? 'Verifying...' : 'Verify My Status'}
              </button>
            </form>
          </section>
        ) : (
          <div className="glass-panel animate-fade-in" style={{ 
            width: '100%', 
            maxWidth: '600px', 
            padding: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            border: '1px solid #00e676',
            background: 'rgba(0,230,118,0.05)'
          }}>
            <div style={{ background: '#00e676', color: 'white', padding: '0.8rem', borderRadius: '12px' }}>
              <ShieldCheck size={30} />
            </div>
            <div>
              <h3 style={{ color: '#00e676' }}>Student Verified ✅</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You are currently enjoying the student pricing on all premium features.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pricing;
