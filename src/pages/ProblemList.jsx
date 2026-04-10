import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { problems, topics } from '../data/mockData';
import { Search, Filter, ArrowLeft } from 'lucide-react';

const ProblemList = () => {
  const { domainId, topicId } = useParams();
  const activeId = domainId || topicId;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const topic = topics.find(t => t.id === activeId) || { name: 'Practice' };
  
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchTopic = activeId ? (p.topicId === activeId || p.domainId === activeId) : true;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      return matchTopic && matchSearch && matchDifficulty;
    });
  }, [topicId, search, difficultyFilter]);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return '#00e676';
      case 'Medium': return '#ffb300';
      case 'Hard': return '#ff1744';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', marginBottom: '1rem' }}
          >
            <ArrowLeft size={18} /> Back to Domains
          </button>
          <h1 className="animate-fade-in" style={{ fontSize: '2.2rem' }}>
            {topic.name} <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Problems</span>
          </h1>
        </header>

        {/* Filters */}
        <section className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'rgba(20,21,30,0.5)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Difficulty:</span>
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '10px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </section>

        {/* Problem List Table */}
        <section className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '1.2rem 2rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '1.2rem 2rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Title</th>
                <th style={{ padding: '1.2rem 2rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Difficulty</th>
                <th style={{ padding: '1.2rem 2rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.length > 0 ? filteredProblems.map((problem) => (
                <tr 
                  key={problem.id}
                  onClick={() => navigate(`/problem/${problem.id}`)}
                  style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1.2rem 2rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                  </td>
                  <td style={{ padding: '1.2rem 2rem', fontWeight: '500' }}>{problem.title}</td>
                  <td style={{ padding: '1.2rem 2rem', color: getDifficultyColor(problem.difficulty), fontWeight: '600' }}>
                    {problem.difficulty}
                  </td>
                  <td style={{ padding: '1.2rem 2rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {problem.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No problems found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ProblemList;
