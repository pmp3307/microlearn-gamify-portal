
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrueFalseQuestion } from '@/types/learning';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrueFalseProps {
  question: TrueFalseQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const TrueFalseQuiz: React.FC<TrueFalseProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(question.id, correct);
  };

  return (
    <div className="question-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={selectedAnswer === true ? "default" : "outline"}
          onClick={() => !hasSubmitted && setSelectedAnswer(true)}
          className={cn(
            hasSubmitted && question.correctAnswer === true && "bg-green-500 hover:bg-green-600 border-green-500",
            hasSubmitted && selectedAnswer === true && question.correctAnswer === false && "bg-red-500 hover:bg-red-600 border-red-500"
          )}
          disabled={hasSubmitted}
        >
          True
          {hasSubmitted && question.correctAnswer === true && (
            <Check className="ml-2 h-4 w-4" />
          )}
          {hasSubmitted && selectedAnswer === true && question.correctAnswer === false && (
            <X className="ml-2 h-4 w-4" />
          )}
        </Button>
        
        <Button
          type="button"
          variant={selectedAnswer === false ? "default" : "outline"}
          onClick={() => !hasSubmitted && setSelectedAnswer(false)}
          className={cn(
            hasSubmitted && question.correctAnswer === false && "bg-green-500 hover:bg-green-600 border-green-500",
            hasSubmitted && selectedAnswer === false && question.correctAnswer === true && "bg-red-500 hover:bg-red-600 border-red-500"
          )}
          disabled={hasSubmitted}
        >
          False
          {hasSubmitted && question.correctAnswer === false && (
            <Check className="ml-2 h-4 w-4" />
          )}
          {hasSubmitted && selectedAnswer === false && question.correctAnswer === true && (
            <X className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>

      {hasSubmitted ? (
        <div className={cn(
          "mt-4 p-3 rounded-lg",
          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}>
          <p className="font-medium">
            {isCorrect ? "Correct! 🎉" : "Incorrect. Try again."}
          </p>
          {question.explanation && (
            <p className="mt-1 text-sm">{question.explanation}</p>
          )}
        </div>
      ) : (
        <Button 
          onClick={handleSubmit} 
          className="mt-4" 
          disabled={selectedAnswer === null}
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};
