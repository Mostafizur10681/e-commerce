import { defineStore } from 'pinia';
import localProducts from '../data/products.json';
import api from '../services/api';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: localProducts
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(p => p.id === Number(id)) || null;
    }
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await api.get('/v1/products?per_page=100');
        let apiProducts = [];
        if (response.data && response.data.success) {
          const resData = response.data.data;
          apiProducts = Array.isArray(resData) ? resData : (resData.data || []);
        }
        
        if (apiProducts.length > 0) {
          this.products = apiProducts.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category ? p.category.name : 'Uncategorized',
            price: p.sale_price ? parseFloat(p.sale_price) : parseFloat(p.price),
            originalPrice: p.sale_price ? parseFloat(p.price) : null,
            unit: p.unit || '1 kg',
            image: p.image || 'https://picsum.photos/seed/placeholder/400/400',
            images: p.images && p.images.length ? p.images : [p.image || 'https://picsum.photos/seed/placeholder/400/400'],
            rating: p.rating ? parseFloat(p.rating) : 5.0,
            badge: p.featured ? 'Featured' : (p.best_seller ? 'Best Seller' : (p.organic ? 'Organic' : (p.new_arrival ? 'New' : (p.sale_price ? 'Sale' : null)))),
            description: p.description,
            stock: p.stock
          }));
        }
      } catch (error) {
        console.error('Failed to fetch products for store:', error);
      }
    }
  }
});
