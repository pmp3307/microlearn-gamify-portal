
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { MarkdownContent } from '@/components/MarkdownContent';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, MapPin, Flag, Milestone, 
  TrendingUp, AlertTriangle, CheckCircle2
} from 'lucide-react';

const Roadmap = () => {
  // Track implementation status of roadmap features
  const phases = [
    {
      name: "Phase 1: Core Platform (MVP)",
      progress: 75,
      status: "in-progress",
      items: [
        { name: "Video Player Core", completed: true },
        { name: "Interactive Quiz Elements", completed: true },
        { name: "Learner Profile & Progress Tracking", completed: true },
        { name: "API Development", completed: false },
        { name: "Authentication", completed: false },
        { name: "Admin Dashboard", completed: false },
      ]
    },
    {
      name: "Phase 2: Enhanced Features",
      progress: 20,
      status: "planned",
      items: [
        { name: "Branching Scenarios", completed: false },
        { name: "AI-Generated Quizzes", completed: false },
        { name: "Personalized Recommendations", completed: false },
        { name: "XP System", completed: true },
        { name: "Team Challenges", completed: false },
        { name: "Mobile Optimization", completed: false },
      ]
    },
    {
      name: "Phase 3: Scaling",
      progress: 5,
      status: "future",
      items: [
        { name: "Load Testing", completed: false },
        { name: "Security Audit", completed: false },
        { name: "Subscription Flow", completed: false },
        { name: "Localization", completed: false },
      ]
    },
    {
      name: "Phase 4: Future Roadmap",
      progress: 0,
      status: "future",
      items: [
        { name: "AR Features", completed: false },
        { name: "Skills Certification", completed: false },
        { name: "Enterprise Features", completed: false },
      ]
    }
  ];

  // Full roadmap content
  const roadmapContent = `
# Project Roadmap

## Phase 1: Core Platform (MVP)

### Frontend
- Custom HTML5 video player with accessibility controls ✓
- Multiple quiz types (multiple choice, true/false, drag-and-drop) ✓
- Learner profile and progress tracking ✓
- Badge display system ✓

### Backend
- RESTful API endpoints (in progress)
- WebSocket for leaderboard and live Q&A
- JWT authentication and role-based permissions
- Structured database schema

### Admin Dashboard
- Content management system
- Video metadata editor
- Content scheduling calendar
- Basic analytics dashboard

## Phase 2: Enhanced Features

### Advanced Interactivity
- Branching scenarios with decision tree editor
- Conditional path tracking
- AI-generated quizzes from transcripts
- Personalized learning recommendations

### Gamification Expansion
- XP System with dynamic scoring ✓
- Team challenges and collaborative quests
- Improved leaderboard functionality ✓

### Mobile Optimization
- Progressive Web App implementation
- Offline mode via service workers
- Touch enhancements and haptic feedback

## Phase 3: Scaling

### Performance & Security
- Load testing for high concurrent users
- Database indexing optimization
- OWASP compliance measures
- Video content encryption

### Monetization & Localization
- Subscription flow with Stripe integration
- Free vs. premium content gating
- Internationalization and localization support
- Right-to-left layout support

## Phase 4: Future Extensions

- AR features with virtual instructor overlays
- Blockchain skills certification
- Enterprise features (custom branding, directory sync)

## Risk Management

- Video bandwidth cost mitigation with adaptive bitrate
- Strategies to improve quiz engagement
- Simplification of admin dashboard complexity

## Key Performance Indicators

- Target completion rate: >75%
- Daily active users: 10k
- Quiz attempt rate: 60%
- Admin task time: <5 min/video
  `;

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Project Roadmap</h1>
          <Badge 
            variant="outline" 
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 py-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            Phase 1 in progress
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, index) => (
            <div key={index} className="border rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{phase.name}</h3>
                <Badge 
                  variant="outline" 
                  className={`
                    ${phase.status === 'in-progress' ? 'bg-green-100 text-green-800' : 
                      phase.status === 'planned' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'} 
                    hover:bg-opacity-80
                  `}
                >
                  {phase.status === 'in-progress' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : phase.status === 'planned' ? (
                    <Calendar className="h-3 w-3 mr-1" />
                  ) : (
                    <Flag className="h-3 w-3 mr-1" />
                  )}
                  {phase.status === 'in-progress' ? 'In Progress' : 
                   phase.status === 'planned' ? 'Planned' : 'Future'}
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Completion</span>
                  <span>{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm">
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 mr-2 rounded-full border border-gray-300" />
                      )}
                      <span className={item.completed ? 'text-gray-700' : 'text-gray-500'}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border mt-8">
          <h2 className="text-xl font-bold mb-4">Missing Implementation Items</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Backend Integration</h3>
                <p className="text-gray-600">API endpoints, WebSocket for live Q&A, and authentication system are not yet implemented.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Admin Dashboard</h3>
                <p className="text-gray-600">Content management system for instructors and administrators is pending.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Advanced Interactivity</h3>
                <p className="text-gray-600">Branching scenarios and AI-powered features need implementation.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Mobile & PWA Features</h3>
                <p className="text-gray-600">Offline mode, improved mobile experience, and PWA capabilities are missing.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Monetization</h3>
                <p className="text-gray-600">Subscription flow and premium content gating have not been developed.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Complete Roadmap Documentation</h2>
          <div className="bg-white rounded-lg border p-6">
            <MarkdownContent content={roadmapContent} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Roadmap;
