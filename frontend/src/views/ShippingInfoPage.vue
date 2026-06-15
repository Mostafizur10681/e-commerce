<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-900 dark:to-green-950 text-white py-16 md:py-24">
      <!-- Background Decorative Circles -->
      <div class="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-2xl"></div>
      <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 rounded-full bg-green-500/20 blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 backdrop-blur-sm mb-4 border border-emerald-400/20" data-aos="fade-up">
          🚚 Fast & Secure Delivery
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6" data-aos="fade-up" data-aos-delay="100">
          Shipping Information
        </h1>
        <p class="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          Learn about our delivery process, shipping charges, and estimated delivery times.
        </p>
      </div>
    </section>

    <!-- Content Sections Wrapper -->
    <div class="max-w-7xl mx-auto px-4 py-12 space-y-20">
      
      <!-- Section 1: Delivery Coverage -->
      <section class="scroll-mt-20">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Delivery Coverage</h2>
          <p class="text-gray-600 dark:text-gray-400">
            We deliver products across all districts of Bangladesh. No matter where you are, we'll get your fresh produce and essentials to you.
          </p>
        </div>

        <!-- Coverage Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <!-- Map Icon -->
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Nationwide Delivery</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Serving every corner of Bangladesh, from metropolitan cities to remote areas.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <!-- Lightning Icon -->
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Shipping</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Optimized routing and logistics guarantee prompt deliveries right to your doorstep.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <!-- Shield Icon -->
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Reliable Service</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Professional handlers ensuring your items arrive fresh and undamaged.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 2: Delivery Time & Section 3: Shipping Charges (Side-by-side or stacked grid) -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- Delivery Time -->
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Estimated Delivery Time</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Depending on your location, delivery timelines will vary. We make every effort to get your packages delivered as fast as possible.
          </p>

          <div class="space-y-4">
            <!-- Item 1 -->
            <div class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-150 dark:border-gray-700 shadow-sm">
              <div class="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold shrink-0">
                1
              </div>
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Inside Dhaka</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">1–2 Business Days</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">Standard</span>
            </div>

            <!-- Item 2 -->
            <div class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-150 dark:border-gray-700 shadow-sm">
              <div class="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold shrink-0">
                2
              </div>
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Outside Dhaka</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">2–5 Business Days</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">Standard</span>
            </div>

            <!-- Item 3 -->
            <div class="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-150 dark:border-gray-700 shadow-sm">
              <div class="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold shrink-0">
                3
              </div>
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Remote Areas</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">3–7 Business Days</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-semibold">Extended</span>
            </div>
          </div>
        </div>

        <!-- Shipping Charges -->
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Shipping Charges</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Flat-rate shipping costs are determined by major geographic zones. No hidden costs.
          </p>

          <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-150 dark:border-gray-750">
                  <th class="p-5 font-bold text-gray-800 dark:text-gray-200">Delivery Zone</th>
                  <th class="p-5 font-bold text-gray-800 dark:text-gray-200 text-right">Charge</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-150 dark:divide-gray-750">
                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-750/30 transition-colors">
                  <td class="p-5 flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span class="font-medium">Dhaka City</span>
                  </td>
                  <td class="p-5 font-semibold text-right text-emerald-600 dark:text-emerald-400">60 BDT</td>
                </tr>
                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-750/30 transition-colors">
                  <td class="p-5 flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span class="font-medium">Outside Dhaka</span>
                  </td>
                  <td class="p-5 font-semibold text-right text-emerald-600 dark:text-emerald-400">120 BDT</td>
                </tr>
                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-750/30 transition-colors">
                  <td class="p-5 flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span class="font-medium">Remote Areas</span>
                  </td>
                  <td class="p-5 font-semibold text-right text-emerald-600 dark:text-emerald-400">150 BDT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Section 4: Order Process Timeline -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Our Order Process</h2>
          <p class="text-gray-600 dark:text-gray-400">
            From the moment you click buy to the knock on your door, here is how we handle your order.
          </p>
        </div>

        <!-- Timeline -->
        <div class="relative mt-8">
          <!-- Desktop Line Connector -->
          <div class="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            
            <!-- Step 1 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <!-- Order Placed SVG -->
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Order Placed</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Checkout successful</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <!-- Confirmed SVG -->
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Order Confirmed</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Payment & inventory verified</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <!-- Packed SVG -->
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Packed</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Handled with fresh packaging</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <!-- Shipped SVG -->
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Shipped</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Handed over to local dispatcher</p>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center group">
              <div class="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-emerald-500 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                <!-- Delivered SVG -->
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div class="lg:mt-4">
                <h4 class="font-bold text-gray-900 dark:text-white text-base">Delivered</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:mt-1">Safely arrived at your home</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Section 5: Important Notes -->
      <section>
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Important Notes</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Please keep the following guidelines in mind to help ensure a smooth delivery experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Note 1 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-amber-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-amber-500 text-2xl">📅</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Holiday Delays</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Deliveries may take longer than usual during public holidays, severe weather conditions, or unexpected civic disruptions. We appreciate your patience.
            </p>
          </div>

          <!-- Note 2 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-red-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-red-500 text-2xl">📍</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Address Information</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Double-check your shipping address and contact number before confirming orders. Incorrect details can lead to delivery delays or shipment cancellations.
            </p>
          </div>

          <!-- Note 3 -->
          <div class="p-6 bg-white dark:bg-gray-800 border-t-4 border-blue-500 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-blue-500 text-2xl">📞</span>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white">Delayed Orders</h4>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If your order does not arrive within the estimated timeframe, please immediately contact our 24/7 customer support via email or phone.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 6: FAQ Accordion -->
      <section class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Quick answers to some of the most common shipping concerns.
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
          Need Help With Your Order?
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          Have an order ID ready? Check its live delivery phase using our online tracking dashboard.
        </p>
        <router-link
          to="/track-order"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 dark:bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:shadow-lg transition duration-200"
        >
          <!-- Search/Track SVG -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Track Order</span>
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
    question: 'How long does delivery take?',
    answer: 'Delivery takes 1-2 business days inside Dhaka City, 2-5 business days outside Dhaka, and 3-7 business days for remote areas.'
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order using the "Track Order" link in our customer service footer menu or by clicking the "Track Order" button above, where you can search using your Order ID.'
  },
  {
    question: 'What if I miss delivery?',
    answer: 'If you miss a delivery attempt, our courier partner will call you to reschedule. Normally, up to 3 delivery attempts are made before the shipment is returned to our warehouse.'
  },
  {
    question: 'Can I change delivery address?',
    answer: 'You can update your shipping address only if your package has not been shipped yet. Please contact customer support immediately to request modifications.'
  }
]);
</script>

<style scoped>
/* Local transitions/animations if required */
</style>
