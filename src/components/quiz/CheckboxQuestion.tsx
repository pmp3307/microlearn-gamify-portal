
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckboxQuestion } from '@/types/learning';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxQuizProps {
  question: CheckboxQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const CheckboxQuiz: React.FC<CheckboxQuizProps> = ({ question, onAnswer }) => {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheckboxChange = (choiceId: string, checked: boolean) => {
    if (hasSubmitted) return;
    
    if (checked) {
      setSelectedChoices([...selectedChoices, choiceId]);
    } else {
      setSelectedChoices(selectedChoices.filter(id => id !== choiceId));
    }
  };

  const handleSubmit = () => {
    if (selectedChoices.length === 0) return;

    // Check if user has selected all correct choices and only correct choices
    const correctChoiceIds = question.choices
      .filter(choice => choice.isCorrect)
      .map(choice => choice.id);
    
    const allCorrectSelected = correctChoiceIds.every(id => selectedChoices.includes(id));
    const onlyCorrectSelected = selectedChoices.every(id => correctChoiceIds.includes(id));
    
    const correct = allCorrectSelected && onlyCorrectSelected;
    
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(question.id, correct);
  };

  return (
    <div className="question-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>
      
      <div className="space-y-3">
        {question.choices.map((choice) => (
          <div 
            key={choice.id}
            className={cn(
              "flex items-center rounded-lg border p-4",
              hasSubmitted && choice.isCorrect && "border-green-500 bg-green-50",
              hasSubmitted && selectedChoices.includes(choice.id) && !choice.isCorrect && "border-red-500 bg-red-50"
            )}
          >
            <Checkbox 
              id={choice.id} 
              checked={selectedChoices.includes(choice.id)}
              onCheckedChange={(checked) => handleCheckboxChange(choice.id, checked as boolean)}
              disabled={hasSubmitted}
              className="mr-3"
            />
            <Label htmlFor={choice.id} className="flex-1 cursor-pointer">
              {choice.text}
            </Label>
            {hasSubmitted && choice.isCorrect && (
              <Check className="h-5 w-5 text-green-500 ml-2" />
            )}
            {hasSubmitted && selectedChoices.includes(choice.id) && !choice.isCorrect && (
              <X className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        ))}
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
          disabled={selectedChoices.length === 0}
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};
