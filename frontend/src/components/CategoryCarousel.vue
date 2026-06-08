<template>
  <section class="py-12 px-4" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <h2 class="section-title">Shop by Category</h2>
      <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        <div v-for="cat in categories" :key="cat.id"
          class="flex-shrink-0 snap-center group cursor-pointer"
          data-aos="zoom-in" :data-aos-delay="cat.id * 100">
          <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 ring-2 ring-transparent group-hover:ring-primary">
            <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <p class="text-center mt-3 font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{{ cat.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import categories from '../data/categories.json';
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
