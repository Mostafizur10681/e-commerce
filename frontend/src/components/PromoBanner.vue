<template>
  <section class="py-14 px-4" data-aos="fade-up">
    <div class="max-w-7xl mx-auto">
      <div class="relative rounded-3xl overflow-hidden">
        <img src="https://picsum.photos/seed/promo/1200/400" alt="Promotional Banner" class="w-full h-48 sm:h-64 md:h-80 object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent flex items-center">
          <div class="px-8 sm:px-12 max-w-lg">
            <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Limited Time</span>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">Up to 40% Off!</h2>
            <p class="text-white/90 text-sm sm:text-base mb-5">Fresh organic vegetables and fruits. Don't miss this amazing deal on premium quality produce.</p>
            <RouterLink to="/shop" class="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              Shop the Sale
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
