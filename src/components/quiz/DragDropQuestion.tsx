
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { DragDropQuestion, DragDropItem } from '@/types/learning';
import { cn } from '@/lib/utils';

interface DragDropQuizProps {
  question: DragDropQuestion;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const DragDropQuiz: React.FC<DragDropQuizProps> = ({ question, onAnswer }) => {
  // Create a state object for each category with initially empty arrays
  const [categorizedItems, setCategorizedItems] = useState<Record<string, DragDropItem[]>>(
    question.categories.reduce((acc, category) => ({ ...acc, [category]: [] }), {})
  );
  
  // Items that haven't been dragged yet
  const [remainingItems, setRemainingItems] = useState<DragDropItem[]>([...question.items]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const dragItem = useRef<DragDropItem | null>(null);
  const dragItemSource = useRef<'remaining' | string>('remaining');

  const handleDragStart = (item: DragDropItem, source: 'remaining' | string) => {
    dragItem.current = item;
    dragItemSource.current = source;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCategory: string) => {
    e.preventDefault();
    
    if (!dragItem.current) return;
    
    // Remove the item from its source
    if (dragItemSource.current === 'remaining') {
      setRemainingItems(prev => prev.filter(item => item.id !== dragItem.current!.id));
    } else {
      setCategorizedItems(prev => ({
        ...prev,
        [dragItemSource.current]: prev[dragItemSource.current].filter(item => item.id !== dragItem.current!.id)
      }));
    }
    
    // Add the item to the target category
    setCategorizedItems(prev => ({
      ...prev,
      [targetCategory]: [...prev[targetCategory], dragItem.current!]
    }));
    
    dragItem.current = null;
  };

  const handleSubmit = () => {
    // Check if all items have been categorized
    if (remainingItems.length > 0) return;

    // Check if items are correctly categorized
    const allCorrect = question.items.every(item => {
      const category = Object.keys(categorizedItems).find(cat => 
        categorizedItems[cat].some(catItem => catItem.id === item.id)
      );
      return category === item.category;
    });

    setIsCorrect(allCorrect);
    setHasSubmitted(true);
    onAnswer(question.id, allCorrect);
  };

  const resetQuiz = () => {
    setCategorizedItems(question.categories.reduce((acc, category) => ({ ...acc, [category]: [] }), {}));
    setRemainingItems([...question.items]);
    setHasSubmitted(false);
  };

  return (
    <div className="question-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>
      
      {/* Items to drag */}
      {!hasSubmitted && remainingItems.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Drag these items to the appropriate categories:</div>
          <div className="flex flex-wrap gap-2">
            {remainingItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item, 'remaining')}
                className="drag-item"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Categories to drop into */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {question.categories.map(category => (
          <div key={category} className="space-y-2">
            <div className="font-medium capitalize">{category}</div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className={cn(
                "drop-target",
                hasSubmitted && "border-none"
              )}
            >
              {categorizedItems[category].length === 0 && !hasSubmitted && (
                <div className="text-center text-gray-400">Drop some answers here</div>
              )}
              
              {categorizedItems[category].map(item => (
                <div 
                  key={item.id}
                  draggable={!hasSubmitted}
                  onDragStart={() => handleDragStart(item, category)}
                  className={cn(
                    "drag-item",
                    hasSubmitted && item.category === category && "bg-green-500",
                    hasSubmitted && item.category !== category && "bg-red-500"
                  )}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasSubmitted ? (
        <div className="flex flex-col space-y-4">
          <div className={cn(
            "p-3 rounded-lg",
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            <p className="font-medium">
              {isCorrect ? "Correct! All items are in the right categories. 🎉" : "Some items are in the wrong categories. Try again."}
            </p>
          </div>
          {!isCorrect && (
            <Button onClick={resetQuiz} variant="outline">
              Reset and Try Again
            </Button>
          )}
        </div>
      ) : (
        <Button 
          onClick={handleSubmit} 
          className="mt-4" 
          disabled={remainingItems.length > 0}
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};
