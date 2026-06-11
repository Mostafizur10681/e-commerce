<template>
  <main class="py-14 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="section-title">All Products</h1>

      <!-- Search indicator (when arriving from header search) -->
      <div v-if="searchParam" class="flex items-center justify-center gap-3 mb-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Showing results for: <strong class="text-primary">"{{ searchParam }}"</strong>
          <span class="ml-1 text-gray-400">({{ filteredProducts.length }} found)</span>
        </p>
        <button
          @click="clearSearch"
          class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition flex items-center gap-1"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Clear
        </button>
      </div>

      <!-- Category filter bar -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button v-for="cat in allCategories" :key="cat" @click="activeFilter = cat"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeFilter === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'">
          {{ cat }}
        </button>
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="handleAdd"
          data-aos="fade-up"
        />
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No products found</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <span v-if="searchParam">No results for "{{ searchParam }}".</span>
          <span v-else>No products in this category.</span>
        </p>
        <button @click="resetAll" class="mt-6 px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition">
          View All Products
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';

const route   = useRoute();
const router  = useRouter();
const cartStore   = useCartStore();
const toastStore  = useToastStore();

const activeFilter = ref('All');
const searchParam  = ref('');

const allCategories = ['All', ...new Set(products.map(p => p.category))];

/* ── Read ?search= query param ── */
function syncSearch() {
  searchParam.value  = (route.query.search || '').trim();
  activeFilter.value = 'All'; // reset category filter when searching
}

onMounted(syncSearch);
watch(() => route.query.search, syncSearch);

/* ── Combined filter: category + search text ── */
const filteredProducts = computed(() => {
  let list = products;

  // Category filter
  if (activeFilter.value !== 'All') {
    list = list.filter(p => p.category === activeFilter.value);
  }

  // Search text filter
  const q = searchParam.value.toLowerCase();
  if (q) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  return list;
});

/* ── Actions ── */
function handleAdd(product) {
  cartStore.addToCart(product);
  toastStore.show('Successfully product added');
}

function clearSearch() {
  router.replace({ path: '/shop' });
}

function resetAll() {
  activeFilter.value = 'All';
  router.replace({ path: '/shop' });
}
</script>
