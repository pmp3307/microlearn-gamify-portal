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
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({});
  
  const currentSection = module.sections[currentSectionIndex];
  const totalSections = module.sections.length;
  const overallProgress = Object.values(sectionProgress).filter(Boolean).length / totalSections * 100;
  
  const handleQuizAnswer = (questionId: string, isCorrect: boolean) => {
    if (isCorrect) {
      console.log(`Correct answer for question ${questionId}`);
    }
  };
  
  const completeSection = () => {
    setSectionProgress({
      ...sectionProgress,
      [currentSection.id]: true
    });
    
    toast({
      title: "Section Completed! 🎉",
      description: `You've completed "${currentSection.title}"`,
    });
    
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowQuiz(false);
    } else {
      toast({
        title: "Module Completed! 🏆",
        description: `Congratulations! You've earned ${module.xpReward} XP.`,
      });
    }
  };
  
  const handleVideoComplete = () => {
    setShowQuiz(true);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/modules')}
            className="flex items-center group text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Modules
          </Button>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{module.title}</h1>
                <p className="text-slate-600 mb-4">{module.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm bg-white/80 py-1 px-3 rounded-full">
                    <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{totalSections} sections</span>
                  </div>
                  
                  <div className="flex items-center text-sm bg-white/80 py-1 px-3 rounded-full">
                    <Clock className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{module.estimatedMinutes} minutes</span>
                  </div>
                  
                  <div className="flex items-center text-sm bg-white/80 py-1 px-3 rounded-full">
                    <Award className="h-4 w-4 mr-1 text-purple-500" />
                    <span>{module.xpReward} XP reward</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-slate-700">Progress</span>
                    <span className="font-medium text-blue-600">{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2 bg-blue-100" indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-4">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-medium text-slate-800">Module Sections</h3>
              </div>
              <nav className="p-2">
                {module.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSectionIndex(index);
                      setShowQuiz(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg my-1 flex items-center transition-colors ${
                      index === currentSectionIndex 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : sectionProgress[section.id]
                        ? 'bg-green-50 text-green-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <span className="truncate">{section.title}</span>
                    {sectionProgress[section.id] && (
                      <CheckCircle className="h-4 w-4 ml-auto text-green-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="content" className="w-full">
              <div className="bg-white rounded-t-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-slate-800">{currentSection.title}</h2>
                  {sectionProgress[currentSection.id] && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </span>
                  )}
                </div>

                <TabsList className="bg-slate-100">
                  <TabsTrigger value="content" className="data-[state=active]:bg-white flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                  {currentSection.videoUrl && (
                    <TabsTrigger value="video" className="data-[state=active]:bg-white flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      Video
                    </TabsTrigger>
                  )}
                  {currentSection.questions.length > 0 && (
                    <TabsTrigger value="quiz" className="data-[state=active]:bg-white flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Quiz
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              
              <div className="bg-white rounded-b-xl shadow-sm border-x border-b border-slate-200">
                <TabsContent value="content" className="m-0 p-6">
                  <div className="prose max-w-none">
                    <div className="space-y-4">
                      {currentSection.content.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('#')) {
                          const headerMatch = paragraph.match(/^(#+)\s+(.+)$/);
                          if (headerMatch) {
                            const level = headerMatch[1].length;
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
                        
                        if (paragraph.match(/^(\d+\.|-)/) || paragraph.startsWith('  ')) {
                          return (
                            <ul key={i} className="list-disc pl-6 space-y-2">
                              {paragraph.split('\n').map((item, j) => {
                                const formattedItem = item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                                return <li key={j} dangerouslySetInnerHTML={{ __html: formattedItem }} />;
                              })}
                            </ul>
                          );
                        }
                        
                        const formattedParagraph = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                        return <p key={i} dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
                      })}
                    </div>
                  </div>
                </TabsContent>
                
                {currentSection.videoUrl && (
                  <TabsContent value="video" className="m-0 p-0">
                    <div className="border-t border-slate-100">
                      <VideoPlayer 
                        videoUrl={currentSection.videoUrl} 
                        onComplete={handleVideoComplete}
                      />
                      
                      {showQuiz && (
                        <div className="p-5 m-4 bg-green-50 border border-green-100 rounded-xl">
                          <div className="flex items-center text-green-800 mb-2">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                            <h3 className="font-medium">Video Completed!</h3>
                          </div>
                          <p className="text-sm text-green-700 mb-4">
                            Great job completing the video. Take the quiz to reinforce your learning and earn XP.
                          </p>
                          <Button 
                            onClick={() => document.querySelector('[data-value="quiz"]')?.dispatchEvent(new Event('click'))}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Take Quiz
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
                
                {currentSection.questions.length > 0 && (
                  <TabsContent value="quiz" className="m-0 p-6">
                    <div className="space-y-6">
                      <div className="space-y-6">
                        {currentSection.questions.map((question) => (
                          <QuestionRenderer 
                            key={question.id} 
                            question={question}
                            onAnswer={handleQuizAnswer}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>

            <div className="flex justify-between mt-6">
              {currentSectionIndex > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentSectionIndex(currentSectionIndex - 1);
                    setShowQuiz(false);
                  }}
                  className="flex items-center group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Previous Section
                </Button>
              )}
              
              <Button 
                onClick={completeSection}
                className={`ml-auto flex items-center group ${
                  currentSectionIndex < totalSections - 1 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {currentSectionIndex < totalSections - 1 ? (
                  <>
                    Next Section
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
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
        </div>
      </div>
    </MainLayout>
  );
};

export default ModuleDetail;
