
import React from 'react';
import { Question } from '@/types/learning';
import { MultipleChoiceQuiz } from './MultipleChoiceQuestion';
import { TrueFalseQuiz } from './TrueFalseQuestion';
import { DragDropQuiz } from './DragDropQuestion';
import { CheckboxQuiz } from './CheckboxQuestion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CircleHelp, FileQuestion, CheckSquare, ToggleLeft, MoveHorizontal } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, onAnswer }) => {
  // Function to determine the icon based on question type
  const getQuestionIcon = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <CircleHelp className="h-5 w-5 text-blue-500" />;
      case 'true-false':
        return <ToggleLeft className="h-5 w-5 text-green-500" />;
      case 'drag-drop':
        return <MoveHorizontal className="h-5 w-5 text-amber-500" />;
      case 'checkbox':
        return <CheckSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <FileQuestion className="h-5 w-5 text-slate-500" />;
    }
  };
  
  // Function to get the question type label
  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'true-false':
        return 'True or False';
      case 'drag-drop':
        return 'Drag & Drop';
      case 'checkbox':
        return 'Multiple Select';
      default:
        return 'Question';
    }
  };
  
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoiceQuiz question={question} onAnswer={onAnswer} />;
      case 'true-false':
        return <TrueFalseQuiz question={question} onAnswer={onAnswer} />;
      case 'drag-drop':
        return <DragDropQuiz question={question} onAnswer={onAnswer} />;
      case 'checkbox':
        return <CheckboxQuiz question={question} onAnswer={onAnswer} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };
  
  return (
    <Card className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-2 pb-2 bg-slate-50 border-b border-slate-100">
        {getQuestionIcon()}
        <span className="text-xs font-medium text-slate-500">{getQuestionTypeLabel()}</span>
      </CardHeader>
      <CardContent className="pt-4">
        {renderQuestion()}
      </CardContent>
    </Card>
  );
};
