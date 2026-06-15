<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-900 dark:to-green-950 text-white py-16 md:py-24">
      <div class="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-2xl"></div>
      <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 rounded-full bg-green-500/20 blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 backdrop-blur-sm mb-4 border border-emerald-400/20">
          🔄 Easy Returns & Refunds
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
          Returns & Refunds
        </h1>
        <p class="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Learn about our return policy, refund process, and eligibility requirements.
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 py-12 space-y-20">
      
      <!-- Section 1: Return Policy -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Our Return Policy</h2>
          <p class="text-gray-600 dark:text-gray-400">
            We want you to be fully satisfied with your purchase. Read our return window and condition rules below.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Card 1: Return Window -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">7-Day Return Window</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Initiate your return request within 7 days from the delivery date. Late requests cannot be processed.
            </p>
          </div>

          <!-- Card 2: Condition Requirements -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Original Condition</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Items must be unused, in their original packaging, with all manufacturer price tags and barcode labels attached.
            </p>
          </div>

          <!-- Card 3: Non-returnable Items -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-5">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Excluded Categories</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Certain categories such as personal hygiene products, fresh items, and customized foods are strictly non-returnable.
            </p>
          </div>

          <!-- Card 4: Damaged Product Policy -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Transit Damage</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If a product arrives damaged or defective, please report it within 24 hours of delivery for a free, instant replacement.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 2: Refund Process Timeline -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">The Refund Process</h2>
          <p class="text-gray-600 dark:text-gray-400">
            How your return request is processed and when you will receive your funds.
          </p>
        </div>

        <div class="relative mt-8">
          <!-- Desktop Line Connector -->
          <div class="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            <!-- Step 1 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Request Return</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Submit online or contact support</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Review Request</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">We verify within 24–48 hours</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Return Approved</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Confirmation sent via SMS/Email</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Product Received</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Courier collects item from you</p>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Refund Issued</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Funds returned to chosen channel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Eligible Items -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Eligible for Returns & Exchanges</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Understand which items qualify for a successful return, exchange, or refund.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-emerald-500 text-2xl">✔</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Eligible for Return</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Products that are delivered incorrectly (wrong brand, flavor, or package size), expired, or missing components are eligible for return.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-emerald-500 text-2xl">🔄</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Eligible for Exchange</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you received a defective item or ordered the wrong size/variant of a non-perishable product, we can exchange it depending on inventory availability.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-emerald-500 text-2xl">💰</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Refund Available</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Full refunds are processed to the original payment channel if the returned product passes our inspection and a replacement cannot be provided.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 4: Non-eligible Items -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Non-Eligible Items</h2>
          <p class="text-gray-600 dark:text-gray-400">
            For hygiene and health safety, the following conditions and items are excluded from returns.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Note 1 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-red-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-red-500 text-2xl">🍎</span>
              <h4 class="text-base font-bold text-gray-900 dark:text-white">Opened Consumables</h4>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Perishable foods, dairy products, baby items, fresh veggies, and unpacked grocery products cannot be returned once opened.
            </p>
          </div>

          <!-- Note 2 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-red-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-red-500 text-2xl">⚡</span>
              <h4 class="text-base font-bold text-gray-900 dark:text-white">Damaged by Customer</h4>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Items showing damage, scratches, moisture contact, or modification after receipt are excluded from refunds.
            </p>
          </div>

          <!-- Note 3 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-red-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-red-500 text-2xl">🛠</span>
              <h4 class="text-base font-bold text-gray-900 dark:text-white">Customized Products</h4>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Any products custom-ordered, custom-sliced, or packaged specifically to custom specifications are non-refundable.
            </p>
          </div>

          <!-- Note 4 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-red-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-red-500 text-2xl">👟</span>
              <h4 class="text-base font-bold text-gray-900 dark:text-white">Used Items</h4>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Products with broken security seals, washed garments, or clear signs of active usage cannot be processed.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 5: FAQ Accordion -->
      <section class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Return FAQs</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Find quick answers to common refund and exchange questions.
          </p>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden">
            <button
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800 text-left font-semibold text-gray-900 dark:text-white transition-colors duration-200"
            >
              <span>{{ faq.question }}</span>
              <svg
                :class="['w-5 h-5 text-gray-500 transition-transform duration-300', activeIndex === index ? 'transform rotate-180' : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              v-show="activeIndex === index"
              class="p-5 bg-gray-50/50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- CTA Section -->
    <section class="bg-gray-100 dark:bg-gray-900 py-16 mt-12 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-black text-gray-900 dark:text-white mb-4">
          Need Help With Returns?
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          Our customer support agents are ready to guide you through return requests or exchange questions.
        </p>
        <router-link
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 dark:bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:shadow-lg transition duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Contact Support</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = ref([
  {
    question: 'How do I return a product?',
    answer: 'You can submit a return request by contacting our customer support team or through your account dashboard in the "My Orders" section. Make sure to provide your Order ID and photo evidence if the item is damaged.'
  },
  {
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 3-7 business days after the returned product arrives at our warehouse and passes our quality inspection checks.'
  },
  {
    question: 'Can I exchange an item?',
    answer: 'Yes, if you receive a defective, damaged, or incorrect product, you can request an exchange. We will deliver the correct item to your location free of additional shipping costs.'
  },
  {
    question: 'Who pays return shipping?',
    answer: 'If the return is due to an error on our part (damaged, expired, or wrong product), shipping is completely free. For other returns, a nominal shipping pickup charge of 60 BDT inside Dhaka or 120 BDT outside Dhaka may apply.'
  }
]);
</script>

<style scoped>
</style>
