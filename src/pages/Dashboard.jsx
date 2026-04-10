import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const courses = [
  { 
    id: '1', 
    title: 'Python Data Structures', 
    description: 'Master lists, dictionaries, trees and graphs with interactive visualizations.', 
    image: '/python_course_1775752038271.png', 
    progress: 45, 
    language: 'python' 
  },
  { 
    id: '2', 
    title: 'Advanced React JS', 
    description: 'Deep dive into hooks, context, state management, and SSR.', 
    image: '/react_course_1775752088879.png', 
    progress: 12, 
    language: 'javascript' 
  },
  { 
    id: '3', 
    title: 'Node.js Backend Servers', 
    description: 'Building scalable architectures, express microservices, and databases.', 
    image: '/node_course_1775752367109.png', 
    progress: 0, 
    language: 'javascript' 
  },
  { 
    id: '4', 
    title: 'Machine Learning Basics', 
    description: 'Foundations of AI, neural networks, and training models using Python.', 
    image: '/ml_course_1775752400506.png', 
    progress: 8, 
    language: 'python' 
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="animate-fade-in" style={{ fontSize: '2.5rem' }}>Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{username}</span></h1>
            <p style={{ color: 'var(--text-secondary)' }}>Pick up where you left off or start a new challenge.</p>
          </div>
          <button className="btn-secondary" onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>Logout</button>
        </header>

        <section>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Courses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {courses.map((course, idx) => (
              <div 
                key={course.id} 
                className="glass-panel animate-fade-in" 
                style={{ 
                  animationDelay: `${idx * 0.1}s`, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  cursor: 'pointer', 
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                  overflow: 'hidden',
                  background: 'var(--bg-glass)'
                }}
                onClick={() => navigate(`/lesson/${course.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                }}
              >
                {/* Image Section */}
                <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* Overlay Gradient */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(transparent, var(--bg-primary))' }}></div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, backgroundColor: 'var(--bg-glass)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{course.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', flex: 1, lineHeight: '1.5' }}>{course.description}</p>
                  
                  {/* Progress Bar */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                      <span>Progress</span>
                      <span style={{ color: course.progress > 0 ? 'var(--accent-secondary)' : 'inherit' }}>{course.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${course.progress}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', 
                        borderRadius: '3px',
                        transition: 'width 1s ease'
                      }}></div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
