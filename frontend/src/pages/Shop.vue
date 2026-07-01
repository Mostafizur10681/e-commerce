<template>
  <main class="py-14 px-4 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <div class="max-w-7xl mx-auto">
      <h1 class="section-title dark:text-white">All Products</h1>

      <!-- Search indicator (when arriving from header search) -->
      <div v-if="searchParam" class="flex items-center justify-center gap-3 mb-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Showing results for: <strong class="text-primary dark:text-primary-light">"{{ searchParam }}"</strong>
          <span class="ml-1 text-gray-400 dark:text-gray-500">({{ filteredProducts.length }} found)</span>
        </p>
        <button
          @click="clearSearch"
          class="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all flex items-center gap-1.5 border border-transparent dark:border-gray-700"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Clear
        </button>
      </div>

      <!-- Mobile Filter Toggle -->
      <div class="lg:hidden flex justify-between items-center mb-4">
        <button
          @click="showMobileFilters = !showMobileFilters"
          class="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/80 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-primary/50 dark:hover:border-primary/40 transition-all shadow-sm dark:shadow-gray-900/50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filters
          <span v-if="activeFilterCount > 0" class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">{{ activeFilterCount }}</span>
        </button>

        <!-- Sort dropdown (always visible) -->
        <div class="relative flex items-center">
          <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-2">Sort By:</label>
          <select
            v-model="sortBy"
            class="appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/80 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-orange-500 dark:text-orange-400 focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10 transition shadow-sm dark:shadow-gray-900/50 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name-az">Name: A-Z</option>
            <option value="name-za">Name: Z-A</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-500 dark:text-orange-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Main layout: sidebar + grid -->
      <div class="flex gap-8">

        <!-- ═══ Sidebar Filters ═══ -->
        <aside
          :class="[
            'w-[260px] shrink-0 transition-all duration-300',
            showMobileFilters ? 'block' : 'hidden lg:block'
          ]"
        >
          <div class="sticky top-24 space-y-5">

            <!-- ── Price Range ── -->
            <div class="filter-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="filter-title">Price Range</h3>
                <button @click="priceCollapsed = !priceCollapsed" class="filter-collapse-btn">
                  <svg class="w-4 h-4 transition-transform duration-200" :class="priceCollapsed && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
              </div>
              <div v-show="!priceCollapsed" class="space-y-4">
                <div class="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span class="price-tag">৳ <span class="text-primary dark:text-primary-light font-bold text-sm">{{ priceRange[0] }}</span></span>
                  <span class="text-gray-300 dark:text-gray-600">—</span>
                  <span class="price-tag">৳ <span class="text-primary dark:text-primary-light font-bold text-sm">{{ priceRange[1] }}</span></span>
                </div>
                <!-- Dual range slider -->
                <div class="range-slider-container relative h-2">
                  <div class="absolute inset-0 bg-gray-200 dark:bg-gray-700/80 rounded-full"></div>
                  <div
                    class="absolute h-full bg-gradient-to-r from-primary to-primary-light rounded-full shadow-sm shadow-primary/20"
                    :style="{ left: minPercent + '%', right: (100 - maxPercent) + '%' }"
                  ></div>
                  <input
                    type="range"
                    :min="priceMin"
                    :max="priceMax"
                    :value="priceRange[0]"
                    @input="priceRange[0] = Math.min(+$event.target.value, priceRange[1] - 5)"
                    class="range-thumb absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                  />
                  <input
                    type="range"
                    :min="priceMin"
                    :max="priceMax"
                    :value="priceRange[1]"
                    @input="priceRange[1] = Math.max(+$event.target.value, priceRange[0] + 5)"
                    class="range-thumb absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <!-- ── Categories ── -->
            <div class="filter-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="filter-title">Categories</h3>
                <button @click="categoryCollapsed = !categoryCollapsed" class="filter-collapse-btn">
                  <svg class="w-4 h-4 transition-transform duration-200" :class="categoryCollapsed && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
              </div>
              <div v-show="!categoryCollapsed" class="space-y-1">
                <label
                  v-for="cat in categoryOptions"
                  :key="cat.name"
                  class="filter-checkbox-label"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="relative flex items-center">
                      <input
                        type="checkbox"
                        :value="cat.name"
                        v-model="selectedCategories"
                        class="peer sr-only"
                      />
                      <div class="checkbox-box">
                        <svg class="w-2.5 h-2.5 text-white opacity-0 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition font-medium">{{ cat.name }}</span>
                  </div>
                  <span class="filter-count-badge">{{ cat.count }}</span>
                </label>
              </div>
            </div>

            <!-- ── Product Flag ── -->
            <div class="filter-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="filter-title">Product Flag</h3>
                <button @click="flagCollapsed = !flagCollapsed" class="filter-collapse-btn">
                  <svg class="w-4 h-4 transition-transform duration-200" :class="flagCollapsed && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
              </div>
              <div v-show="!flagCollapsed" class="space-y-1">
                <label
                  v-for="flag in flagOptions"
                  :key="flag.name"
                  class="filter-checkbox-label"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="relative flex items-center">
                      <input
                        type="checkbox"
                        :value="flag.name"
                        v-model="selectedFlags"
                        class="peer sr-only"
                      />
                      <div class="checkbox-box">
                        <svg class="w-2.5 h-2.5 text-white opacity-0 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition font-medium">{{ flag.name }}</span>
                  </div>
                  <span class="filter-count-badge">{{ flag.count }}</span>
                </label>
              </div>
            </div>

            <!-- ── Rating Filter ── -->
            <div class="filter-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="filter-title">Rating</h3>
                <button @click="ratingCollapsed = !ratingCollapsed" class="filter-collapse-btn">
                  <svg class="w-4 h-4 transition-transform duration-200" :class="ratingCollapsed && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
              </div>
              <div v-show="!ratingCollapsed" class="space-y-1">
                <button
                  v-for="star in [5, 4, 3, 2, 1]"
                  :key="star"
                  @click="minRating = minRating === star ? 0 : star"
                  class="flex items-center gap-2 w-full py-2 px-2.5 rounded-xl transition-all duration-200 text-sm"
                  :class="minRating === star
                    ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/30 dark:ring-primary/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/80'"
                >
                  <div class="flex text-amber-400">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      class="w-3.5 h-3.5"
                      :class="n <= star ? 'fill-current' : 'text-gray-300 dark:text-gray-600'"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-gray-500 dark:text-gray-400 font-medium">({{ star }} Star{{ star > 1 ? 's' : '' }})</span>
                </button>
              </div>
            </div>

            <!-- Reset All Filters Button -->
            <button
              v-if="activeFilterCount > 0"
              @click="resetAll"
              class="w-full py-3 text-sm font-bold text-red-500 dark:text-red-400 hover:text-white border-2 border-red-200 dark:border-red-500/20 hover:bg-red-500 dark:hover:bg-red-500 hover:border-red-500 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-white dark:bg-gray-900/50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Clear All Filters
            </button>

          </div>
        </aside>

        <!-- ═══ Products Area ═══ -->
        <div class="flex-1 min-w-0">

          <!-- Sort bar (desktop) -->
          <div class="hidden lg:flex items-center justify-between mb-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl px-5 py-3.5 shadow-sm dark:shadow-gray-950/30">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Showing <strong class="text-gray-900 dark:text-white">{{ filteredProducts.length }}</strong> products
            </p>
            <div class="flex items-center gap-3">
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sort By:</label>
              <div class="relative">
                <select
                  v-model="sortBy"
                  class="appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/80 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-orange-500 dark:text-orange-400 focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10 transition cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name-az">Name: A-Z</option>
                  <option value="name-za">Name: Z-A</option>
                </select>
                <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-500 dark:text-orange-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Product grid -->
          <div class="grid grid-cols-3 gap-4 md:gap-5">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
              @addToCart="handleAdd"
              data-aos="fade-up"
            />
          </div>

          <!-- Empty state -->
          <div v-if="filteredProducts.length === 0" class="text-center py-20">
            <div class="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-900">
              <svg class="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <p class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">No products found</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span v-if="searchParam">No results for "{{ searchParam }}".</span>
              <span v-else>Try adjusting your filters to find what you're looking for.</span>
            </p>
            <button @click="resetAll" class="btn-primary">
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import products from '../data/products.json';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';

