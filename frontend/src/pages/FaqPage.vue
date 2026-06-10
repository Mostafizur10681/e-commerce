<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary">Frequently Asked Questions</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Find answers to common questions about FreshMart.
      </p>
    </section>

    <!-- Search Input -->
    <div class="max-w-md mx-auto mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search FAQs..."
        class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <!-- Accordion List -->
    <div class="space-y-4 max-w-2xl mx-auto">
      <div
        v-for="(faq, index) in filteredFaqs"
        :key="index"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <button
          @click="toggle(index)"
          class="w-full flex justify-between items-center p-4 text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span class="font-medium text-gray-800 dark:text-gray-200">{{ faq.question }}</span>
          <svg
            :class="{ 'transform rotate-180': activeIndex === index }"
            class="w-5 h-5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeIndex === index" class="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
          {{ faq.answer }}
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-12">
      <router-link
        to="/contact"
        class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Still need help? Contact us
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import faqs from '@/data/faqs.json';

const searchTerm = ref('');
const activeIndex = ref(null);

const filteredFaqs = computed(() => {
  if (!searchTerm.value) return faqs;
  const term = searchTerm.value.toLowerCase();
  return faqs.filter(
    (f) => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
  );
});

function toggle(idx) {
  activeIndex.value = activeIndex.value === idx ? null : idx;
}
</script>

<style scoped>
/* Optional custom styles can be added here */
</style>
