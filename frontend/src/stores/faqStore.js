import { defineStore } from 'pinia';
import api from '@/services/api';

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqs: [],
    categories: [],
    loading: false,
    error: null,
  }),
  getters: {
    activeFaqs: (state) => {
      return state.faqs
        .filter((f) => f.status === true || String(f.status) === '1' || (typeof f.status === 'string' && f.status.toLowerCase() === 'active'));
    },
    activeCategories: (state) => {
      return state.categories
        .filter((c) => c.status === true || String(c.status) === '1')
        .map(c => c.name);
    }
  },
  actions: {
    async fetchFaqs() {
      this.loading = true;
      this.error = null;
      try {
        const [faqsRes, categoriesRes] = await Promise.all([
          api.get('/faqs?limit=100'),
          api.get('/faq-categories')
        ]);
        this.faqs = faqsRes.data.data || faqsRes.data || [];
        this.categories = categoriesRes.data.data || categoriesRes.data || [];
      } catch (err) {
        console.error('Error fetching FAQs from API:', err);
        this.error = err.message || 'Failed to load FAQs';
        this.faqs = [];
        this.categories = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
