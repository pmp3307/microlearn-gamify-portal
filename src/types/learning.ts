
export type QuestionType = 'multiple-choice' | 'true-false' | 'drag-drop' | 'checkbox';

export interface BaseQuestion {
  id: string;
  questionText: string;
  type: QuestionType;
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

export interface DragDropItem {
  id: string;
  text: string;
  category: string;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  items: DragDropItem[];
  categories: string[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  choices: Choice[];
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | DragDropQuestion | CheckboxQuestion;

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  questions: Question[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sections: ModuleSection[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  xpReward: number;
}

export interface UserModuleProgress {
  moduleId: string;
  completed: boolean;
  sectionsCompleted: string[];
  correctAnswers: number;
  totalQuestions: number;
  lastAccessedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  xpPoints: number;
  level: number;
  badges: Badge[];
  moduleProgress: UserModuleProgress[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt?: Date;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl?: string;
  xpPoints: number;
  level: number;
  recentBadges: Badge[];
}
