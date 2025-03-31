
import { Module, Question } from '@/types/learning';

// Mock questions for Conflict Resolution module
const conflictQuestions: Question[] = [
  {
    id: 'q1',
    type: 'drag-drop',
    questionText: 'Sort the actions, starting from the most appropriate to least appropriate response to this scenario.',
    items: [
      { id: 'item1', text: 'Hold a team meeting and remind everyone about the anti-bullying policies', category: 'appropriate' },
      { id: 'item2', text: 'Hold separate discreet meetings with the employees gossiping and the victim of the rumours to find out more about what is going on', category: 'appropriate' },
      { id: 'item3', text: 'Confront the employees gossiping', category: 'appropriate' }
    ],
    categories: ['appropriate']
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    questionText: 'What is the most effective first step when dealing with team conflict?',
    choices: [
      { id: 'c1', text: 'Immediately discipline both parties', isCorrect: false },
      { id: 'c2', text: 'Listen to all parties involved separately', isCorrect: true },
      { id: 'c3', text: 'Ignore it and hope it resolves itself', isCorrect: false },
      { id: 'c4', text: 'Take the side of the more senior employee', isCorrect: false }
    ]
  },
  {
    id: 'q3',
    type: 'true-false',
    questionText: 'When resolving a conflict, it is always best to have all parties discuss the issue in a group setting.',
    correctAnswer: false
  }
];

// Mock questions for Disciplinary Meetings module
const disciplinaryQuestions: Question[] = [
  {
    id: 'q4',
    type: 'drag-drop',
    questionText: 'Which actions require a disciplinary meeting, a verbal warning, or no formal action at all?',
    items: [
      { id: 'item1', text: 'A team member is late twice in a week', category: 'verbal' },
      { id: 'item2', text: 'There is evidence of an employee threatening their colleague', category: 'disciplinary' },
      { id: 'item3', text: 'Turning up for work whilst intoxicated/on drugs', category: 'disciplinary' },
      { id: 'item4', text: 'A team member forgets to check their email inbox', category: 'none' },
      { id: 'item5', text: 'An employee has been posting protected customer data on social media', category: 'disciplinary' }
    ],
    categories: ['disciplinary', 'verbal', 'none']
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    questionText: 'What is an essential element of a proper disciplinary meeting?',
    choices: [
      { id: 'c1', text: 'Having multiple managers present to intimidate the employee', isCorrect: false },
      { id: 'c2', text: 'Allowing the employee to bring a representative', isCorrect: true },
      { id: 'c3', text: 'Conducting the meeting in a public area', isCorrect: false },
      { id: 'c4', text: 'Making an immediate decision without investigation', isCorrect: false }
    ]
  }
];

// Mock questions for Data Security module
const securityQuestions: Question[] = [
  {
    id: 'q6',
    type: 'checkbox',
    questionText: 'What actions should you take in this scenario?',
    choices: [
      { id: 'c1', text: 'Reassure the team member', isCorrect: false },
      { id: 'c2', text: 'Notify clients about the data breach and what files have been accessed', isCorrect: true },
      { id: 'c3', text: 'Ask the employee to change their password', isCorrect: true },
      { id: 'c4', text: 'Remind the team of their data protection training', isCorrect: true }
    ]
  },
  {
    id: 'q7',
    type: 'true-false',
    questionText: 'If a data breach occurs, it is acceptable to delay reporting it if it might damage company reputation.',
    correctAnswer: false
  }
];

// Mock questions for Anti-fraud module
const fraudQuestions: Question[] = [
  {
    id: 'q8',
    type: 'drag-drop',
    questionText: 'Sort the statements into true or false.',
    items: [
      { id: 'item1', text: 'It\'s okay as it hasn\'t affected the quarterly budget too much', category: 'false' },
      { id: 'item2', text: 'Proof of this is viable for termination of employment', category: 'true' },
      { id: 'item3', text: 'This is grounds for a formal investigation', category: 'true' },
      { id: 'item4', text: 'This is a clear violation of our anti-fraud policy', category: 'true' },
      { id: 'item5', text: 'The colleague was wrong to report their peer', category: 'false' }
    ],
    categories: ['true', 'false']
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    questionText: 'If you suspect fraudulent activity in your team, what should be your first action?',
    choices: [
      { id: 'c1', text: 'Confront the suspected employee directly', isCorrect: false },
      { id: 'c2', text: 'Gather evidence and document your observations', isCorrect: true },
      { id: 'c3', text: 'Discuss your suspicions with other team members', isCorrect: false },
      { id: 'c4', text: 'Ignore it if the amounts are small', isCorrect: false }
    ]
  }
];

