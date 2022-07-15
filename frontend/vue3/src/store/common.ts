import { defineStore } from 'pinia';

export interface IState {
  theme: 'light' | 'dark';
}

export const useCommonState = defineStore('common', {
  state(): IState {
    return {
      theme: 'light',
    };
  },
  actions: {
  },
});
