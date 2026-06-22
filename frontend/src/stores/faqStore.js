import { defineStore } from 'pinia';

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqs: [],
    loading: false,
    error: null,
  }),
  getters: {
    activeFaqs: (state) => {
      return state.faqs
        .filter((f) => f.status && f.status.toLowerCase() === 'active')
        .sort((a, b) => a.displayOrder - b.displayOrder);
    },
  },
  actions: {
    async fetchFaqs() {
      this.loading = true;
      this.error = null;
      try {
        const host = window.location.hostname || 'localhost';
        const res = await fetch(`http://${host}:3000/api/faqs?limit=100`);
        if (!res.ok) throw new Error('Failed to load FAQs');
        const data = await res.json();
        this.faqs = data.data || [];
      } catch (err) {
        console.error('Error fetching FAQs from API:', err);
        this.error = err.message;
        this.faqs = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
