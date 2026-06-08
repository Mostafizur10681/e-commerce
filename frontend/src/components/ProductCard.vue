<template>
  <div class="card overflow-hidden group">
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img :src="product.image" :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      <!-- Badge -->
      <span v-if="product.badge"
        class="absolute top-3 left-3 text-xs font-bold uppercase px-2.5 py-1 rounded-full"
        :class="product.badge === 'Sale' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'">
        {{ product.badge }}
      </span>
      <!-- Quick actions overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button class="bg-white dark:bg-gray-800 rounded-full p-2.5 shadow-lg hover:bg-primary hover:text-white transition-all duration-200 transform translate-y-4 group-hover:translate-y-0"
          aria-label="Quick view">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </button>
      </div>
    </div>
    <!-- Info -->
    <div class="p-4">
      <p class="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{{ product.category }}</p>
      <h3 class="font-bold text-gray-800 dark:text-gray-100 mb-2 truncate">{{ product.name }}</h3>
      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3">
        <svg v-for="n in 5" :key="n" class="w-4 h-4"
          :class="n <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ product.rating }})</span>
      </div>
      <!-- Price + cart -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-lg font-extrabold text-primary">৳{{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through ml-1">৳{{ product.originalPrice }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400 block">{{ product.unit }}</span>
        </div>
        <button @click="$emit('addToCart', product)"
          class="bg-primary hover:bg-primary-dark text-white rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: { type: Object, required: true } });
defineEmits(['addToCart']);
</script>
