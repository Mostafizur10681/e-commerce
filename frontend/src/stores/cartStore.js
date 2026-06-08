import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] // each item: { product, quantity }
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    totalPrice(state) {
      return state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    }
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find(i => i.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this.persist();
    },
    removeFromCart(productId) {
      this.items = this.items.filter(i => i.product.id !== productId);
      this.persist();
    },
    increaseQty(productId) {
      const item = this.items.find(i => i.product.id === productId);
      if (item) item.quantity++;
      this.persist();
    },
    decreaseQty(productId) {
      const item = this.items.find(i => i.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item) {
        this.removeFromCart(productId);
      }
      this.persist();
    },
    clearCart() {
      this.items = [];
      this.persist();
    },
    persist() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    hydrate() {
      const data = localStorage.getItem('cart');
      if (data) this.items = JSON.parse(data);
    }
  }
});
