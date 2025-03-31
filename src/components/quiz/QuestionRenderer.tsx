
import React from 'react';
import { Question } from '@/types/learning';
import { MultipleChoiceQuiz } from './MultipleChoiceQuestion';
import { TrueFalseQuiz } from './TrueFalseQuestion';
import { DragDropQuiz } from './DragDropQuestion';
import { CheckboxQuiz } from './CheckboxQuestion';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, onAnswer }) => {
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
