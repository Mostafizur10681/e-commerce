import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] // array of product objects
  }),
  actions: {
    loadWishlist() {
      const authStore = useAuthStore();
      const userId = authStore.currentUser ? authStore.currentUser.id : 'guest';
      try {
        const data = localStorage.getItem('wishlist_' + userId);
        this.items = data ? JSON.parse(data) : [];
      } catch (e) {
        console.error('Failed to load wishlist', e);
        this.items = [];
      }
    },
    persist() {
      const authStore = useAuthStore();
      const userId = authStore.currentUser ? authStore.currentUser.id : 'guest';
      localStorage.setItem('wishlist_' + userId, JSON.stringify(this.items));
    },
    toggleWishlist(product) {
      this.loadWishlist();
      const idx = this.items.findIndex(p => p.id === product.id);
      let added = false;
      if (idx > -1) {
        this.items.splice(idx, 1);
      } else {
        this.items.push(product);
        added = true;
      }
      this.persist();
      return added;
    },
    isInWishlist(productId) {
      this.loadWishlist();
      return this.items.some(p => p.id === productId);
    },
    removeFromWishlist(productId) {
      this.loadWishlist();
      this.items = this.items.filter(p => p.id !== productId);
      this.persist();
    },
    clearWishlist() {
      this.items = [];
      this.persist();
    }
  }
});
