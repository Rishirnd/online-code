import React from 'react';
import { useNavigate } from 'react-router-dom';
import { domains, courses } from '../data/mockData';
import { 
  Trophy, 
  Flame, 
  Target, 
  ChevronRight, 
  Clock,
  Layout
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Explorer';

  const stats = [
    { name: 'Solved', value: '42', icon: <Target size={20} />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Streak', value: '12 Days', icon: <Flame size={20} />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    { name: 'Ranking', value: '#1,204', icon: <Trophy size={20} />, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' },
  ];

  return (
    <div style={{ padding: '2.5rem' }}>
      {/* Welcome Section */}
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="animate-in" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{username}</span>!
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Your current learning path is 85% complete. You're doing great!</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={stat.name} className="glass-panel animate-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', animationDelay: `${i * 0.1}s` }}>
            <div style={{ background: stat.bg, color: stat.color, padding: '1rem', borderRadius: '14px', display: 'flex' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{stat.name}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Continue Learning */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Continue Learning</h2>
            <button style={{ color: 'var(--accent-primary)', background: 'transparent', fontWeight: '600', fontSize: '0.9rem' }}>View All</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courses.slice(0, 2).map((course, i) => (
              <div 
                key={course.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-main)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-main)' }}>
                    <Layout size={24} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{course.title}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {course.duration}</span>
                      <span>{course.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '120px', height: '6px', background: 'var(--border-main)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: 'var(--accent-primary)' }}></div>
                  </div>
                  <ChevronRight size={20} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Topics */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recommended</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {domains.slice(0, 3).map((domain, i) => (
              <div 
                key={domain.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/domains/${domain.id}`)}
              >
                <span style={{ fontSize: '1.75rem' }}>{domain.icon}</span>
                <div>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{domain.name}</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{domain.courseCount} courses available</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
