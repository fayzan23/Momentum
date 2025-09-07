export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export enum Priority {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze'
}

export interface UserProfile {
  id: string;
  name?: string;
  workHours?: {
    start: string;
    end: string;
  };
  hasChildren?: boolean;
  childrenPickupTime?: string;
  questionsAnswered: number;
  lastQuestionDate?: Date;
  preferences: {
    dailyQuestionLimit: number;
    enableVoiceInput: boolean;
    enableNotifications: boolean;
  };
}

export interface Question {
  id: string;
  text: string;
  type: 'yesno' | 'time' | 'text';
  category: 'work' | 'family' | 'personal' | 'schedule';
  followUpQuestions?: string[];
}

export interface VoiceCommand {
  action: 'add' | 'complete' | 'remind' | 'schedule';
  task?: string;
  time?: string;
  priority?: Priority;
}

export interface AppState {
  tasks: Task[];
  userProfile: UserProfile;
  isLoading: boolean;
  error?: string;
}
