
import { create } from 'zustand';
import type { User } from '../types';

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  isAssessmentComplete: boolean;
  setAssessmentComplete: (complete: boolean) => void;
  openAIKey: string | null;
  setOpenAIKey: (key: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAssessmentComplete: false,
  setAssessmentComplete: (complete) => set({ isAssessmentComplete: complete }),
  openAIKey: localStorage.getItem('openai_api_key'),
  setOpenAIKey: (key) => {
    if (key) {
      localStorage.setItem('openai_api_key', key);
    } else {
      localStorage.removeItem('openai_api_key');
    }
    set({ openAIKey: key });
  },
}));
