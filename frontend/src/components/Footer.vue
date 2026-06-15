<template>
  <footer class="bg-gray-900 text-gray-300 pt-14 pb-6">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-3xl">🥬</span>
          <span class="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">FreshMart</span>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">Your trusted online grocery store. We deliver the freshest produce, dairy, and everyday essentials right to your doorstep.</p>
        <div class="flex gap-3">
          <a v-for="social in socials" :key="social.name" href="#"
            class="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors" :aria-label="social.name">
            <span class="text-sm">{{ social.icon }}</span>
          </a>
        </div>
      </div>
      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-bold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li v-for="link in quickLinks" :key="link.label">
            <RouterLink :to="link.path" class="text-gray-400 hover:text-primary transition-colors text-sm">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </div>
      <!-- Customer Service -->
      <div>
        <h3 class="text-white font-bold mb-4">Customer Service</h3>
        <ul class="space-y-2">
            <li v-for="item in serviceLinks" :key="item.label">
              <RouterLink v-if="item.path !== '#'" :to="item.path" class="text-gray-400 hover:text-primary transition-colors text-sm">{{ item.label }}</RouterLink>
              <a v-else href="#" class="text-gray-400 hover:text-primary transition-colors text-sm">{{ item.label }}</a>
            </li>
        </ul>
      </div>
      <!-- Contact -->
      <div>
        <h3 class="text-white font-bold mb-4">Contact Us</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start gap-2"><span>📍</span><span class="text-gray-400">123 Green Street, Dhaka 1205, Bangladesh</span></li>
          <li class="flex items-start gap-2"><span>📞</span><span class="text-gray-400">+880 1700-000000</span></li>
          <li class="flex items-start gap-2"><span>📧</span><span class="text-gray-400">info@freshmart.com</span></li>
          <li class="flex items-start gap-2"><span>🕐</span><span class="text-gray-400">Mon-Sat: 8AM - 10PM</span></li>
        </ul>
      </div>
    </div>
    <!-- Divider + copyright -->
    <div class="border-t border-gray-800 pt-6">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }} FreshMart. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'Facebook', icon: 'f' },
  { name: 'Twitter', icon: '𝕏' },
  { name: 'Instagram', icon: '📷' },
  { name: 'YouTube', icon: '▶' },
];
const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
const serviceLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Shipping Info', path: '/shipping-info' },
  { label: 'Returns & Refunds', path: '#' },
  { label: 'Order Tracking', path: '/track-order' },
  { label: 'Payment Methods', path: '#' },
];
</script>
