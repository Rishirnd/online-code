import React from 'react';
import Sidebar from '../components/Sidebar';
import { Trophy, Medal, Star } from 'lucide-react';

const mockRankings = [
  { id: 1, name: 'zoros', score: 14500, coursesCompleted: 12, rank: 1, color: '#FFD700' },
  { id: 2, name: 'alex_dev', score: 13200, coursesCompleted: 10, rank: 2, color: '#C0C0C0' },
  { id: 3, name: 'sarah_codes', score: 12800, coursesCompleted: 9, rank: 3, color: '#CD7F32' },
  { id: 4, name: 'mike_python', score: 10500, coursesCompleted: 7, rank: 4, color: 'var(--text-secondary)' },
  { id: 5, name: 'data_ninja', score: 9800, coursesCompleted: 6, rank: 5, color: 'var(--text-secondary)' }
];

const Leaderboard = () => {
  const currentUsername = localStorage.getItem('username') || 'zoros';

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <header style={{ marginBottom: '3rem', width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <Trophy size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} className="animate-fade-in" />
          <h1 className="animate-fade-in" style={{ fontSize: '2.5rem' }}>Global <span style={{ color: 'var(--accent-primary)' }}>Leaderboard</span></h1>
          <p style={{ color: 'var(--text-secondary)' }} className="animate-fade-in">Compete with friends and track your course completion points.</p>
        </header>

        <section style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockRankings.map((user, idx) => {
            const isCurrentUser = user.name === currentUsername;
            return (
              <div 
                key={user.id} 
                className="glass-panel animate-slide-in"
                style={{ 
                  animationDelay: \`\${idx * 0.15}s\`,
                  opacity: 0,
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1.5rem 2rem', 
                  borderRadius: '16px',
                  background: isCurrentUser ? 'linear-gradient(135deg, rgba(126, 87, 194, 0.2), var(--bg-glass))' : 'var(--bg-glass)',
                  border: isCurrentUser ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  boxShadow: isCurrentUser ? '0 8px 32px var(--accent-glow)' : 'var(--shadow-glass)',
                  transition: 'transform 0.2s',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Ranking Position */}
                <div style={{ width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: user.color }}>
                  {user.rank <= 3 ? <Medal color={user.color} size={32} /> : \`#\${user.rank}\`}
                </div>

                {/* Avatar */}
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.2rem', marginLeft: '1rem' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div style={{ marginLeft: '1.5rem', flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: isCurrentUser ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    {user.name} {isCurrentUser && '(You)'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{user.coursesCompleted} courses completed</p>
                </div>

                {/* Score */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                  <Star size={16} color="var(--accent-secondary)" />
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{user.score}</span>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  );
};

export default Leaderboard;