const route   = useRoute();
const router  = useRouter();
const cartStore   = useCartStore();
const toastStore  = useToastStore();

/* ── Filter state ── */
const searchParam       = ref('');
const selectedCategories = ref([]);
const selectedFlags      = ref([]);
const sortBy             = ref('default');
const minRating          = ref(0);
const showMobileFilters  = ref(false);

// Pagination state
const itemsPerPage = ref(12);
const currentPage = ref(1);

// Collapse state for filter sections
const priceCollapsed    = ref(false);
const categoryCollapsed = ref(false);
const flagCollapsed     = ref(false);
const ratingCollapsed   = ref(false);

// Price range
const priceMin = ref(1);
const priceMax = ref(5000);
const priceRange = reactive([priceMin.value, priceMax.value]);

const minPercent = computed(() => ((priceRange[0] - priceMin.value) / (priceMax.value - priceMin.value)) * 100);
const maxPercent = computed(() => ((priceRange[1] - priceMin.value) / (priceMax.value - priceMin.value)) * 100);

/* ── Derive filter options with counts ── */
const categoryOptions = computed(() => {
  const cats = [...new Set(products.map(p => p.category))].sort();
  return cats.map(name => ({
    name,
    count: products.filter(p => p.category === name).length,
  }));
});

const flagOptions = computed(() => {
  const flags = [...new Set(products.map(p => p.badge).filter(Boolean))].sort();
  return flags.map(name => ({
    name,
    count: products.filter(p => p.badge === name).length,
  }));
});

