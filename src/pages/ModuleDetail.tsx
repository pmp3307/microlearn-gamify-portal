
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { modules } from '@/data/moduleData';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Play, 
  BookOpen, HelpCircle, Award, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the module
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The module you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/modules')}>
            Return to Modules
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // State for tracking current section and progress
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({});
  
  const currentSection = module.sections[currentSectionIndex];
  const totalSections = module.sections.length;
  const overallProgress = Object.values(sectionProgress).filter(Boolean).length / totalSections * 100;
  
  // Handle quiz answers
  const handleQuizAnswer = (questionId: string, isCorrect: boolean) => {
    // Track correct answers
    if (isCorrect) {
      // In a real app we would update the user's progress
      console.log(`Correct answer for question ${questionId}`);
    }
  };
  
  // Mark section as complete
  const completeSection = () => {
    setSectionProgress({
      ...sectionProgress,
      [currentSection.id]: true
    });
    
    // Show completion toast
    toast({
      title: "Section Completed! 🎉",
      description: `You've completed "${currentSection.title}"`,
    });
    
    // Move to next section if available
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowQuiz(false);
    } else {
      // Module completed
      toast({
        title: "Module Completed! 🏆",
        description: `Congratulations! You've earned ${module.xpReward} XP.`,
      });
    }
  };
  
  // Handle video completion
  const handleVideoComplete = () => {
    setShowQuiz(true);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back navigation */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/modules')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
        </div>
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-muted-foreground mb-4">{module.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-sm">
                <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{totalSections} sections</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{module.estimatedMinutes} minutes</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Award className="h-4 w-4 mr-1 text-elearn-warning" />
                <span>{module.xpReward} XP reward</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>
        </div>
        
        {/* Section Navigation */}
        <div className="flex border rounded-md overflow-hidden mb-6 overflow-x-auto">
          {module.sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setCurrentSectionIndex(index);
                setShowQuiz(false);
              }}
              className={`flex-1 py-2 px-4 text-sm border-r last:border-r-0 whitespace-nowrap ${
                index === currentSectionIndex 
                  ? 'bg-elearn-blue text-white' 
                  : sectionProgress[section.id]
                  ? 'bg-green-50 text-green-700'
                  : 'bg-white'
              }`}
            >
              {sectionProgress[section.id] && (
                <CheckCircle className="h-4 w-4 inline mr-1" />
              )}
              {index + 1}. {section.title}
            </button>
          ))}
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList>
            <TabsTrigger value="content" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            {currentSection.videoUrl && (
              <TabsTrigger value="video" className="flex items-center">
                <Play className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
            )}
            {currentSection.questions.length > 0 && (
              <TabsTrigger value="quiz" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                Quiz
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="content" className="mt-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{currentSection.title}</h2>
              <div className="space-y-4">
                {currentSection.content.split('\n\n').map((paragraph, i) => {
                  // Check if this is a header (starts with #)
                  if (paragraph.startsWith('#')) {
                    const headerMatch = paragraph.match(/^(#+)\s+(.+)$/);
                    if (headerMatch) {
                      const level = headerMatch[1].length; // Number of # symbols
                      const content = headerMatch[2];
                      
                      switch (level) {
                        case 1:
                          return <h1 key={i} className="text-3xl font-bold mt-6 mb-3">{content}</h1>;
                        case 2:
                          return <h2 key={i} className="text-2xl font-bold mt-5 mb-3">{content}</h2>;
                        case 3:
                          return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{content}</h3>;
                        default:
                          return <h4 key={i} className="text-lg font-bold mt-3 mb-2">{content}</h4>;
                      }
                    }
                  }
                  
                  // Check if this is a list item
                  if (paragraph.match(/^(\d+\.|-)/) || paragraph.startsWith('  ')) {
                    return (
                      <ul key={i} className="list-disc pl-6 space-y-2">
                        {paragraph.split('\n').map((item, j) => {
                          // Replace markdown bold with HTML bold
                          const formattedItem = item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                          return <li key={j} dangerouslySetInnerHTML={{ __html: formattedItem }} />;
                        })}
                      </ul>
                    );
                  }
                  
                  // Regular paragraph with bold text support
                  const formattedParagraph = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
                })}
              </div>
            </div>
          </TabsContent>
          
          {currentSection.videoUrl && (
            <TabsContent value="video" className="mt-6">
              <VideoPlayer 
                videoUrl={currentSection.videoUrl} 
                onComplete={handleVideoComplete}
              />
              
              {showQuiz && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700 mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Video Completed!</h3>
                  </div>
                  <p className="text-sm text-green-800 mb-4">
                    Great job completing the video. Take the quiz to reinforce your learning.
                  </p>
                  <Button 
                    onClick={() => document.querySelector('[data-value="quiz"]')?.dispatchEvent(new Event('click'))}
                  >
                    Take Quiz
                  </Button>
                </div>
              )}
            </TabsContent>
          )}
          
          {currentSection.questions.length > 0 && (
            <TabsContent value="quiz" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Quiz: {currentSection.title}</h2>
                
                {currentSection.questions.map((question) => (
                  <QuestionRenderer 
                    key={question.id} 
                    question={question}
                    onAnswer={handleQuizAnswer}
                  />
                ))}
                
                <div className="flex justify-between mt-8">
                  {currentSectionIndex > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setCurrentSectionIndex(currentSectionIndex - 1);
                        setShowQuiz(false);
                      }}
                      className="flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous Section
                    </Button>
                  )}
                  
                  <Button 
                    onClick={completeSection}
                    className="ml-auto flex items-center"
                  >
                    {currentSectionIndex < totalSections - 1 ? (
                      <>
                        Next Section
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Complete Module
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ModuleDetail;
