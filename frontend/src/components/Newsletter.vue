<template>
  <section class="py-14 px-4 bg-white dark:bg-gray-950 transition-colors duration-300" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <div class="bg-gradient-to-br from-primary via-emerald-500 to-teal-500 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-lg border border-emerald-500/10">
        <!-- Floating decorative items -->
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-sm"></div>
        <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-sm"></div>
        
        <div class="relative z-10 max-w-2xl mx-auto space-y-6">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white tracking-wider uppercase">
            ✉ Newsletter
          </span>
          
          <!-- Newsletter title with required ID and exact text -->
          <h2 id="newsletter" class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Get updates on latest offers & discounts
          </h2>
          
          <p class="text-white/90 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Subscribe to our seasonal newsletters and gain priority access to local discounts, fresh stock arrivals, and organic cooking tips.
          </p>
          
          <!-- Form -->
          <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              required
              class="flex-grow px-5 py-3.5 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-md placeholder-gray-400 text-sm font-semibold"
            />
            <button
              type="submit"
              class="bg-white text-primary font-black px-8 py-3.5 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition-all active:scale-98 shrink-0 text-sm"
            >
              Subscribe
            </button>
          </form>
          
          <!-- Success message -->
          <transition name="fade">
            <p v-if="subscribed" class="text-white font-bold text-sm mt-3 inline-flex items-center gap-1.5 justify-center">
              <span>✅</span> Thank you for subscribing to our newsletter!
            </p>
          </transition>
          
          <!-- Trust statement -->
          <p class="text-[10px] text-white/75 font-semibold uppercase tracking-wider">
            🛡 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const subscribed = ref(false);

const handleSubscribe = () => {
  subscribed.value = true;
  email.value = '';
  setTimeout(() => {
    subscribed.value = false;
  }, 5000);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
