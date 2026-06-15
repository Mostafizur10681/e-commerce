<template>
  <section class="py-16 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden" data-aos="fade-up">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="text-xs font-black text-primary dark:text-primary-light uppercase tracking-widest block mb-2">Testimonials</span>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">What Our Customers Say</h2>
      </div>

      <!-- Testimonial Slider Frame -->
      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${active * 100}%)` }"
        >
          <div
            v-for="review in reviewsList"
            :key="review.id"
            class="w-full flex-shrink-0 px-4"
          >
            <!-- Card Container -->
            <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 border border-gray-150 dark:border-gray-800 shadow-md text-center max-w-2xl mx-auto space-y-6 relative">
              <!-- Giant Quote SVG behind -->
              <span class="absolute top-4 left-6 text-6xl text-gray-100 dark:text-gray-800 font-serif select-none pointer-events-none opacity-50">“</span>
              
              <!-- Avatar -->
              <img
                :src="review.avatar"
                :alt="review.name"
                class="w-18 h-18 rounded-full mx-auto ring-4 ring-primary/20 object-cover shadow"
                loading="lazy"
              />

              <!-- Stars -->
              <div class="flex justify-center gap-1">
                <svg
                  v-for="n in 5"
                  :key="n"
                  class="w-5 h-5"
                  :class="n <= review.rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-750'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>

              <!-- Quote Text -->
              <blockquote class="text-base md:text-lg text-gray-650 dark:text-gray-300 italic font-medium leading-relaxed max-w-lg mx-auto">
                "{{ review.text }}"
              </blockquote>

              <!-- Name & Date -->
              <div>
                <h4 class="font-extrabold text-gray-900 dark:text-white">{{ review.name }}</h4>
                <p class="text-xs text-gray-400 mt-1">{{ review.date }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicator dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(review, i) in reviewsList"
            :key="review.id"
            @click="goTo(i)"
            class="h-2 rounded-full transition-all duration-300 focus:outline-none"
            :class="active === i ? 'bg-primary w-8' : 'bg-gray-300 dark:bg-gray-700 hover:bg-primary/50 w-2'"
            :aria-label="'Go to review slide ' + (i + 1)"
          >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import reviewsData from '../data/reviews.json';

const reviewsList = ref(reviewsData);
const active = ref(0);
let timer = null;

const next = () => {
  active.value = (active.value + 1) % reviewsList.value.length;
};

const goTo = (i) => {
  active.value = i;
  resetTimer();
};

const resetTimer = () => {
  clearInterval(timer);
  timer = setInterval(next, 6500);
};

onMounted(() => {
  timer = setInterval(next, 6500);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.w-18 {
  width: 4.5rem;
}
.h-18 {
  height: 4.5rem;
}
</style>
