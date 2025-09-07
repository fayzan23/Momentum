import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Priority } from '../../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error?: string;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: undefined,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    completeTask: (state, action: PayloadAction<{ id: string; actualTime?: number }>) => {
      const { id, actualTime } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          completed: true,
          completedAt: new Date(),
          actualTime: actualTime || state.tasks[taskIndex].actualTime,
          updatedAt: new Date(),
        };
      }
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
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
