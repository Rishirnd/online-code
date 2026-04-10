import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { problems, starterTemplates } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  Play, 
  Send, 
  ChevronDown, 
  Settings, 
  Maximize2,
  Terminal,
  FileText
} from 'lucide-react';

const ProblemEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preferredLanguage, setPreferredLanguage } = useLanguage();
  const problem = problems.find(p => p.id === id) || problems[0];

  const [language, setLanguage] = useState(preferredLanguage);
  const [code, setCode] = useState(starterTemplates[preferredLanguage] || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    setLanguage(preferredLanguage);
    setCode(starterTemplates[preferredLanguage] || '');
  }, [preferredLanguage]);

  const extensions = language === 'python' ? [python()] : [javascript({ jsx: true })];

  const handleRun = () => {
    setIsRunning(true);
    setOutput('> Executing standard tests...\n');
    setTimeout(() => {
      setOutput(prev => prev + '✓ Test Case 1: Passed\n✓ Test Case 2: Passed\n\n[SUCCESS] Solution validated in 42ms.');
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-main)', overflow: 'hidden' }}>
      <Sidebar collapsed={true} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* IDE Toolbar */}
        <header style={{ 
          height: '50px', 
          background: 'var(--bg-card)', 
          borderBottom: '1px solid var(--border-main)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'transparent', color: 'var(--text-dim)' }}><ArrowLeft size={18} /></button>
            <div style={{ height: '20px', width: '1px', background: 'var(--border-main)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{problem.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <select 
                value={language}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border-main)', 
                  color: 'var(--text-main)', 
                  padding: '0.3rem 2rem 0.3rem 0.75rem', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="python">Python 3.10</option>
                <option value="javascript">Node.js 18</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
            </div>

            <button className="btn-primary" onClick={handleRun} disabled={isRunning} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={14} /> {isRunning ? 'Running...' : 'Run'}
            </button>
            <button style={{ background: 'var(--accent-secondary)', color: 'white', padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={14} /> Submit
            </button>
            <div style={{ height: '20px', width: '1px', background: 'var(--border-main)', margin: '0 0.25rem' }}></div>
            <button style={{ background: 'transparent', color: 'var(--text-muted)' }}><Settings size={18} /></button>
            <button style={{ background: 'transparent', color: 'var(--text-muted)' }}><Maximize2 size={18} /></button>
          </div>
        </header>

        {/* Dual Pane Editor */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Problem Sidebar */}
          <div style={{ width: '450px', borderRight: '1px solid var(--border-main)', overflowY: 'auto', background: 'var(--bg-main)' }}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                <FileText size={16} /> Problem Description
              </div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{problem.title}</h1>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ background: 'rgba(0,230,118,0.1)', color: '#00e676', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{problem.difficulty}</span>
                <span style={{ background: 'var(--bg-card)', color: 'var(--text-dim)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>SQL</span>
                <span style={{ background: 'var(--bg-card)', color: 'var(--text-dim)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>Array</span>
              </div>
              
              <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                <p style={{ marginBottom: '1.5rem' }}>{problem.description}</p>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Challenge Constraints:</h4>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                  <li>Array size: 10<sup>5</sup></li>
                  <li>Memory limit: 256MB</li>
                  <li>Time limit: 1000ms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#282a36' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <CodeMirror
                value={code}
                height="100%"
                theme={dracula}
                extensions={extensions}
                onChange={(val) => setCode(val)}
                style={{ fontSize: `${config.fontSize}px` }}
              />
            </div>
            
            {/* Console Output */}
            <div style={{ height: '220px', background: 'var(--bg-main)', borderTop: '4px solid var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '40px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: `${Math.max(12, config.fontSize - 2)}px`, fontWeight: '600' }}>
                  <Terminal size={14} /> Terminal
                </div>
              </div>
              <div style={{ flex: 1, padding: '1rem', color: '#8b5cf6', fontFamily: 'JetBrains Mono, monospace', fontSize: `${Math.max(12, config.fontSize - 2)}px`, whiteSpace: 'pre-wrap' }}>
                {output || '> Ready for input. Write your solution and click "Run".'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
