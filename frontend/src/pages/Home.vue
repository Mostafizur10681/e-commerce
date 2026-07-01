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
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
            @addToCart="handleAdd"
          />
        </div>

        <!-- See More / View All Button -->
        <div class="flex justify-center mt-12">
          <router-link
            to="/shop"
            class="btn-primary flex items-center gap-2 group"
          >
            <span>See More</span>
            <svg
              class="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </router-link>
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
import { ref, computed, onMounted } from 'vue';
import HeroSlider from '../components/HeroSlider.vue';
import CategoryCarousel from '../components/CategoryCarousel.vue';
import PromoBanner from '../components/PromoBanner.vue';
import ReviewSlider from '../components/ReviewSlider.vue';
import PartnersSlider from '../components/PartnersSlider.vue';
import Newsletter from '../components/Newsletter.vue';
import ProductCard from '../components/ProductCard.vue';
import localProducts from '../data/products.json';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';
import api from '../services/api';

const cartStore = useCartStore();
const toastStore = useToastStore();

const productsList = ref([]);
const visibleCount = ref(8);

onMounted(async () => {
  try {
    const response = await api.get('/v1/products?per_page=100');
    // Laravel API Controller index returns paginated structure under success trait
    let apiProducts = [];
    if (response.data && response.data.success) {
      // Check if data is paginated or direct array
      const resData = response.data.data;
      apiProducts = Array.isArray(resData) ? resData : (resData.data || []);
    }
    
    if (apiProducts.length > 0) {
      productsList.value = apiProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category ? p.category.name : 'Uncategorized',
        price: p.sale_price ? parseFloat(p.sale_price) : parseFloat(p.price),
        originalPrice: p.sale_price ? parseFloat(p.price) : null,
        unit: p.unit || '1 kg',
        image: p.image || 'https://picsum.photos/seed/placeholder/400/400',
        images: p.images && p.images.length ? p.images : [p.image || 'https://picsum.photos/seed/placeholder/400/400'],
        rating: p.rating ? parseFloat(p.rating) : 5.0,
        badge: p.sale_price ? 'Sale' : null,
        description: p.description,
        stock: p.stock
      }));
    } else {
      productsList.value = localProducts;
    }
  } catch (error) {
    console.error('Failed to fetch products from API, using fallback:', error);
    productsList.value = localProducts;
  }
});

const visibleProducts = computed(() => {
  return productsList.value.slice(0, visibleCount.value);
});

function handleAdd(product) {
  cartStore.addToCart(product);
  toastStore.show(`${product.name} added to cart!`, 'success');
}
</script>

<style scoped>
</style>