// Mock modules
export const modules: Module[] = [
  {
    id: 'module1',
    title: 'Conflict Resolution for Managers',
    description: 'Learn effective strategies to manage team conflicts professionally and productively.',
    imageUrl: '/lovable-uploads/6b7b5b78-6fb4-4aea-9a6b-f0886c195276.png',
    sections: [
      {
        id: 'section1',
        title: 'Understanding Conflict Types',
        content: 'Conflicts can arise from various sources including miscommunication, competing priorities, personal differences, and role ambiguity. As a manager, identifying the type of conflict is the first step toward resolution.',
        questions: []
      },
      {
        id: 'section2',
        title: 'Rumour Management',
        content: 'Workplace gossip can damage team morale and create toxic environments. This section covers how to address rumors professionally and restore team harmony.',
        videoUrl: 'https://example.com/videos/rumor-management.mp4',
        questions: conflictQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    xpReward: 200
  },
  {
    id: 'module2',
    title: 'Disciplinary Meetings',
    description: 'Guide to conducting fair and effective disciplinary meetings with team members.',
    imageUrl: '/lovable-uploads/18082a6b-bbab-420c-9b1e-ab626f5d75a4.png',
    sections: [
      {
        id: 'section3',
        title: 'Preparation and Documentation',
        content: 'Before conducting a disciplinary meeting, proper preparation is essential. This includes gathering evidence, reviewing company policies, and understanding the appropriate level of action required.',
        questions: []
      },
      {
        id: 'section4',
        title: 'Meeting Structure',
        content: 'A well-structured disciplinary meeting ensures fairness and clarity. Learn the key components that should be included in every disciplinary conversation.',
        videoUrl: 'https://example.com/videos/disciplinary-structure.mp4',
        questions: disciplinaryQuestions
      }
    ],
    difficulty: 'advanced',
    estimatedMinutes: 60,
    xpReward: 250
  },
  {
    id: 'module3',
    title: 'Data Security for Teams',
    description: 'Essential practices for maintaining data security and responding to breaches.',
    imageUrl: '/lovable-uploads/a43f43fe-6f46-45bc-a6f1-a2c69731f04a.png',
    sections: [
      {
        id: 'section5',
        title: 'Preventing Data Breaches',
        content: 'Security is everyone\'s responsibility. Learn preventative measures that every team member should be practicing to safeguard company and client data.',
        questions: []
      },
      {
        id: 'section6',
        title: 'Responding to Security Incidents',
        content: 'When a security incident occurs, a quick and appropriate response is critical. This section outlines the steps managers should take to contain and address data breaches.',
        videoUrl: 'https://example.com/videos/security-response.mp4',
        questions: securityQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    xpReward: 220
  },
  {
    id: 'module4',
    title: 'Fraud Prevention and Reporting',
    description: 'Understanding anti-fraud measures and proper reporting procedures.',
    imageUrl: '/lovable-uploads/f1f41745-a85b-4b53-9ad1-60ec3d1a42c0.png',
    sections: [
      {
        id: 'section7',
        title: 'Recognizing Fraud Indicators',
        content: 'Fraud can take many forms in the workplace. This section helps managers identify potential warning signs of fraudulent activities.',
        questions: []
      },
      {
        id: 'section8',
        title: 'Reporting Procedures',
        content: 'Proper documentation and reporting channels are essential when addressing potential fraud. Learn the correct protocols to follow when fraud is suspected.',
        videoUrl: 'https://example.com/videos/fraud-reporting.mp4',
        questions: fraudQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    xpReward: 180
  },
  {
    id: 'module5',
    title: 'Prioritizing Tasks as a Scrum Master',
    description: 'Learn effective strategies for prioritizing tasks using MoSCoW, business value, and delegation techniques.',
    imageUrl: '/lovable-uploads/f664884d-2c7d-48d6-bb26-8af576fcb9e9.png',
    sections: [
      {
        id: 'section9',
        title: 'MoSCoW Prioritization',
        content: 'The MoSCoW method (Must have, Should have, Could have, Won\'t have) helps teams prioritize requirements based on importance and urgency.',
        questions: []
      },
      {
        id: 'section10',
        title: 'Business Value Assessment',
        content: 'Learn how to evaluate tasks based on their business value to ensure team efforts align with organizational goals.',
        videoUrl: 'https://example.com/videos/business-value.mp4',
        questions: []
      }
    ],
    difficulty: 'beginner',
    estimatedMinutes: 35,
    xpReward: 150
  }
];

// User progress mock data
export const userProgress = {
  completedModules: ['module1'],
  inProgressModules: ['module2'],
  xpPoints: 1250,
  level: 3,
  badges: [
    { id: 'badge1', name: 'First Module', description: 'Completed your first module', iconUrl: '🏆', earnedAt: new Date(2023, 5, 15) },
    { id: 'badge2', name: 'Perfect Quiz', description: 'Scored 100% on a quiz', iconUrl: '🎯', earnedAt: new Date(2023, 5, 20) },
    { id: 'badge3', name: 'Fast Learner', description: 'Completed a module in record time', iconUrl: '⚡', earnedAt: new Date(2023, 6, 1) }
  ]
};

// Leaderboard mock data
export const leaderboardData = [
  { userId: 'user1', name: 'John Doe', xpPoints: 1250, level: 3, recentBadges: userProgress.badges },
  { userId: 'user2', name: 'Jane Smith', xpPoints: 1820, level: 4, recentBadges: [] },
  { userId: 'user3', name: 'Robert Johnson', xpPoints: 2150, level: 5, recentBadges: [] },
  { userId: 'user4', name: 'Emily Wilson', xpPoints: 980, level: 2, recentBadges: [] },
  { userId: 'user5', name: 'Michael Brown', xpPoints: 1540, level: 3, recentBadges: [] },
  { userId: 'user6', name: 'Sarah Davis', xpPoints: 3200, level: 7, recentBadges: [] },
  { userId: 'user7', name: 'James Miller', xpPoints: 2780, level: 6, recentBadges: [] },
  { userId: 'user8', name: 'Jennifer Wilson', xpPoints: 1120, level: 3, recentBadges: [] },
  { userId: 'user9', name: 'David Taylor', xpPoints: 890, level: 2, recentBadges: [] },
  { userId: 'user10', name: 'Lisa Anderson', xpPoints: 2400, level: 5, recentBadges: [] }
];
