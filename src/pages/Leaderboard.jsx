import React, { useState } from 'react';
import { leaderboardData } from '../data/mockData';
import { 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  Search
} from 'lucide-react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Global');
  const [searchQuery, setSearchQuery] = useState('');

  const getRankBadge = (rank) => {
    switch(rank) {
      case 1: return <Trophy size={20} color="#fbbf24" />;
      case 2: return <Award size={20} color="#94a3b8" />;
      case 3: return <Award size={20} color="#b45309" />;
      default: return null;
    }
  };

  const filteredData = leaderboardData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '3rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 className="animate-in" style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>
              Global <span style={{ color: 'var(--accent-primary)' }}>Rankings</span>
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Competing with the top 0.1% of engineers globally.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border-main)' }}>
            {['Global', 'Monthly', 'Friends'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === tab ? 'white' : 'var(--text-dim)',
                  boxShadow: activeTab === tab ? '0 4px 12px var(--accent-glow)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            placeholder="Searching for a teammate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-main)', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', color: 'white', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>
      </header>

      <div className="glass-panel animate-in" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-main)' }}>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Rank</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Username</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Points / XP</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Solved</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Streak</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, idx) => {
              const isTopThree = user.rank <= 3;
              return (
                <tr 
                  key={user.id} 
                  style={{ 
                    borderBottom: '1px solid var(--border-main)', 
                    transition: 'var(--transition)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'}
                >
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.1rem', color: isTopThree ? user.color : 'var(--text-main)' }}>
                      {getRankBadge(user.rank)}
                      #{user.rank}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--bg-card), var(--border-main))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem', color: 'var(--accent-primary)', border: '1px solid var(--border-main)' }}>
                        {user.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{user.name} {user.name === 'Zoro S.' && '(You)'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top Rated Developer</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>
                      {user.xp.toLocaleString()} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                      <Target size={14} color="var(--accent-primary)" /> {user.solved}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: user.streak > 10 ? '#ef4444' : 'var(--text-main)' }}>
                      <Flame size={14} fill={user.streak > 10 ? '#ef4444' : 'transparent'} /> {user.streak}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <span style={{ 
                      background: user.tier === 'Pro' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.05)',
                      color: user.tier === 'Pro' ? 'var(--accent-primary)' : 'var(--text-muted)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {user.tier.toUpperCase()}
                    </span >
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
