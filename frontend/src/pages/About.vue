<template>
  <div class="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

    <!-- ===================================
         SECTION 1: HERO BANNER
         =================================== -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-gray-900 dark:to-gray-950 py-20 px-4">
      <!-- Decorative blobs -->
      <div class="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-4xl mx-auto text-center">
        <span class="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-5">
          Who We Are
        </span>
        <h1 class="section-title">About Us</h1>
        <p class="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We are committed to providing the best online shopping experience with quality products and fast delivery — right to your doorstep.
        </p>
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <router-link to="/shop"
            class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Shop Now
          </router-link>
          <router-link to="/contact"
            class="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 2: OUR STORY
         =================================== -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div class="relative group rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <img
              src="@/assets/about-story.png"
              alt="Our Story"
              class="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <!-- Badge -->
            <div class="absolute bottom-5 left-5 bg-white dark:bg-gray-900 rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Since</p>
                <p class="text-sm font-bold text-gray-900 dark:text-white">2023</p>
              </div>
            </div>
          </div>

          <!-- Text -->
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-4">Our Story</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
              From a Small Idea to<br class="hidden sm:block" /> a Trusted Platform
            </h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              FreshMart started with a simple idea: everyone deserves access to fresh, healthy, and high-quality food without the hassle of navigating crowded supermarkets. What began as a small local delivery service has grown into a trusted online grocery destination serving thousands of happy customers.
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              We partner directly with local farmers and trusted suppliers to bring you the best seasonal produce, dairy, bakery items, and pantry staples. Our commitment is to quality, sustainability, and exceptional customer service.
            </p>
            <ul class="space-y-2.5">
              <li v-for="item in storyPoints" :key="item" class="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                <svg class="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 3: MISSION & VISION
         =================================== -->
    <section class="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-4">Our Purpose</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Mission &amp; Vision</h2>
        </div>
        <div class="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Mission -->
          <div class="group relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              To deliver high-quality products at affordable prices with excellent customer service, making online grocery shopping simple, reliable, and enjoyable for every household.
            </p>
          </div>
          <!-- Vision -->
          <div class="group relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 text-emerald-600 dark:text-emerald-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              To become one of the most trusted online shopping platforms in Bangladesh, empowering local farmers and delivering happiness to every home through technology and innovation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 4: WHY CHOOSE US
         =================================== -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-4">Our Advantages</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Why Choose FreshMart?</h2>
          <p class="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">We go the extra mile so you get the very best, every single time.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 hover:border-primary dark:hover:border-primary transition-all duration-300"
          >
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 text-2xl"
                 :class="feature.bgClass">
              {{ feature.icon }}
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 5: STATS COUNTER
         =================================== -->
    <section class="py-16 px-4 bg-primary">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center">
            <span class="text-4xl sm:text-5xl font-extrabold mb-1 leading-none">{{ stat.value }}</span>
            <span class="text-sm sm:text-base font-medium text-primary-100 opacity-90">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 6: TEAM SECTION
         =================================== -->
    <section class="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-4">The Team</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Meet Our Team</h2>
          <p class="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">Passionate people working every day to bring freshness to your door.</p>
        </div>
        <div class="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            v-for="member in team"
            :key="member.name"
            class="group text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="relative inline-block mb-4">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-24 h-24 rounded-full object-cover mx-auto shadow-md ring-4 ring-white dark:ring-gray-800 group-hover:ring-primary/30 transition-all duration-300"
              />
              <span class="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></span>
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">{{ member.name }}</h3>
            <p class="text-sm text-primary font-medium mt-0.5">{{ member.role }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================
         SECTION 7: CTA STRIP
         =================================== -->
    <section class="py-14 px-4 bg-gradient-to-r from-primary to-emerald-600">
      <div class="max-w-3xl mx-auto text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Start Shopping?</h2>
        <p class="text-sm sm:text-base text-white/80 mb-7">Explore thousands of fresh products delivered right to your door.</p>
        <router-link to="/shop"
          class="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          Explore Products
        </router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import teamCeoImg from '@/assets/team-ceo.png';
import teamFounderImg from '@/assets/team-founder.png';
import teamSupportImg from '@/assets/team-support.png';

const storyPoints = [
  'Partnered with 200+ local farmers & suppliers',
  'Delivering to 50+ cities across Bangladesh',
  'Over 10,000 happy customers and counting',
  'Same-day and next-day delivery available',
];

const features = [
  {
    icon: '🚚',
    title: 'Fast Delivery',
    desc: 'Get your groceries delivered to your door in as little as 2 hours.',
    bgClass: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    icon: '🌱',
    title: 'Quality Products',
    desc: 'We handpick every item to ensure you receive only the freshest products.',
    bgClass: 'bg-green-50 dark:bg-green-900/30',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: '100% secure checkout with multiple trusted payment methods.',
    bgClass: 'bg-amber-50 dark:bg-amber-900/30',
  },
  {
    icon: '💬',
    title: '24/7 Support',
    desc: 'Our friendly support team is always ready to help you anytime.',
    bgClass: 'bg-rose-50 dark:bg-rose-900/30',
  },
];

const stats = [
  { value: '12K+', label: 'Happy Customers' },
  { value: '50K+', label: 'Products Sold' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '200+', label: 'Local Suppliers' },
];

const team = [
  {
    name: 'Rafiul Islam',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years in eCommerce and supply chain management.',
    image: teamCeoImg,
  },
  {
    name: 'Nazmun Nahar',
    role: 'Co-Founder & COO',
    bio: 'Operations expert passionate about logistics, sustainability and customer experience.',
    image: teamFounderImg,
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Head of Support',
    bio: 'Dedicated to making every customer interaction seamless and satisfying.',
    image: teamSupportImg,
  },
];
</script>

<style scoped>
/* No additional styles needed – Tailwind handles everything */
</style>
