<template>
  <section class="relative overflow-hidden" data-aos="fade-up">
    <div class="relative h-72 sm:h-96 md:h-[520px]">
      <transition-group name="fade-slide">
        <div v-for="(slide, i) in slides" :key="slide.id" v-show="active === i"
          class="absolute inset-0">
          <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
            <div class="max-w-7xl mx-auto px-6 w-full">
              <div class="max-w-xl">
                <span class="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">{{ slide.badge || 'Featured' }}</span>
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">{{ slide.title }}</h2>
                <p class="text-base sm:text-lg text-gray-200 mb-6">{{ slide.subtitle }}</p>
                <RouterLink :to="slide.ctaLink" class="btn-primary">
                  {{ slide.ctaText }}
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <!-- Navigation arrows -->
    <button @click="prev" class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2.5 transition-all" aria-label="Previous">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button @click="next" class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2.5 transition-all" aria-label="Next">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>
    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <button v-for="(slide, i) in slides" :key="slide.id" @click="goTo(i)"
        class="w-2.5 h-2.5 rounded-full transition-all duration-300"
        :class="active === i ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'"
        :aria-label="'Go to slide ' + (i + 1)">
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import slidesData from '../data/sliders.json';

const slides = slidesData;
const active = ref(0);
let timer = null;

const next = () => { active.value = (active.value + 1) % slides.length; };
const prev = () => { active.value = (active.value - 1 + slides.length) % slides.length; };
const goTo = (i) => { active.value = i; resetTimer(); };

const resetTimer = () => { clearInterval(timer); timer = setInterval(next, 5000); };

onMounted(() => { timer = setInterval(next, 5000); });
onBeforeUnmount(() => { clearInterval(timer); });
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.7s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(30px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
