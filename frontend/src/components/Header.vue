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
      <RouterLink to="/" class="flex items-center gap-2">
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
        <!-- Search -->
        <button class="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition w-56">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search products...
        </button>
        <!-- Theme toggle -->
        <ThemeToggle />
        <!-- Cart -->
        <button @click="uiStore.toggleCartDrawer()" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{{ cartStore.totalItems }}</span>
        </button>
        <!-- Mobile hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg v-if="!mobileOpen" class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else class="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </nav>
    <!-- Mobile drawer -->
    <transition name="slide">
      <div v-if="mobileOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
        <div class="px-4 py-3 space-y-1">
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
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';
import { useCartStore } from '../stores/cartStore';
import { useUiStore } from '../stores/uiStore';

const cartStore = useCartStore();
const uiStore = useUiStore();

const mobileOpen = ref(false);
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
];
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
