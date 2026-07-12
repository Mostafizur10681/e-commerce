<template>
  <section class="py-14 px-4" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <h2 class="section-title text-center mb-8">{{ categoryTitle }}</h2>
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCardSkeleton
          v-for="i in 8"
          :key="i"
        />
      </div>
      <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="handleAdd"
        />
      </div>
      <p v-else class="text-center text-gray-500 py-10" id="emptycat">
        No items found in this category
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue';
import localProducts from '../data/products.json';
import { useCartStore } from '@/stores/cartStore';
import { useToastStore } from '@/stores/toastStore';
import api from '@/services/api';

const route = useRoute();
const cartStore = useCartStore();
const toastStore = useToastStore();

const productsList = ref([]);
const loading = ref(true);

const categoryName = computed(() => String(route.params.categoryName || '').toLowerCase());
const categoryTitle = computed(() => {
  const name = route.params.categoryName || '';
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const filteredProducts = computed(() =>
  productsList.value.filter(p => p.category && p.category.toLowerCase() === categoryName.value)
);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await api.get('/v1/products?per_page=100');
    let apiProducts = [];
    if (response.data && response.data.success) {
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
        badge: p.featured ? 'Featured' : (p.best_seller ? 'Best Seller' : (p.organic ? 'Organic' : (p.new_arrival ? 'New' : (p.sale_price ? 'Sale' : null)))),
        description: p.description,
        stock: p.stock
      }));
    } else {
      productsList.value = localProducts;
    }
  } catch (error) {
    console.error('Failed to fetch products from API, using fallback:', error);
    productsList.value = localProducts;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

watch(() => route.params.categoryName, () => {
  // Products list already has all products, just the computed filteredProducts will update.
  // If we wanted to re-fetch on every route change, we could do so here.
});

const handleAdd = (product) => {
  cartStore.addToCart(product);
  toastStore.show('Successfully product added');
};
</script>

<style scoped>
/* Reuse existing grid and card styles – no extra CSS needed */
</style>
