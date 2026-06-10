<template>
  <section class="py-14 px-4" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <h2 class="section-title text-center mb-8">{{ categoryTitle }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="handleAdd"
        />
      </div>
      <p v-if="filteredProducts.length === 0" class="text-center text-gray-500 py-10" id="emptycat">
        No items found in this category
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';
import { useCartStore } from '@/stores/cartStore';
import { useToastStore } from '@/stores/toastStore';

const route = useRoute();
const cartStore = useCartStore();
const toastStore = useToastStore();

const categoryName = computed(() => String(route.params.categoryName || '').toLowerCase());

const filteredProducts = computed(() =>
  products.filter(p => p.category && p.category.toLowerCase() === categoryName.value)
);

const handleAdd = (product) => {
  cartStore.addToCart(product);
  toastStore.show('Successfully product added');
};

const categoryTitle = computed(() => {
  // Capitalize first letter for display
  const name = route.params.categoryName || '';
  return name.charAt(0).toUpperCase() + name.slice(1);
});
</script>

<style scoped>
/* Reuse existing grid and card styles – no extra CSS needed */
</style>
