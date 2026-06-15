<template>
  <section class="py-14 px-4 md:px-0 w-full" data-aos="fade-up">
    <div class="max-w-7xl mx-auto md:px-4">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-primary to-teal-700 py-12 px-8 sm:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-emerald-500/10">
        <!-- Floating decorative items -->
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-2xl"></div>
        
        <div class="relative z-10 max-w-2xl text-center md:text-left space-y-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white tracking-wider uppercase">
            🔥 Flash Deal
          </span>
          <h2 id="promo" class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Special Deals This Week – Up to 50% OFF
          </h2>
          <p class="text-white/90 text-sm sm:text-base max-w-md leading-relaxed">
            Get premium quality organic groceries, fresh local vegetables, and home essentials delivered straight to your door at unbeatable prices.
          </p>
        </div>
        
        <div class="relative z-10 shrink-0">
          <RouterLink to="/shop" class="inline-flex items-center gap-2 bg-white text-primary font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-98">
            Shop the Sale
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

