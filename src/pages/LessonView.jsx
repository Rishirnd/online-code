import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CodeEditor from '../components/CodeEditor';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const mockCourseData = {
  '1': {
    title: 'Two Sum',
    language: 'python',
    initialCode: 'def two_sum(nums, target):\n    # Write your code here\n    pass\n\nprint(two_sum([2, 7, 11, 15], 9))',
    content: `
# Lesson 1: Two Sum
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

## Example 1:
**Input:** \`nums = [2,7,11,15]\`, \`target = 9\`
**Output:** \`[0,1]\`
**Explanation:** Because \`nums[0] + nums[1] == 9\`, we return \`[0, 1]\`.

## Constraints:
* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
    `
  },
  '2': {
    title: 'Hello Async',
    language: 'javascript',
    initialCode: 'async function fetchGreeting() {\n  return new Promise(resolve => {\n    setTimeout(() => resolve("Hello, Async World!"), 1000);\n  });\n}\n\nfetchGreeting().then(console.log);',
    content: `
# Lesson 1: Async/Await
Welcome to modern JavaScript.

In this lesson, you will practice using Promises and \`async/await\`. Run the code on the right to see the asynchronous output in the terminal.
    `
  }
};

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = mockCourseData[id] || mockCourseData['1'];

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Sidebar collapsed={true} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <header style={{ height: '60px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 2rem', gap: '1rem', background: 'var(--bg-secondary)' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 1rem' }}></div>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{data.title}</h2>
          <div style={{ flex: 1 }}></div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem' }}>
            <CheckCircle size={16} /> Mark Complete
          </button>
        </header>

        {/* Split View */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Markdown Content */}
          <div style={{ width: '40%', minWidth: '300px', borderRight: '1px solid var(--border-color)', padding: '2rem', overflowY: 'auto', background: 'var(--bg-primary)' }}>
            <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n(.*)/g, '<p>$1</p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\`(.*?)\`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; font-family: monospace;">$1</code>') }} style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }} />
          </div>

          {/* Editor Content */}
          <div style={{ width: '60%', background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
            <CodeEditor initialCode={data.initialCode} language={data.language} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonView;
