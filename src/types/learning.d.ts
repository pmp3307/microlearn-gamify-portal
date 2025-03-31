
// Question Types
export interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'drag-drop' | 'checkbox';
  questionText: string;
  explanation?: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  choices: Choice[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  items: Array<{
    id: string;
    text: string;
  }>;
  correctOrder: string[]; // Array of item IDs in the correct order
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  choices: Choice[];
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | DragDropQuestion | CheckboxQuestion;

// Module Types
export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  duration: string; // e.g., "2 hours"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz';
  duration: string; // e.g., "10 minutes"
  videoUrl?: string;
  questions?: Question[];
}

// User Progress
export interface UserProgress {
  userId: string;
  completedModules: string[];
  inProgressModules: string[];
  completedLessons: string[];
  quizScores: Record<string, number>; // questionId -> score
  xpPoints: number;
  badges: Badge[];
  lastActive: string; // ISO date string
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedDate: string; // ISO date string
}
