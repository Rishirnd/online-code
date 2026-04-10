import React from 'react';
import { useNavigate } from 'react-router-dom';
import { domains } from '../data/mockData';

const DomainsHub = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '3rem' }}>
      <header style={{ marginBottom: '3.5rem' }}>
        <h1 className="animate-in" style={{ fontSize: '2.75rem', marginBottom: '0.8rem' }}>
          Choose Your <span style={{ color: 'var(--accent-primary)' }}>Learning Path</span>
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '800px' }}>
          Master core computer science domains with structured curricula and interactive problems.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '2rem' 
      }}>
        {domains.map((domain, idx) => (
          <div 
            key={domain.id}
            className="glass-panel animate-in"
            style={{ 
              padding: '2rem', 
              cursor: 'pointer', 
              animationDelay: `${idx * 0.1}s`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              border: '1px solid var(--border-main)',
              background: 'linear-gradient(135deg, var(--bg-card), rgba(30, 41, 59, 0.4))'
            }}
            onClick={() => navigate(`/domains/${domain.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 12px 30px -10px var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-main)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '3rem' }}>{domain.icon}</span>
              <span style={{ 
                background: 'rgba(59, 130, 246, 0.1)', 
                color: 'var(--accent-primary)', 
                padding: '0.4rem 1rem', 
                borderRadius: '30px', 
                fontSize: '0.8rem', 
                fontWeight: '700' 
              }}>
                {domain.courseCount} Courses
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{domain.name}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {domain.description}
              </p>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {domain.skills.slice(0, 3).map(skill => (
                  <span key={skill} style={{ 
                    fontSize: '0.7rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: '0.3rem 0.6rem', 
                    borderRadius: '4px',
                    color: 'var(--text-muted)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '2px', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '40%', background: '#00e676' }}></div>
                <div style={{ width: '30%', background: '#ffb300' }}></div>
                <div style={{ width: '10%', background: '#ff1744' }}></div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainsHub;
