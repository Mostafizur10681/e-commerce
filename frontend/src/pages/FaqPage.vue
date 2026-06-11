<template>
  <!-- Hero Banner -->
  <section class="bg-gray-100 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4 text-center">
      <h1 class="section-title">Frequently Asked Questions</h1>
      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Find answers to common questions about orders, delivery, payment, returns, and customer support.
      </p>
    </div>
  </section>

  <!-- Search Area -->
  <section class="py-8">
    <div class="container mx-auto px-4 flex justify-center">
      <div class="relative w-full max-w-lg">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search your question..."
          class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
      </div>
    </div>
  </section>

  <!-- Category Tabs -->
  <section class="py-4">
    <div class="container mx-auto px-4 flex flex-wrap justify-center gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="['px-4 py-2 rounded-full border transition', selectedCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700']"
      >
        {{ cat }}
      </button>
      <button
        @click="selectedCategory = ''"
        :class="['px-4 py-2 rounded-full border transition', selectedCategory === '' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700']"
      >All</button>
    </div>
  </section>

  <!-- FAQ Accordion -->
  <section class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <div v-for="(faq, index) in filteredFaqs" :key="faq.id" class="mb-4">
        <div @click="toggle(index)" class="cursor-pointer flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <span class="font-medium text-gray-800 dark:text-gray-200">{{ faq.question }}</span>
          <svg :class="{ 'transform rotate-180': activeIndex === index }" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <transition name="fade">
          <div v-if="activeIndex === index" class="p-4 bg-white dark:bg-gray-900 rounded-b-xl text-gray-700 dark:text-gray-300 border-l border-r border-b border-gray-200 dark:border-gray-700">
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>
  </section>

  <!-- Support Help Card -->
  <section class="py-12 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4 text-center max-w-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Still Need Help?</h2>
      <p class="mb-6 text-gray-600 dark:text-gray-300">Our support team is ready to help you.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/contact" class="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition">Contact Us</router-link>
        <router-link to="/track-order" class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition">Track Order</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import faqs from '@/data/faqs.json';

const searchTerm = ref('');
const activeIndex = ref(null);
const selectedCategory = ref('');

const categories = [
  'Orders',
  'Delivery',
  'Payments',
  'Returns',
  'Account',
  'Support',
];

const filteredFaqs = computed(() => {
  let result = faqs;
  if (selectedCategory.value) {
    result = result.filter(f => f.category === selectedCategory.value);
  }
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter(f =>
      f.question.toLowerCase().includes(term) ||
      f.answer.toLowerCase().includes(term)
    );
  }
  return result;
});

function toggle(idx) {
  activeIndex.value = activeIndex.value === idx ? null : idx;
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
