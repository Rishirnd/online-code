export const domains = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    description: 'The foundation of efficient software. Master complexity and patterns.',
    skills: ['Problem Solving', 'Data Organization', 'Optimization'],
    languages: ['cpp', 'java', 'python'],
    courseCount: 12,
    icon: '🧩'
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Build modern, responsive web applications from frontend to backend.',
    skills: ['HTML/CSS', 'React', 'Node.js', 'APIs'],
    languages: ['javascript', 'typescript'],
    courseCount: 24,
    icon: '🌐'
  },
  {
    id: 'app-dev',
    name: 'App Development',
    description: 'Create native and cross-platform mobile experiences.',
    skills: ['UI/UX', 'State Management', 'Native APIs'],
    languages: ['kotlin', 'swift', 'dart'],
    courseCount: 8,
    icon: '📱'
  },
  {
    id: 'ml-ai',
    name: 'Machine Learning & AI',
    description: 'Train models to recognize patterns and make intelligent decisions.',
    skills: ['Statistics', 'Neural Networks', 'Deep Learning'],
    languages: ['python', 'r'],
    courseCount: 15,
    icon: '🤖'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect systems and data from malicious attacks.',
    skills: ['Ethical Hacking', 'Network Security', 'Encryption'],
    languages: ['python', 'bash', 'c'],
    courseCount: 10,
    icon: '🛡️'
  },
  {
    id: 'devops-cloud',
    name: 'Cloud & DevOps',
    description: 'Automate infrastructure and scale applications globally.',
    skills: ['Terraform', 'Docker', 'AWS', 'CI/CD'],
    languages: ['go', 'python', 'shell'],
    courseCount: 14,
    icon: '☁️'
  }
];

export const courses = [
  {
    id: 'c1',
    domainId: 'dsa',
    title: 'Mastering Linked Lists',
    difficulty: 'Intermediate',
    duration: '4h 30m',
    topics: ['Singly Linked Lists', 'Doubly Linked Lists', 'Circular Lists'],
    lessons: [
      { id: 'l1', type: 'theory', title: 'What is a Linked List?', content: 'Detailed theory about nodes and pointers...' },
      { id: 'l2', type: 'coding', title: 'Implement a Node', problemId: 'p1' },
      { id: 'l3', type: 'project', title: 'Mini Project: Music Playlist', description: 'Build a playlist manager using a DLL.' }
    ]
  },
  {
    id: 'c2',
    domainId: 'web-dev',
    title: 'React Design Patterns',
    difficulty: 'Advanced',
    duration: '6h 15m',
    topics: ['Composition', 'Render Props', 'HOCs', 'Custom Hooks'],
    lessons: [
      { id: 'l4', type: 'theory', title: 'Why Design Patterns?', content: 'Efficiency in React components...' },
      { id: 'l5', type: 'coding', title: 'Building a Custom Hook', problemId: 'p2' }
    ]
  }
];

export const starterTemplates = {
  python: 'def solution():\n    # Write your Python code here\n    pass',
  javascript: 'function solution() {\n    // Write your JavaScript code here\n}',
  cpp: '#include <iostream>\n\nint main() {\n    return 0;\n}',
  java: 'public class Solution {\n    public static void main(String[] args) {\n        // Code here\n    }\n}'
};

export const problems = [
  {
    id: 'p1',
    domainId: 'dsa',
    topicId: 'dsa', // Added for backward compatibility with ProblemList
    topic: 'Linked Lists',
    title: 'Reverse a Linked List',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list.',
    tags: ['Linked List', 'Pointers'],
    templates: starterTemplates
  },
  {
    id: 'p2',
    domainId: 'web-dev',
    topicId: 'web-dev', // Added for backward compatibility with ProblemList
    topic: 'Hooks',
    title: 'useLocalStorage Hook',
    difficulty: 'Medium',
    description: 'Create a hook that persists state to localStorage.',
    tags: ['React', 'Hooks', 'Persistence'],
    templates: starterTemplates
  }
];

export const topics = domains;
