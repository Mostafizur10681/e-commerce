<template>
  <div id="n8k2x1" class="card overflow-hidden group relative" @click="goToDetail" style="cursor:pointer;">
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img :src="product.image" :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      <!-- Badge -->
      <span v-if="product.badge"
        class="absolute top-3 left-3 text-xs font-bold uppercase px-2.5 py-1 rounded-full"
        :class="product.badge === 'Sale' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'">{{ product.badge }}</span>
        
      <!-- Wishlist Toggle -->
      <button
        @click.stop="toggleWishlist"
        class="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-205 shadow-md z-10 hover:scale-110"
        :class="isInWishlist ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-red-550 hover:bg-white'"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
    <!-- Info -->
    <div class="p-4">
      <p class="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{{ product.category }}</p>
      <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-2 truncate">{{ product.name }}</h3>
      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3">
        <svg v-for="n in 5" :key="n" class="w-4 h-4"
          :class="n <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
          fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ product.rating }})</span>
      </div>
      <!-- Price + cart -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-lg font-extrabold text-primary">৳{{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through ml-1">৳{{ product.originalPrice }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400 block">{{ product.unit }}</span>
        </div>
        <button @click.stop="$emit('addToCart', product)"
          class="bg-primary hover:bg-primary-dark text-white rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWishlistStore } from '../stores/wishlistStore';
import { useToastStore } from '../stores/toastStore';

const props = defineProps({
  product: { type: Object, required: true }
});

defineEmits(['addToCart']);

const router = useRouter();
const wishlistStore = useWishlistStore();
const toastStore = useToastStore();

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id));

function toggleWishlist() {
  const added = wishlistStore.toggleWishlist(props.product);
  if (added) {
    toastStore.show(`${props.product.name} added to wishlist!`, 'success');
  } else {
    toastStore.show(`${props.product.name} removed from wishlist.`, 'success');
  }
}

function goToDetail() {
  router.push({ name: 'ProductDetails', params: { id: props.product.id } });
}
</script>
