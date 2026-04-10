import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { topics } from '../data/mockData';

const Topics = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Explore <span style={{ color: 'var(--accent-primary)' }}>Topics</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Choose a category to start practicing your coding skills.</p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {topics.map((topic, idx) => (
            <div 
              key={topic.id}
              className="glass-panel animate-slide-in"
              style={{ 
                padding: '2rem', 
                cursor: 'pointer', 
                animationDelay: `${idx * 0.1}s`,
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
              onClick={() => navigate(`/topics/${topic.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
                <span style={{ background: 'rgba(126, 87, 194, 0.2)', color: 'var(--accent-primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {topic.problemCount} Problems
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{topic.name}</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Easy</span>
                    <span style={{ color: '#00e676', fontWeight: 'bold' }}>{topic.distribution.easy}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Medium</span>
                    <span style={{ color: '#ffb300', fontWeight: 'bold' }}>{topic.distribution.medium}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Hard</span>
                    <span style={{ color: '#ff1744', fontWeight: 'bold' }}>{topic.distribution.hard}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Mock */}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: 'var(--accent-primary)' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Topics;
