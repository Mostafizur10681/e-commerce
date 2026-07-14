<template>
  <div class="space-y-8">
    <!-- Header Banner Card -->
    <div class="relative overflow-hidden bg-linear-to-r from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-900/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div class="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-8 left-1/3 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl"></div>
      
      <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-2xl animate-pulse">❤️</span>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">My Wishlist</h2>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Products you love and want to shop later.</p>
        </div>
        
        <div class="bg-white dark:bg-gray-900 px-4 py-2 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-xs flex items-center gap-2 w-max">
          <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Saved:</span>
          <span class="text-sm font-black text-primary px-2.5 py-0.5 bg-primary/10 rounded-lg">
            {{ wishlistStore.items.length }} Item{{ wishlistStore.items.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="wishlistStore.items.length === 0" class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-12 text-center shadow-xs">
      <div class="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20 text-red-500">
        <div class="absolute inset-0 rounded-full bg-red-100/50 dark:bg-red-900/10 animate-ping"></div>
        <svg class="w-10 h-10 relative" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-950 dark:text-white">Your wishlist is empty</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">Explore our fresh grocery collections and tap the heart icon to save products you love.</p>
      <RouterLink
        to="/shop"
        class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5 active:translate-y-0"
      >
        <span>Start Exploring</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </RouterLink>
    </div>

    <!-- Wishlist Grid -->
    <div v-else>
      <TransitionGroup
        name="wishlist-list"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <div
          v-for="product in wishlistStore.items"
          :key="product.id"
          class="wishlist-item-card group bg-white dark:bg-gray-900/60 border border-gray-150 dark:border-gray-800/80 hover:border-primary/40 dark:hover:border-primary/45 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full backdrop-blur-xs"
        >
          <!-- Product image wrapper with hover effects -->
          <div class="relative overflow-hidden aspect-square bg-gray-50 dark:bg-gray-950">
            <!-- Stock Badge overlay -->
            <span
              class="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider"
              :class="product.stock > 0
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/30'
                : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200/30'"
            >
              {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>

            <img
              :src="product.image || product.images?.[0]"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <!-- Remove from wishlist button overlay -->
            <button
              @click="removeFromWishlist(product.id)"
              title="Remove from Wishlist"
              class="absolute top-4 right-4 z-10 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-gray-500 dark:text-gray-400 hover:text-red-500 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-90"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Product Details -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div class="space-y-1.5">
              <span class="inline-block text-[10px] font-black uppercase tracking-wider text-primary">
                {{ product.category || 'Grocery' }}
              </span>
              <h3 class="font-extrabold text-base text-gray-950 dark:text-white line-clamp-2 hover:text-primary transition duration-150 leading-snug">
                <RouterLink :to="`/product/${product.id}`">{{ product.name }}</RouterLink>
              </h3>
              <p class="text-xs text-gray-400 dark:text-gray-500" v-if="product.unit">Unit: {{ product.unit }}</p>
            </div>

            <div class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
              <div class="flex flex-col">
                <span class="text-lg font-black text-gray-950 dark:text-white">
                  ৳{{ product.price.toFixed(2) }}
                </span>
                <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">
                  ৳{{ product.originalPrice.toFixed(2) }}
                </span>
              </div>

              <!-- Add to Cart Button -->
              <button
                @click="addToCart(product)"
                :disabled="product.stock === 0"
                class="px-4 py-2.5 bg-primary hover:bg-primary-dark disabled:bg-gray-100 dark:disabled:bg-gray-800 text-white disabled:text-gray-400 rounded-2xl shadow-xs hover:shadow-md disabled:shadow-none transition-all duration-200 flex items-center gap-1.5 text-xs font-black cursor-pointer active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
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
/* Smooth fade transition for removing items from list */
.wishlist-list-enter-active,
.wishlist-list-leave-active {
  transition: all 0.5s ease;
}
.wishlist-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.wishlist-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}
.wishlist-list-move {
  transition: transform 0.5s ease;
}
</style>
