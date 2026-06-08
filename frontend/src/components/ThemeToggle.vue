<template>
  <button @click="toggle"
    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <transition name="spin" mode="out-in">
      <svg v-if="!isDark" key="sun" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
      <svg v-else key="moon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    </transition>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from '../stores/theme';
const themeStore = useThemeStore();
const toggle = () => themeStore.toggle();
const isDark = computed(() => themeStore.darkMode);
</script>

<style scoped>
.spin-enter-active, .spin-leave-active { transition: all 0.25s ease; }
.spin-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.spin-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }
</style>
