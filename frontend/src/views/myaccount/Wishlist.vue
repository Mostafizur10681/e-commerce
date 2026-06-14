<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white">My Wishlist</h2>
        <span class="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
          {{ wishlistStore.items.length }} Item{{ wishlistStore.items.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">❤️</div>
        <h3 class="text-lg font-bold text-gray-950 dark:text-white">Your wishlist is empty</h3>
        <p class="text-sm text-gray-500 mt-1 max-w-sm mx-auto">Explore our catalog and click the wishlist button to save products you love.</p>
        <RouterLink
          to="/shop"
          class="inline-block mt-5 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-dark transition duration-300 text-sm"
        >
          View Catalog
        </RouterLink>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="product in wishlistStore.items"
          :key="product.id"
          class="group bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800 hover:border-primary/45 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
        >
          <!-- Product image wrapper with hover effects -->
          <div class="relative overflow-hidden aspect-square bg-gray-50 dark:bg-gray-900">
            <img
              :src="product.image || product.images?.[0]"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <!-- Remove from wishlist button overlay -->
            <button
              @click="removeFromWishlist(product.id)"
              title="Remove from Wishlist"
              class="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 rounded-full text-gray-500 dark:text-gray-400 shadow-md transition duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Product Details -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <span class="inline-block text-xxs font-bold uppercase tracking-wider text-primary mb-1">
                {{ product.category || 'Grocery' }}
              </span>
              <h3 class="font-bold text-base text-gray-950 dark:text-white line-clamp-2 hover:text-primary transition duration-150">
                <RouterLink :to="`/product/${product.id}`">{{ product.name }}</RouterLink>
              </h3>
              <p class="text-xs text-gray-450 mt-1" v-if="product.unit">{{ product.unit }}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
              <span class="text-lg font-black text-gray-950 dark:text-white">
                ৳{{ product.price.toFixed(2) }}
              </span>

              <!-- Add to Cart Button -->
              <button
                @click="addToCart(product)"
                class="px-3.5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-bold"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { useToastStore } from '../../stores/toastStore';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

onMounted(() => {
  wishlistStore.loadWishlist();
});

function removeFromWishlist(productId) {
  wishlistStore.removeFromWishlist(productId);
  toastStore.show('Product removed from wishlist', 'success');
}

function addToCart(product) {
  cartStore.addToCart(product);
  toastStore.show(`${product.name} added to cart!`, 'success');
}
</script>

<style scoped>
.border-gray-850 {
  border-color: #2d3748;
}
.text-xxs {
  font-size: 0.65rem;
}
.text-gray-450 {
  color: #a0aec0;
}
</style>
