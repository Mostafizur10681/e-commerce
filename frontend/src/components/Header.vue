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
          class="text-gray-600 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors duration-200 relative group"
          active-class="text-primary dark:text-primary-light font-semibold [&>span]:w-full">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </RouterLink>

        <!-- Sign In or My Account Dropdown -->
        <template v-if="!authStore.currentUser">
          <RouterLink to="/login"
            class="text-gray-600 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors duration-200 relative group">
            Sign In
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </RouterLink>
        </template>
        <template v-else>
          <div class="relative" ref="accountWrapRef">
            <button @click="accountDropdownOpen = !accountDropdownOpen"
              class="flex items-center gap-1 text-gray-600 dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors duration-200 outline-none">
              <span>My Account</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': accountDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <Transition name="dropdown">
              <div v-if="accountDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-fade-in">
                <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                  <p class="text-xs text-gray-400 dark:text-gray-500">Signed in as</p>
                  <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{{ authStore.currentUser.name }}</p>
                </div>
                
                <button @click="navigateToAccount('/myaccount/dashboard')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </button>
                
                <button @click="navigateToAccount('/myaccount/profile')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                
                <button @click="navigateToAccount('/myaccount/orders')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Orders
                </button>
                
                <hr class="border-gray-100 dark:border-gray-700 my-1" />
                
                <button @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-2 font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </Transition>
          </div>
        </template>
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
            class="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors"
            active-class="bg-primary-50 dark:bg-gray-800 text-primary dark:text-primary-light font-semibold">
            {{ link.label }}
          </RouterLink>

          <!-- Mobile Sign In / Account Dropdown -->
          <template v-if="!authStore.currentUser">
            <RouterLink to="/login" @click="mobileOpen = false"
              class="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors border-t border-gray-100 dark:border-gray-800 mt-2 pt-3">
              Sign In
            </RouterLink>
          </template>
          <template v-else>
            <div class="border-t border-gray-100 dark:border-gray-800 mt-2 pt-3">
              <div class="px-4 py-2 mb-1">
                <p class="text-xs text-gray-400 dark:text-gray-500">Signed in as</p>
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{{ authStore.currentUser.name }}</p>
              </div>
              <button @click="navigateToAccount('/myaccount/dashboard'); mobileOpen = false"
                class="w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors flex items-center gap-2">
                <span>📊 Dashboard</span>
              </button>
              <button @click="navigateToAccount('/myaccount/profile'); mobileOpen = false"
                class="w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors flex items-center gap-2">
                <span>👤 Profile</span>
              </button>
              <button @click="navigateToAccount('/myaccount/orders'); mobileOpen = false"
                class="w-full text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary transition-colors flex items-center gap-2">
                <span>📦 Orders</span>
              </button>
              <button @click="handleLogout(); mobileOpen = false"
                class="w-full text-left px-4 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2">
                <span>🚪 Logout</span>
              </button>
            </div>
          </template>
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
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';

const cartStore = useCartStore();
const uiStore   = useUiStore();
const productStore = useProductStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const accountDropdownOpen = ref(false);
const accountWrapRef = ref(null);

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
  if (accountWrapRef.value && !accountWrapRef.value.contains(e.target)) {
    accountDropdownOpen.value = false;
  }
}

function handleLogout() {
  accountDropdownOpen.value = false;
  authStore.logout();
  toastStore.show('Logout successful', 'success');
  router.push('/');
}

function navigateToAccount(path) {
  accountDropdownOpen.value = false;
  router.push(path);
}

function navigateDummy(path) {
  accountDropdownOpen.value = false;
  toastStore.show(`${path.slice(1).charAt(0).toUpperCase() + path.slice(2)} page is coming soon!`, 'info');
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
