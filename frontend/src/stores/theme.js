// src/stores/theme.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    init() {
      const saved = localStorage.getItem('theme');
      this.darkMode = saved ? JSON.parse(saved) : false;
      this.apply();
    },
    toggle() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('theme', JSON.stringify(this.darkMode));
      this.apply();
    },
    apply() {
      const html = document.documentElement;
      if (this.darkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    },
  },
});
