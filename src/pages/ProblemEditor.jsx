import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { problems, starterTemplates } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Play, Send, ChevronDown, CheckCircle } from 'lucide-react';

const ProblemEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preferredLanguage, setPreferredLanguage } = useLanguage();
  const problem = problems.find(p => p.id === id) || problems[0];

  const [language, setLanguage] = useState(preferredLanguage);
  const [code, setCode] = useState(starterTemplates[preferredLanguage] || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Sync with global language change
  React.useEffect(() => {
    setLanguage(preferredLanguage);
    setCode(starterTemplates[preferredLanguage] || '');
  }, [preferredLanguage]);

  const extensions = language === 'python' ? [python()] : [javascript({ jsx: true })];

  const handleRun = () => {
    setIsRunning(true);
    setOutput('> Running tests...\n');
    setTimeout(() => {
      setOutput(prev => prev + '> Case 1: Success\n> Case 2: Success\n\n🎉 All tests passed!');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    console.log('Submitted code:', { problemId: id, language, code });
    alert('Code submitted! Results will be available in your profile.');
  };

  return (
    <div className="app-container" style={{ overflow: 'hidden' }}>
      <Sidebar collapsed={true} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Editor Navbar */}
        <header style={{ 
          height: '60px', 
          background: 'var(--bg-secondary)', 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              onClick={() => navigate(-1)}
              style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={18} />
            </button>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{problem.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border-color)', 
                  color: 'white', 
                  padding: '0.4rem 2rem 0.4rem 1rem', 
                  borderRadius: '6px', 
                  appearance: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
            </div>

            <button 
              className="btn-secondary" 
              onClick={handleRun}
              disabled={isRunning}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={16} /> {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSubmit}
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Send size={16} /> Submit
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left: Description */}
          <div style={{ 
            width: '40%', 
            minWidth: '400px', 
            borderRight: '1px solid var(--border-color)', 
            padding: '2rem', 
            overflowY: 'auto',
            background: 'var(--bg-primary)'
          }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Description</h3>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1.5rem' }}>{problem.description}</p>
              
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Examples</h4>
              {problem.examples.map((ex, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '0.4rem', fontWeight: 'bold' }}>Input:</div>
                  <code style={{ display: 'block', marginBottom: '0.8rem', fontFamily: 'monospace' }}>{ex.input}</code>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', marginBottom: '0.4rem', fontWeight: 'bold' }}>Output:</div>
                  <code style={{ display: 'block', fontFamily: 'monospace' }}>{ex.output}</code>
                </div>
              ))}

              <h4 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Constraints</h4>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                <li>2 &le; nums.length &le; 10^4</li>
                <li>-10^9 &le; nums[i] &le; 10^9</li>
                <li>-10^9 &le; target &le; 10^9</li>
              </ul>
            </div>
          </div>

          {/* Right: Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#282a36' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <CodeMirror
                value={code}
                height="100%"
                theme={dracula}
                extensions={extensions}
                onChange={(val) => setCode(val)}
                style={{ fontSize: '14px' }}
              />
            </div>
            
            {/* Terminal Area */}
            <div style={{ height: '200px', background: '#1e1e1e', borderTop: '2px solid rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.5rem 1rem', background: '#252526', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Console Output
              </div>
              <div style={{ flex: 1, padding: '1rem', color: '#00e676', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {output || '> System ready. Choose your language and click "Run Code" to begin.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
