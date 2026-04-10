import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Mail, 
  Zap,
  GraduationCap,
  Star
} from 'lucide-react';

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
    setTimeout(() => {
      localStorage.setItem('student_verified', 'true');
      setIsVerified(true);
      setVerifying(false);
    }, 1200);
  };

  const plans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Ideal for beginners starting their journey.',
      features: ['Access to basic problems', 'Standard compiler', 'Community support'],
      cta: 'Current Plan',
      recommended: false,
      color: 'var(--text-muted)'
    },
    {
      name: 'Pro Access',
      price: isVerified ? '5' : '15',
      description: 'The ultimate tool for technical interviews.',
      features: ['Advanced problem bank', 'Cloud IDE priority', 'Mock interviews', 'Company-specific prep'],
      cta: 'Upgrade to Pro',
      recommended: true,
      color: 'var(--accent-primary)'
    },
    {
      name: 'Student Elite',
      price: '5',
      description: 'Verified student access for next-gen engineers.',
      features: ['Entire Pro feature set', 'Exclusive workshops', 'Certificate of completion'],
      cta: isVerified ? 'Active Elite' : 'Verify & Unlock',
      recommended: false,
      color: 'var(--accent-secondary)'
    }
  ];

  return (
    <div style={{ padding: '4rem 3rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '0.5rem 1rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '1.5rem' }}>
          <Zap size={16} /> FLEXIBLE PLANS
        </div>
        <h1 className="animate-in" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>
          Accelerate Your <span style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Career</span>
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>Unlock premium features designed to help you ace your interviews.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto 6rem' }}>
        {plans.map((plan, i) => (
          <div key={plan.name} className="glass-panel animate-in" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', animationDelay: `${i * 0.1}s`, position: 'relative', border: plan.recommended ? '2px solid var(--accent-primary)' : '1px solid var(--border-main)', background: plan.recommended ? 'rgba(30, 41, 59, 0.8)' : 'var(--bg-card)' }}>
            {plan.recommended && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '0.3rem 1.2rem', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '800', boxShadow: '0 4px 12px var(--accent-glow)' }}>MOST POPULAR</div>}
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', height: '40px' }}>{plan.description}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: '800' }}>${plan.price}</span>
              <span style={{ color: 'var(--text-muted)' }}>/month</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              {plan.features.map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Check size={18} color={plan.color} strokeWidth={3} /> {feat}
                </div>
              ))}
            </div>
            <button className={plan.recommended ? 'btn-primary' : ''} style={{ padding: '0.9rem', width: '100%', background: plan.recommended ? '' : 'var(--bg-main)', border: plan.recommended ? '' : '1px solid var(--border-main)', color: plan.recommended ? '' : 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700' }}>{plan.cta}</button>
          </div>
        ))}
      </div>

      {!isVerified && (
        <div className="glass-panel animate-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
          <div><h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Student Program</h2><p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Unlock the Student Elite plan for just $5/mo.</p></div>
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input type="email" placeholder="name@university.edu" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.9rem 1rem', background: 'var(--bg-main)', border: '1px solid var(--border-main)', borderRadius: '10px', color: 'white' }} />
            <button disabled={verifying} className="btn-primary" style={{ background: 'var(--accent-secondary)' }}>{verifying ? 'Verifying...' : 'Unlock Discount'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Pricing;
