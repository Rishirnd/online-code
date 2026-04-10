import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Play, RotateCcw } from 'lucide-react';
import axios from 'axios';

const CodeEditor = ({ initialCode = '', language = 'python' }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const extensions = language === 'python' ? [python()] : [javascript({ jsx: true })];

  const onChange = useCallback((val) => {
    setCode(val);
  }, []);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');
    try {
      const res = await axios.post('http://localhost:3001/execute', {
        language,
        code
      });
      setOutput(res.data.output || 'No output.');
    } catch (err) {
      setOutput(err.response?.data?.error || err.message || 'Execution failed.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Editor Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', background: '#282a36', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '1rem' }}>
          <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--accent-secondary)' }}>{language}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setCode(initialCode)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.4rem', 
              background: 'var(--accent-secondary)', color: '#000', 
              border: 'none', borderRadius: '4px', padding: '0.4rem 1rem', 
              cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 'bold' 
            }}
          >
            <Play size={14} /> {isRunning ? 'Running' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Editor Space */}
      <div style={{ flex: '1 1 60%', overflow: 'auto', background: '#282a36' }}>
        <CodeMirror
          value={code}
          height="100%"
          theme={dracula}
          extensions={extensions}
          onChange={onChange}
          style={{ fontSize: '14px', fontFamily: '"Fira Code", monospace' }}
        />
      </div>

      {/* Terminal Output */}
      <div style={{ flex: '0 0 30%', borderTop: '2px solid rgba(0,0,0,0.5)', background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0.5rem 1rem', background: '#252526', color: '#ccc', fontSize: '0.8rem', textTransform: 'uppercase', userSelect: 'none' }}>
          Terminal Output
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', color: '#00e676', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
          {output || '> Ready.'}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
