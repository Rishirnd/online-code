import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { domains } from '../data/mockData';
import { BookOpen, Award, Layers } from 'lucide-react';

const Domains = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3.5rem' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>
            Choose Your <span style={{ color: 'var(--accent-primary)' }}>Path</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px' }}>
            Explore specialized domains in Computer Science. Each path is a curated collection of courses, problems, and real-world projects.
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {domains.map((domain, idx) => (
            <div 
              key={domain.id}
              className="glass-panel animate-slide-in"
              style={{ 
                padding: '2.5rem', 
                cursor: 'pointer', 
                animationDelay: `${idx * 0.1}s`,
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: 'rgba(20,21,30,0.4)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onClick={() => navigate(`/domains/${domain.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.background = 'rgba(126, 87, 194, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'rgba(20,21,30,0.4)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '3.5rem' }}>{domain.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{domain.courseCount}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Courses</div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{domain.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {domain.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto' }}>
                {domain.skills.map(skill => (
                  <span key={skill} style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    color: 'var(--text-primary)', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Progress Tracker (Requirement 6) */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>Domain Progress</span>
                  <span>0%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Domains;
