
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DragDropQuestion } from '@/types/learning';
import { Check, X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface DragDropProps {
  question: DragDropQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const DragDropQuiz: React.FC<DragDropProps> = ({ question, onAnswer }) => {
  const [items, setItems] = useState([...question.items]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.setData('text/plain', id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItemId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === targetId) return;
    
    const itemsCopy = [...items];
    const draggedItemIndex = itemsCopy.findIndex(item => item.id === draggedItemId);
    const targetItemIndex = itemsCopy.findIndex(item => item.id === targetId);
    
    const [draggedItem] = itemsCopy.splice(draggedItemIndex, 1);
    itemsCopy.splice(targetItemIndex, 0, draggedItem);
    
    setItems(itemsCopy);
  };

  const handleSubmit = () => {
    // Check if the current order matches the correct order
    const isOrderCorrect = items.every((item, index) => 
      item.id === question.correctOrder[index]
    );
    
    setIsCorrect(isOrderCorrect);
    setHasSubmitted(true);
    onAnswer(question.id, isOrderCorrect);
    
    if (isOrderCorrect) {
      toast({
        title: "Correct!",
        description: "You've placed the items in the right order.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try again - the order is not quite right.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="question-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>
      
      <p className="text-sm text-muted-foreground mb-4">Drag the items to arrange them in the correct order.</p>
      
      <div className="space-y-2 mb-6">
        {items.map((item) => (
          <div 
            key={item.id}
            draggable={!hasSubmitted}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
            className={cn(
              "flex items-center rounded-lg border p-4 cursor-grab active:cursor-grabbing transition-colors",
              hasSubmitted && question.correctOrder.indexOf(item.id) === items.indexOf(item) && "border-green-500 bg-green-50",
              hasSubmitted && question.correctOrder.indexOf(item.id) !== items.indexOf(item) && "border-red-500 bg-red-50",
              !hasSubmitted && "hover:bg-muted"
            )}
          >
            <GripVertical className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
            <span className="flex-1">{item.text}</span>
            {hasSubmitted && question.correctOrder.indexOf(item.id) === items.indexOf(item) && (
              <Check className="h-5 w-5 text-green-500 ml-2" />
            )}
            {hasSubmitted && question.correctOrder.indexOf(item.id) !== items.indexOf(item) && (
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
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};