/* ── Active filter count (for badge) ── */
const activeFilterCount = computed(() => {
  let count = 0;
  if (selectedCategories.value.length) count += selectedCategories.value.length;
  if (selectedFlags.value.length)      count += selectedFlags.value.length;
  if (minRating.value > 0)             count++;
  if (priceRange[0] > priceMin.value || priceRange[1] < priceMax.value) count++;
  return count;
});

/* ── Read ?search= query param ── */
function syncSearch() {
  searchParam.value = (route.query.search || '').trim();
}

onMounted(syncSearch);
watch(() => route.query.search, syncSearch);

/* ── Combined filter + sort ── */
const filteredProducts = computed(() => {
  let list = [...products];

  // Search text
  const q = searchParam.value.toLowerCase();
  if (q) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  // Category checkbox
  if (selectedCategories.value.length) {
    list = list.filter(p => selectedCategories.value.includes(p.category));
  }

  // Product flag checkbox
  if (selectedFlags.value.length) {
    list = list.filter(p => selectedFlags.value.includes(p.badge));
  }

  // Price range
  list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Rating
  if (minRating.value > 0) {
    list = list.filter(p => Math.floor(p.rating) === minRating.value);
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-az':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-za':
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return list;
});

// Pagination computed values
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
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
  selectedCategories.value = [];
  selectedFlags.value = [];
  sortBy.value = 'default';
  minRating.value = 0;
  priceRange[0] = priceMin.value;
  priceRange[1] = priceMax.value;
  searchParam.value = '';
  router.replace({ path: '/shop' });
// Reset pagination when filters change
watch([
  selectedCategories,
  selectedFlags,
  sortBy,
  minRating,
  priceRange,
  searchParam
], () => {
  currentPage.value = 1;
});
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   Reusable filter card & element classes
   ═══════════════════════════════════════════ */

/* Filter card container — solid surfaces for dark mode */
.filter-card {
  @apply bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-colors duration-300;
}
:is(.dark .filter-card) {
  background-color: rgb(17 24 39 / 0.95); /* gray-900 near-opaque */
  border-color: rgb(55 65 81 / 0.6);      /* gray-700 subtle border */
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 0 0 1px rgb(55 65 81 / 0.15);
}

/* Filter section title */
.filter-title {
  @apply text-sm font-bold uppercase tracking-wider text-gray-900;
}
:is(.dark .filter-title) {
  color: rgb(229 231 235); /* gray-200 */
}

/* Collapse toggle button */
.filter-collapse-btn {
  @apply text-gray-400 hover:text-gray-600 transition-colors;
}
:is(.dark .filter-collapse-btn) {
  color: rgb(156 163 175); /* gray-400 */
}
:is(.dark .filter-collapse-btn:hover) {
  color: rgb(209 213 219); /* gray-300 */
}

/* Checkbox label row */
.filter-checkbox-label {
  @apply flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-xl transition-all duration-150;
}
.filter-checkbox-label:hover {
  @apply bg-gray-50;
}
:is(.dark .filter-checkbox-label:hover) {
  background-color: rgb(31 41 55 / 0.7); /* gray-800 translucent */
}

/* Custom checkbox box */
.checkbox-box {
  @apply w-[18px] h-[18px] rounded-md border-2 border-gray-300 transition-all duration-150 flex items-center justify-center;
}
:is(.dark .checkbox-box) {
  border-color: rgb(107 114 128); /* gray-500 — visible on dark bg */
}

/* Filter count badge */
.filter-count-badge {
  @apply text-xs font-bold px-2 py-0.5 rounded-full transition-colors;
  color: rgb(22 163 74 / 0.85);
  background-color: rgb(22 163 74 / 0.06);
}
:is(.dark .filter-count-badge) {
  color: rgb(74 222 128 / 0.9);           /* green-400 */
  background-color: rgb(22 163 74 / 0.12);
}

/* Price tag label */
.price-tag {
  @apply flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-semibold;
  background-color: rgb(240 253 244);     /* primary-50 */
}
:is(.dark .price-tag) {
  background-color: rgb(22 163 74 / 0.08);
}

/* ═══════════════════════════════════════════
   Dual range slider thumb styling
   ═══════════════════════════════════════════ */
.range-thumb {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.range-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #16a34a;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.range-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 10px rgba(22, 163, 74, 0.3);
}

.range-thumb::-webkit-slider-thumb:active {
  transform: scale(1.25);
}

/* Dark mode slider thumb — slightly darker bg with green glow */
:is(.dark .range-thumb)::-webkit-slider-thumb {
  background: rgb(31 41 55);  /* gray-800 */
  border-color: #22c55e;      /* primary-light for visibility */
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35), 0 0 0 2px rgba(34, 197, 94, 0.1);
}

