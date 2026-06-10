<template>
  <main>
    <HeroSlider />
    <CategoryCarousel />
    <!-- Home product grid (all products) -->
    <section class="py-14 px-4 bg-gray-50 dark:bg-gray-900/50" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title">All Products</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @addToCart="handleAdd"
          />
        </div>
      </div>
    </section>
    <PromoBanner />
    <ReviewSlider />
    <Newsletter />
  </main>
</template>

<script setup>
import HeroSlider from '../components/HeroSlider.vue';
import CategoryCarousel from '../components/CategoryCarousel.vue';
import PromoBanner from '../components/PromoBanner.vue';
import ReviewSlider from '../components/ReviewSlider.vue';
import Newsletter from '../components/Newsletter.vue';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';

const cartStore = useCartStore();
const toastStore = useToastStore();

function handleAdd(product) {
  cartStore.addToCart(product);
  toastStore.show('Successfully product added');
}
</script>
