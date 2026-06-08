import { defineStore } from 'pinia';

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
    addReview(productId, review) {
      if (!this.reviewsMap[productId]) {
        this.reviewsMap[productId] = [];
      }
      this.reviewsMap[productId].push(review);
    }
  }
});