:is(.dark .range-thumb)::-webkit-slider-thumb:hover {
  box-shadow: 0 3px 14px rgba(34, 197, 94, 0.45), 0 0 0 3px rgba(34, 197, 94, 0.15);
}

.range-thumb::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #16a34a;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

:is(.dark .range-thumb)::-moz-range-thumb {
  background: rgb(31 41 55);
  border-color: #22c55e;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);
}

/* ═══════════════════════════════════════════
   Checkbox visual override (checked state)
   ═══════════════════════════════════════════ */
input[type="checkbox"]:checked + .checkbox-box {
  border-color: #16a34a;
  background-color: #16a34a;
}

input[type="checkbox"]:checked + .checkbox-box svg {
  opacity: 1;
}

:is(.dark input[type="checkbox"]:checked + .checkbox-box) {
  border-color: #22c55e;
  background-color: #22c55e;
}

/* ═══════════════════════════════════════════
   Select dropdown dark mode fix
   ═══════════════════════════════════════════ */
:is(.dark select) {
  color-scheme: dark;
}

:is(.dark select option) {
  background-color: rgb(17 24 39);  /* gray-900 */
  color: rgb(229 231 235);          /* gray-200 */
}
.pager {
  @apply flex flex-wrap gap-2 justify-center mt-4;
}
.pager-button {
  @apply px-3 py-1 text-sm rounded border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition;
}
.pager-button.active {
  @apply bg-primary text-white dark:bg-primary-light dark:text-gray-900;
}
</style>
