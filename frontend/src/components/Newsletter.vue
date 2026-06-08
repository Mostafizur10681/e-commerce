<template>
  <section class="py-14 px-4" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <div class="bg-gradient-to-br from-primary via-emerald-500 to-teal-500 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div class="relative z-10">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-3">Stay Updated!</h2>
          <p class="text-white/80 mb-6 max-w-md mx-auto text-sm sm:text-base">Subscribe to our newsletter and get exclusive deals, fresh arrivals, and seasonal offers directly in your inbox.</p>
          <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input v-model="email" type="email" placeholder="Enter your email address" required
              class="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg" />
            <button type="submit"
              class="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Subscribe
            </button>
          </form>
          <p v-if="subscribed" class="text-white/90 text-sm mt-3 font-medium">✅ Thank you for subscribing!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const subscribed = ref(false);
const subscribe = () => { subscribed.value = true; email.value = ''; };
</script>
