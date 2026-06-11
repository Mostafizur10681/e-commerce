<template>
  <main class="py-14 px-4 bg-gray-50 dark:bg-gray-900/50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="section-title">About FreshMart</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Delivering freshness to your doorstep since 2023.</p>
      </div>
      
      <div class="card overflow-hidden mb-12">
        <img src="https://picsum.photos/seed/about/1200/500" alt="About Us" class="w-full h-64 md:h-80 object-cover" />
        <div class="p-8 md:p-10">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Story</h2>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            FreshMart started with a simple idea: everyone deserves access to fresh, healthy, and high-quality food without the hassle of navigating crowded supermarkets. What began as a small local delivery service has grown into a trusted online grocery destination.
          </p>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            We partner directly with local farmers and trusted suppliers to bring you the best seasonal produce, dairy, bakery items, and pantry staples. Our commitment is to quality, sustainability, and exceptional customer service.
          </p>
        </div>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6 text-center">
        <div class="card p-8">
          <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌱</div>
          <h3 class="font-bold text-xl mb-2 text-gray-800 dark:text-white">Freshness Guaranteed</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">We handpick every item to ensure you receive only the freshest products.</p>
        </div>
        <div class="card p-8">
          <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🚚</div>
          <h3 class="font-bold text-xl mb-2 text-gray-800 dark:text-white">Fast Delivery</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Get your groceries delivered to your door in as little as 2 hours.</p>
        </div>
        <div class="card p-8">
          <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💚</div>
          <h3 class="font-bold text-xl mb-2 text-gray-800 dark:text-white">Local Support</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">By shopping with us, you're supporting local farmers and businesses.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>
