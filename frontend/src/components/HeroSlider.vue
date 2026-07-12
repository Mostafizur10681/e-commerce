<template>
  <section class="relative overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300" data-aos="fade-up">
    <!-- Main Slider Track -->
    <div v-if="loading" class="relative h-96 sm:h-[480px] md:h-[580px] w-full animate-pulse bg-gray-100 dark:bg-gray-900/60 flex items-center">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-6">
        <div class="h-8 w-36 bg-gray-200/90 dark:bg-gray-800 rounded-full"></div>
        <div class="h-14 w-96 bg-gray-200/90 dark:bg-gray-800 rounded-md max-w-[80%]"></div>
        <div class="h-6 w-80 bg-gray-200/90 dark:bg-gray-800 rounded-md max-w-[60%]"></div>
        <div class="h-14 w-40 bg-gray-200/90 dark:bg-gray-800 rounded-2xl"></div>
      </div>
    </div>
    <div v-else class="relative h-96 sm:h-[480px] md:h-[580px] w-full">
      <transition-group name="fade-slide">
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          v-show="active === i"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Background image with zoom effect on mounting -->
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover transition-transform duration-1000"
            :class="active === i ? 'scale-105' : 'scale-100'"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent flex items-center">
            <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div class="max-w-xl text-left space-y-4 md:space-y-6">
                <!-- Badge -->
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/95 text-white shadow-lg tracking-wider uppercase backdrop-blur-md">
                  ✨ {{ slide.badge || 'Fresh Choice' }}
                </span>
                
                <!-- Title -->
                <h2 class="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-sm">
                  {{ slide.title }}
                </h2>
                
                <!-- Subtitle -->
                <p class="text-base sm:text-xl text-gray-200 leading-relaxed font-medium">
                  {{ slide.subtitle }}
                </p>
                
                <!-- CTA Button -->
                <div class="pt-2">
                    <RouterLink
                    :to="slide.cta_link || '/shop'"
                    class="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary-dark transition duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transform group"
                  >
                    <span>{{ slide.cta_text || 'Shop Now' }}</span>
                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prev"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-black/10 hover:bg-primary/90 dark:hover:bg-primary/90 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 active:scale-90 shadow"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="next"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-black/10 hover:bg-primary/90 dark:hover:bg-primary/90 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 active:scale-90 shadow"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Navigation Indicator Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <button
        v-for="(slide, i) in slides"
        :key="slide.id"
        @click="goTo(i)"
        class="h-2.5 rounded-full transition-all duration-300 focus:outline-none"
        :class="active === i ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/95 w-2.5'"
        :aria-label="'Go to slide ' + (i + 1)"
      >
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import api from '../services/api';

const slides = ref([]);
const active = ref(0);
let timer = null;
const loading = ref(true);

const next = () => {
  active.value = (active.value + 1) % slides.value.length;
};

const prev = () => {
  active.value = (active.value - 1 + slides.value.length) % slides.value.length;
};

const goTo = (i) => {
  active.value = i;
  resetTimer();
};

const startTimer = () => {
  timer = setInterval(next, 6500);
};

const stopTimer = () => {
  clearInterval(timer);
};

const resetTimer = () => {
  stopTimer();
  startTimer();
};

const fetchBanners = async () => {
  loading.value = true;
  try {
    const res = await api.get('/v1/banners?menu=Main Slider&public=true');
    if (res.data && res.data.data && res.data.data.length > 0) {
      slides.value = res.data.data;
    } else {
      // Fallback if no banners are returned
      slides.value = [
        {
          id: 1,
          title: "Fresh Vegetables",
          subtitle: "Organic & locally sourced",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920",
          badge: "Fresh Choice",
          cta_text: "Shop Now",
          cta_link: "/shop"
        }
      ];
    }
  } catch (error) {
    console.error("Failed to fetch banners", error);
    // Fallback on error
    slides.value = [
      {
        id: 1,
        title: "Fresh Vegetables",
        subtitle: "Organic & locally sourced",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920",
        badge: "Fresh Choice",
        cta_text: "Shop Now",
        cta_link: "/shop"
      }
    ];
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchBanners();
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});
</script>

<style scoped>
/* Fade + slide transition for slider items */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
