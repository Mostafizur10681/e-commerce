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
    addToCart(product, selectedAttributes = {}) {
      const attrKey = Object.entries(selectedAttributes)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => `${k}:${v}`)
        .join(',');
      const itemId = attrKey ? `${product.id}-${attrKey}` : `${product.id}`;

      const existing = this.items.find(i => i.id === itemId);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({
          id: itemId,
          product,
          quantity: 1,
          selectedAttributes: { ...selectedAttributes }
        });
      }
      this.persist();
    },
    removeFromCart(itemId) {
      this.items = this.items.filter(i => i.id !== itemId && i.product.id !== itemId);
      this.persist();
    },
    increaseQty(itemId) {
      const item = this.items.find(i => i.id === itemId || i.product.id === itemId);
      if (item) item.quantity++;
      this.persist();
    },
    decreaseQty(itemId) {
      const item = this.items.find(i => i.id === itemId || i.product.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item) {
        this.removeFromCart(itemId);
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
