<template>
  <main class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
    <!-- Hero Banner Slider -->
    <HeroSlider />
    
    <!-- Category browse carousel -->
    <CategoryCarousel />
    
    <!-- Featured products grid -->
    <section class="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/10 transition-colors duration-300" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <!-- Section Title -->
        <div class="flex flex-col items-center text-center mb-12">
          <span class="text-xs font-black text-primary dark:text-primary-light uppercase tracking-widest block mb-2">Our Store</span>
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Products</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-sm">Explore our handpicked selection of fresh daily groceries and kitchen staples.</p>
        </div>

        <!-- Responsive grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @addToCart="handleAdd"
          />
        </div>
      </div>
    </section>
    
    <!-- Promo Banner -->
    <PromoBanner />
    
    <!-- Partners Infinite Slider -->
    <PartnersSlider />
    
    <!-- Customer Reviews test sliders -->
    <ReviewSlider />
    
    <!-- Newsletter updates subscription -->
    <Newsletter />
  </main>
</template>

<script setup>
import HeroSlider from '../components/HeroSlider.vue';
import CategoryCarousel from '../components/CategoryCarousel.vue';
import PromoBanner from '../components/PromoBanner.vue';
import ReviewSlider from '../components/ReviewSlider.vue';
import PartnersSlider from '../components/PartnersSlider.vue';
import Newsletter from '../components/Newsletter.vue';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';

const cartStore = useCartStore();
const toastStore = useToastStore();

function handleAdd(product) {
  cartStore.addToCart(product);
  toastStore.show(`${product.name} added to cart!`, 'success');
}
</script>

<style scoped>
</style>
