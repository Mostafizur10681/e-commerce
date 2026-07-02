<template>
  <section class="py-14 px-4 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10">
        <h2 class="section-title">Our Trusted Partners</h2>
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          We collaborate with leading global brands to ensure quality and trust.
        </p>
      </div>

      <!-- Infinite marquee track -->
      <div
        class="relative overflow-hidden"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <!-- Left fade edge -->
        <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10
                    bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
        <!-- Right fade edge -->
        <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10
                    bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />

        <!-- Scrolling band — list duplicated for seamless infinite loop -->
        <div
          class="flex items-center gap-4 w-max"
          :class="paused ? 'marquee-paused' : 'marquee-running'"
          :style="{ animationDuration: `${partners.length * 2.8}s` }"
        >
          <!-- Two copies: first + duplicate -->
          <template v-for="pass in 2" :key="pass">
            <a
              v-for="partner in partners"
              :key="`${pass}-${partner.id}`"
              :href="partner.website || 'javascript:void(0)'"
              :target="partner.website ? '_blank' : '_self'"
              :class="['partner-card group flex-shrink-0 w-36 sm:w-44 h-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex items-center justify-center hover:border-primary dark:hover:border-primary hover:shadow-xl hover:scale-105 transition-all duration-300 select-none', partner.website ? 'cursor-pointer' : 'cursor-default']"
              @click="partner.website ? null : $event.preventDefault()"
            >
              <img
                v-if="partner.logo || partner.image"
                :src="getImageUrl(partner.logo || partner.image)"
                :alt="partner.name"
                class="h-12 w-auto max-w-full object-contain mx-auto p-1 transition-all duration-300"
                loading="lazy"
                @error="handleImgError($event, partner)"
              />
              <span v-else class="text-sm font-bold text-gray-500 dark:text-gray-400 text-center leading-tight px-2">
                {{ partner.name }}
              </span>
            </a>
          </template>
        </div>
      </div>

      <!-- Animated dot progress bar -->
      <div class="flex justify-center gap-1.5 mt-8" aria-hidden="true">
        <span
          v-for="partner in partners"
          :key="partner.id"
          class="inline-block h-1.5 rounded-full transition-all duration-500"
          :class="activeDot === partner.id - 1
            ? 'w-6 bg-primary'
            : 'w-1.5 bg-gray-300 dark:bg-gray-600'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import partnersData from '../data/partners.json';
import api from '../services/api';

/* ── Data ── */
const partners = ref(partnersData);
const paused   = ref(false);
const activeDot = ref(0);

let dotTimer = null;

function getImageUrl(img) {
  if (!img) return '';
  if (img.startsWith('http') || img.startsWith('data:image/')) return img;
  if (img.startsWith('/')) return img;
  
  // Use VITE_API_URL or fallback, removing '/api' to get base storage URL
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://127.0.0.1:8000';
  return `${baseUrl}/storage/${img}`;
}

/* ── Fallback when image fails to load ── */
function handleImgError(event, partner) {
  const img  = event.target;
  const card = img.closest('.partner-card');
  if (!card) return;
  img.remove();
  const label = document.createElement('span');
  label.className = 'text-sm font-bold text-gray-500 dark:text-gray-400 text-center leading-tight px-2';
  label.textContent = partner.name;
  card.appendChild(label);
}

function startDotTimer() {
  if (dotTimer) clearInterval(dotTimer);
  if (partners.value.length === 0) return;
  dotTimer = setInterval(() => {
    activeDot.value = (activeDot.value + 1) % partners.value.length;
  }, Math.round(partners.value.length * 2800 / partners.value.length));
}

/* ── Fetch partners & start timer ── */
onMounted(async () => {
  try {
    const response = await api.get('/v1/partners');
    if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
      partners.value = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch partners from API, using fallback:', error);
  }
  startDotTimer();
});

onBeforeUnmount(() => {
  if (dotTimer) clearInterval(dotTimer);
});
</script>

<style scoped>
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-running {
  animation: marquee-scroll linear infinite;
}

.marquee-paused {
  animation: marquee-scroll linear infinite;
  animation-play-state: paused;
}
</style>
