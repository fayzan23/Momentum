import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, Question } from '../../types';

interface UserState {
  profile: UserProfile;
  questions: Question[];
  isLoading: boolean;
  error?: string;
}

const initialProfile: UserProfile = {
  id: '1',
  questionsAnswered: 0,
  preferences: {
    dailyQuestionLimit: 5,
    enableVoiceInput: true,
    enableNotifications: true,
  },
};

const initialState: UserState = {
  profile: initialProfile,
  questions: [
    {
      id: '1',
      text: 'Do you have children?',
      type: 'yesno',
      category: 'family',
      followUpQuestions: ['What time do you pick them up?'],
    },
    {
      id: '2',
      text: 'Do you work?',
      type: 'yesno',
      category: 'work',
      followUpQuestions: ['What are your working hours?', 'When do you get home?'],
    },
    {
      id: '3',
      text: 'What time do you usually wake up?',
      type: 'time',
      category: 'schedule',
    },
    {
      id: '4',
      text: 'What time do you go to bed?',
      type: 'time',
      category: 'schedule',
    },
    {
      id: '5',
      text: 'Do you exercise regularly?',
      type: 'yesno',
      category: 'personal',
    },
  ],
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.profile.questionsAnswered += 1;
      state.profile.lastQuestionDate = new Date();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateProfile,
  answerQuestion,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
