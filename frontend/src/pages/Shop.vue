<template>
  <main class="py-14 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="section-title">All Products</h1>
      <!-- Filter bar -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button v-for="cat in allCategories" :key="cat" @click="activeFilter = cat"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeFilter === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'">
          {{ cat }}
        </button>
      </div>
      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
          @addToCart="handleAdd" data-aos="fade-up" />
      </div>
      <p v-if="filteredProducts.length === 0" class="text-center text-gray-500 py-10">No products found in this category.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';

const activeFilter = ref('All');
const allCategories = ['All', ...new Set(products.map(p => p.category))];
const filteredProducts = computed(() =>
  activeFilter.value === 'All' ? products : products.filter(p => p.category === activeFilter.value)
);
const handleAdd = (product) => { alert(`${product.name} added to cart!`); };
</script>
