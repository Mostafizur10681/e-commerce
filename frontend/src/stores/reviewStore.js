import { defineStore } from 'pinia';
import api from '../services/api';

export const useReviewStore = defineStore('review', {
  state: () => ({
    // map productId => array of reviews
    reviewsMap: {}
  }),
  getters: {
    getReviews: (state) => (productId) => {
      return state.reviewsMap[productId] || [];
    }
  },
  actions: {
    async fetchReviews(productId) {
      try {
        const response = await api.get('/reviews', { params: { product_id: productId } });
        if (response.data && response.data.success) {
          const data = response.data.data;
          const reviews = Array.isArray(data) ? data : (data.data || []);
          this.reviewsMap[productId] = reviews.map(r => ({
            name: r.user ? r.user.name : 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            date: r.created_at ? new Date(r.created_at).toLocaleDateString() : ''
          }));
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    },
    async addReview(productId, reviewData) {
      try {
        const response = await api.post('/customer/reviews', {
          product_id: productId,
          rating: reviewData.rating,
          comment: reviewData.comment
        });
        if (response.data && response.data.success) {
          await this.fetchReviews(productId);
          return { success: true };
        }
        return { success: false, error: response.data.message || 'Failed to submit review' };
      } catch (error) {
        console.error('Failed to add review:', error);
        let errorMsg = 'Failed to submit review';
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
        }
        return { success: false, error: errorMsg };
      }
    }
  }
});
