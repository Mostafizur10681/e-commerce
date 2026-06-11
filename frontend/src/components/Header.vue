<template>
  <header class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100 dark:border-gray-800">
    <!-- Top bar -->
    <div class="bg-primary text-white text-xs py-1.5 hidden md:block">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span>🚚 Free delivery on orders over ৳500</span>
        <div class="flex gap-4">
          <span>📞 +880 1700-000000</span>
          <span>📧 info@freshmart.com</span>
        </div>
      </div>
    </div>

    <!-- Main nav -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0">
        <span class="text-3xl">🥬</span>
        <span class="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">FreshMart</span>
      </RouterLink>

      <!-- Desktop menu -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path"
          class="text-gray-600 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors duration-200 relative group">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </RouterLink>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-3">

        <!-- ── Desktop Search ── -->
        <div class="hidden md:block relative" ref="searchWrapRef">
          <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 w-56 gap-2 transition focus-within:ring-2 focus-within:ring-primary/50">
            <!-- Search icon / submit -->
            <button @click="submitSearch" type="button" class="flex-shrink-0 text-gray-400 hover:text-primary transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            <!-- Actual text input -->
            <input
              id="header-search"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              autocomplete="off"
              class="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              @keyup.enter="submitSearch"
              @input="onInput"
              @focus="dropdownOpen = true"
            />
            <!-- Clear button -->
            <button
              v-if="searchQuery"
              @click="clearSearch"
              type="button"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Live suggestions dropdown -->
          <Transition name="dropdown">
            <div
              v-if="dropdownOpen && searchQuery.length >= 1 && suggestions.length"
              class="absolute top-full mt-2 left-0 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
            >
              <ul>
                <li
                  v-for="product in suggestions"
                  :key="product.id"
                  @mousedown.prevent="goToProduct(product)"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <img
                    :src="product.image || product.images?.[0]"
                    :alt="product.name"
                    class="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{{ product.name }}</p>
                    <p class="text-xs text-primary font-semibold">৳{{ product.price }}</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </li>
              </ul>
              <!-- View all results -->
              <button
                @mousedown.prevent="submitSearch"
                class="w-full px-4 py-3 text-xs font-semibold text-primary bg-gray-50 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors text-center border-t border-gray-100 dark:border-gray-700"
              >
                View all results for "{{ searchQuery }}"
              </button>
            </div>
          </Transition>

          <!-- No results -->
          <Transition name="dropdown">
            <div
              v-if="dropdownOpen && searchQuery.length >= 2 && suggestions.length === 0"
              class="absolute top-full mt-2 left-0 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 px-4 py-5 text-center z-50"
            >
              <p class="text-sm text-gray-500 dark:text-gray-400">No products found for <strong>"{{ searchQuery }}"</strong></p>
            </div>
          </Transition>
        </div>

        <!-- Theme toggle -->
        <ThemeToggle />

        <!-- Cart -->
        <button @click="uiStore.toggleCartDrawer()" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {{ cartStore.totalItems }}
          </span>
        </button>

        <!-- Mobile hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg v-if="!mobileOpen" class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <transition name="slide">
      <div v-if="mobileOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
        <div class="px-4 py-3 space-y-1">
          <!-- Mobile search -->
          <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2.5 gap-2 mb-3">
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              autocomplete="off"
              class="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
              @keyup.enter="submitSearch(); mobileOpen = false"
            />
          </div>

          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="mobileOpen = false"
            class="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors">
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-16 md:h-[calc(4rem+28px)]"></div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';
import { useCartStore } from '../stores/cartStore';
import { useUiStore } from '../stores/uiStore';
import { useProductStore } from '../stores/productStore';

const cartStore = useCartStore();
const uiStore   = useUiStore();
const productStore = useProductStore();
const router = useRouter();

const mobileOpen  = ref(false);
const searchQuery = ref('');
const dropdownOpen = ref(false);
const searchWrapRef = ref(null);

const navLinks = [
  { path: '/',           label: 'Home'        },
  { path: '/shop',       label: 'Shop'        },
  { path: '/about',      label: 'About'       },
  { path: '/contact',    label: 'Contact'     },
  { path: '/faq',        label: 'FAQ'         },
  { path: '/track-order',label: 'Track Order' },
];

/* ── Live suggestions (max 6) ── */
const suggestions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return [];
  return productStore.products
    .filter(p => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q))
    .slice(0, 6);
});

/* ── Handlers ── */
function onInput() {
  dropdownOpen.value = true;
}

function submitSearch() {
  const q = searchQuery.value.trim();
  if (!q) return;
  dropdownOpen.value = false;
  router.push({ path: '/shop', query: { search: q } });
}

function goToProduct(product) {
  dropdownOpen.value = false;
  searchQuery.value  = '';
  router.push({ path: `/product/${product.id}` });
}

function clearSearch() {
  searchQuery.value  = '';
  dropdownOpen.value = false;
}

/* ── Close dropdown on outside click ── */
function handleOutsideClick(e) {
  if (searchWrapRef.value && !searchWrapRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
}

onMounted(()      => document.addEventListener('mousedown', handleOutsideClick));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutsideClick));
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
