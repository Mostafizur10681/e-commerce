import { defineStore } from 'pinia';
import api from '../services/api';
import { useAuthStore } from './authStore';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [], // array of product objects
    wishlistRecords: [] // array of raw database wishlist records: { id, user_id, product_id, product }
  }),
  actions: {
    async loadWishlist() {
      const authStore = useAuthStore();
      if (!authStore.currentUser) {
        this.items = [];
        this.wishlistRecords = [];
        return;
      }
      try {
        const res = await api.get('/customer/wishlist');
        if (res.data && res.data.success) {
          const list = res.data.data || [];
          this.wishlistRecords = list;
          this.items = list.map(record => {
            const p = record.product;
            if (!p) return null;
            return {
              id: p.id,
              name: p.name,
              category: p.category ? p.category.name : 'Grocery',
              price: p.sale_price ? parseFloat(p.sale_price) : parseFloat(p.price),
              originalPrice: p.sale_price ? parseFloat(p.price) : null,
              unit: p.unit || '1 kg',
              image: p.image || 'https://picsum.photos/seed/placeholder/400/400',
              images: p.images && p.images.length ? p.images : [p.image || 'https://picsum.photos/seed/placeholder/400/400'],
              rating: p.rating ? parseFloat(p.rating) : 5.0,
              stock: p.stock,
              attributes: p.attributes || []
            };
          }).filter(Boolean);
        }
      } catch (e) {
        console.error('Failed to load wishlist from server', e);
      }
    },
    async toggleWishlist(product) {
      const authStore = useAuthStore();
      if (!authStore.currentUser) {
        return false;
      }
      const record = this.wishlistRecords.find(r => r.product_id === product.id);
      if (record) {
        // Remove it
        await this.removeFromWishlist(product.id);
        return false;
      } else {
        // Add it
        try {
          const res = await api.post('/customer/wishlist', { product_id: product.id });
          if (res.data && res.data.success) {
            await this.loadWishlist();
            return true;
          }
        } catch (e) {
          console.error('Failed to add to wishlist', e);
        }
      }
      return false;
    },
    isInWishlist(productId) {
      return this.wishlistRecords.some(r => r.product_id === productId);
    },
    async removeFromWishlist(productId) {
      const record = this.wishlistRecords.find(r => r.product_id === productId);
      if (record) {
        try {
          const res = await api.delete(`/customer/wishlist/${record.id}`);
          if (res.data && res.data.success) {
            this.wishlistRecords = this.wishlistRecords.filter(r => r.id !== record.id);
            this.items = this.items.filter(p => p.id !== productId);
          }
        } catch (e) {
          console.error('Failed to remove from wishlist', e);
        }
      }
    },
    clearWishlist() {
      this.items = [];
      this.wishlistRecords = [];
    }
  }
});
