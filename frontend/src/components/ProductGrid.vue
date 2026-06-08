<template>
  <section class="py-14 px-4 bg-gray-50 dark:bg-gray-900/50" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <h2 class="section-title">Featured Products</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product"
          @addToCart="handleAdd" data-aos="fade-up" :data-aos-delay="product.id * 50" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
import products from '../data/products.json';

const handleAdd = (product) => {
  alert(`${product.name} added to cart!`);
};
</script>
