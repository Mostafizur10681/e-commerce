import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isCartDrawerOpen: false
  }),
  actions: {
    toggleCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
    setCartDrawer(isOpen) {
      this.isCartDrawerOpen = isOpen;
    }
  }
});
