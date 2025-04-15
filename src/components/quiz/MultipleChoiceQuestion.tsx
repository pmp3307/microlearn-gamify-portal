
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MultipleChoiceQuestion } from '@/types/learning';
import { Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <div className="question-card">
      <h3 className="text-lg font-medium text-slate-800 mb-4">{question.questionText}</h3>
      
      <RadioGroup 
        value={selectedChoice || ""} 
        onValueChange={setSelectedChoice}
        className="space-y-3"
        disabled={hasSubmitted}
      >
        {question.choices.map((choice) => (
          <motion.div 
            key={choice.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 * parseInt(choice.id) }}
            className={cn(
              "flex items-center rounded-lg border p-4 transition-all duration-200 cursor-pointer",
              !hasSubmitted && selectedChoice === choice.id ? "border-blue-400 bg-blue-50" : "hover:border-slate-300 hover:bg-slate-50",
              hasSubmitted && choice.isCorrect && "border-green-500 bg-green-50",
              hasSubmitted && selectedChoice === choice.id && !choice.isCorrect && "border-red-500 bg-red-50"
            )}
          >
            <RadioGroupItem value={choice.id} id={choice.id} className="mr-3" />
            <Label htmlFor={choice.id} className="flex-1 cursor-pointer">
              {choice.text}
            </Label>
            {hasSubmitted && choice.isCorrect && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Check className="h-5 w-5 text-green-500 ml-2" />
              </motion.div>
            )}
            {hasSubmitted && selectedChoice === choice.id && !choice.isCorrect && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <X className="h-5 w-5 text-red-500 ml-2" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </RadioGroup>

      {hasSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={cn(
            "mt-4 p-4 rounded-lg",
            isCorrect ? "bg-green-50 border border-green-100 text-green-800" : "bg-red-50 border border-red-100 text-red-800"
          )}
        >
          <div className="flex items-center">
            {isCorrect ? (
              <Check className="h-5 w-5 mr-2 text-green-500" />
            ) : (
              <X className="h-5 w-5 mr-2 text-red-500" />
            )}
            <p className="font-medium">
              {isCorrect ? "Correct! 🎉" : "Incorrect. Try again."}
            </p>
          </div>
          {question.explanation && (
            <div className="mt-2 pl-7">
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-slate-500 text-sm">
            <HelpCircle className="h-4 w-4 mr-1" />
            <span>Select one answer</span>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedChoice}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Check Answer
          </Button>
        </div>
      )}
    </div>
  );
};
