import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { courses } from '../data/mockData';
import { PlayCircle, FileText, CheckCircle, Clock, BarChart } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId) || courses[0];

  return (
    <div className="app-container">
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {course.duration}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><BarChart size={16} /> {course.difficulty}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {course.topics.map(topic => (
              <span key={topic} style={{ background: 'rgba(126, 87, 194, 0.1)', color: 'var(--accent-primary)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                {topic}
              </span>
            ))}
          </div>
        </header>

        <section style={{ maxWidth: '900px' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Course Curriculum</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {course.lessons.map((lesson, idx) => (
              <div 
                key={lesson.id}
                className="glass-panel"
                style={{ 
                  padding: '1.5rem 2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (lesson.type === 'coding') navigate(`/problem/${lesson.problemId}`);
                }}
              >
                <div style={{ color: 'var(--accent-primary)' }}>
                  {lesson.type === 'theory' ? <FileText size={24} /> : 
                   lesson.type === 'coding' ? <PlayCircle size={24} /> : 
                   <CheckCircle size={24} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Lesson {idx + 1}</div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{lesson.title}</h4>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {lesson.type.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
