
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MultipleChoiceQuestion } from '@/types/learning';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceProps> = ({ question, onAnswer }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedChoice) return;
    
    const choice = question.choices.find(c => c.id === selectedChoice);
    const correct = choice?.isCorrect || false;
    
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(question.id, correct);
  };

  return (
    <div className="question-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>
      
      <RadioGroup 
        value={selectedChoice || ""} 
        onValueChange={setSelectedChoice}
        className="space-y-3"
        disabled={hasSubmitted}
      >
        {question.choices.map((choice) => (
          <div 
            key={choice.id}
            className={cn(
              "flex items-center rounded-lg border p-4",
              hasSubmitted && choice.isCorrect && "border-green-500 bg-green-50",
              hasSubmitted && selectedChoice === choice.id && !choice.isCorrect && "border-red-500 bg-red-50"
            )}
          >
            <RadioGroupItem value={choice.id} id={choice.id} className="mr-3" />
            <Label htmlFor={choice.id} className="flex-1 cursor-pointer">
              {choice.text}
            </Label>
            {hasSubmitted && choice.isCorrect && (
              <Check className="h-5 w-5 text-green-500 ml-2" />
            )}
            {hasSubmitted && selectedChoice === choice.id && !choice.isCorrect && (
              <X className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        ))}
      </RadioGroup>

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
          disabled={!selectedChoice}
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};
