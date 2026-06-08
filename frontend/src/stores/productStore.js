import { defineStore } from 'pinia';
import products from '@/data/products.json';

export const useProductStore = defineStore('product', {
  state: () => ({
    products
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(p => p.id === id) || null;
    }
  },
  actions: {
    // No actions needed for static data
  }
});
