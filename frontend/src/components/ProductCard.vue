<template>
  <div
    class="card group relative flex flex-col justify-between overflow-hidden bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 select-none cursor-pointer"
    @click="goToDetail"
  >
    <!-- Card Top: Image & Badges -->
    <div class="relative overflow-hidden aspect-square bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-2">
      <!-- Image with zoom-on-hover -->
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      
      <!-- Badges Stack -->
      <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
        <!-- Dynamic Discount Badge -->
        <span
          v-if="discountPercent > 0"
          class="px-2.5 py-1 text-[10px] font-black uppercase bg-red-500 text-white rounded-lg shadow-sm"
        >
          {{ discountPercent }}% OFF
        </span>
        <!-- Regular Static Badge -->
        <span
          v-else-if="product.badge"
          class="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg shadow-sm"
          :class="product.badge === 'Organic' ? 'bg-emerald-500 text-white' : 'bg-primary text-white'"
        >
          {{ product.badge }}
        </span>
      </div>

      <!-- Wishlist Toggle Button -->
      <button
        @click.stop="toggleWishlist"
        class="absolute top-3.5 right-3.5 p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow z-10 hover:scale-110 active:scale-95 focus:outline-none"
        :class="isInWishlist ? 'bg-red-550 text-white' : 'bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800'"
        aria-label="Toggle Wishlist"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>

    <!-- Card Bottom: Information Panel -->
    <div class="p-4 flex-grow flex flex-col justify-between gap-3 bg-white dark:bg-gray-900 transition-colors">
      <div class="space-y-1">
        <!-- Category -->
        <span class="text-[10px] text-primary font-black uppercase tracking-widest block">
          {{ product.category }}
        </span>
        <!-- Name -->
        <h3 class="font-extrabold text-sm text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
          {{ product.name }}
        </h3>

        <!-- Rating Stars -->
        <div class="flex items-center gap-1">
          <div class="flex text-amber-400">
            <svg
              v-for="n in 5"
              :key="n"
              class="w-3.5 h-3.5"
              :class="n <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-655'"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500">
            ({{ product.rating }})
          </span>
        </div>
      </div>

      <!-- Pricing and Cart Action -->
      <div class="flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800/80 pt-3">
        <div class="min-w-0">
          <div class="flex items-baseline gap-1.5 flex-wrap">
            <span class="text-base font-black text-primary">৳{{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">৳{{ product.originalPrice }}</span>
          </div>
          <span class="text-[10px] text-gray-500 dark:text-gray-400 block font-medium mt-0.5 truncate" v-if="product.unit">
            Per {{ product.unit }}
          </span>
        </div>

        <!-- Add Button -->
        <button
          @click.stop="$emit('addToCart', product)"
          :disabled="product.stock === 0"
          class="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all duration-200 hover:shadow shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-1 focus:outline-none shrink-0"
          aria-label="Add to Cart"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>Add</span>
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

const discountPercent = computed(() => {
  if (!props.product.originalPrice) return 0;
  return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100);
});

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

<style scoped>
</style>
