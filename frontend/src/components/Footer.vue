<template>
  <footer class="bg-gray-900 text-gray-300 pt-14 pb-6">
    <!-- Skeleton while loading -->
    <template v-if="loading">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 animate-pulse">
        <div v-for="i in 4" :key="i" class="space-y-3">
          <div class="h-4 bg-gray-700 rounded w-32"></div>
          <div class="h-3 bg-gray-800 rounded w-full"></div>
          <div class="h-3 bg-gray-800 rounded w-5/6"></div>
          <div class="h-3 bg-gray-800 rounded w-4/6"></div>
        </div>
      </div>
    </template>

    <!-- Actual Footer Content -->
    <template v-else>
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-3xl">{{ data.store_icon || '🥬' }}</span>
            <span class="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              {{ data.store_name || 'FreshMart' }}
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">
            {{ data.store_description }}
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in (data.social_links || [])"
              :key="social.name"
              :href="social.url || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              :aria-label="social.name"
            >
              <!-- SVG icons based on social.icon name -->
              <svg v-if="social.icon === 'facebook'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <svg v-else-if="social.icon === 'twitter'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <svg v-else-if="social.icon === 'instagram'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="none" stroke="currentColor" stroke-width="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line fill="none" stroke="currentColor" stroke-width="2" x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <svg v-else-if="social.icon === 'youtube'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#1e293b" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              <span v-else class="text-xs font-bold">{{ social.name?.charAt(0) }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in (data.quick_links || [])" :key="link.label">
              <RouterLink :to="link.path" class="text-gray-400 hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-white font-bold mb-4">Customer Service</h3>
          <ul class="space-y-2">
            <li v-for="item in (data.service_links || [])" :key="item.label">
              <RouterLink
                v-if="item.path && !item.path.startsWith('http')"
                :to="item.path"
                class="text-gray-400 hover:text-primary transition-colors text-sm"
              >{{ item.label }}</RouterLink>
              <a v-else :href="item.path || '#'" class="text-gray-400 hover:text-primary transition-colors text-sm">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-bold mb-4">Contact Us</h3>
          <ul class="space-y-3 text-sm">
            <li v-if="data.contact_address" class="flex items-start gap-2">
              <span>📍</span><span class="text-gray-400">{{ data.contact_address }}</span>
            </li>
            <li v-if="data.contact_phone" class="flex items-start gap-2">
              <span>📞</span><span class="text-gray-400">{{ data.contact_phone }}</span>
            </li>
            <li v-if="data.contact_email" class="flex items-start gap-2">
              <span>📧</span><span class="text-gray-400">{{ data.contact_email }}</span>
            </li>
            <li v-if="data.contact_hours" class="flex items-start gap-2">
              <span>🕐</span><span class="text-gray-400">{{ data.contact_hours }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- Divider + copyright (always visible) -->
    <div class="border-t border-gray-800 pt-6">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-gray-500 text-sm">
          &copy; {{ new Date().getFullYear() }} {{ data.copyright_text || 'FreshMart. All rights reserved.' }}
        </p>
        <div class="flex gap-4">
          <RouterLink to="/privacy-policy" class="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</RouterLink>
          <RouterLink to="/terms-of-service" class="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const loading = ref(true);
const data = ref({
  store_name: 'FreshMart',
  store_icon: '🥬',
  store_description: 'Your trusted online grocery store. We deliver the freshest produce, dairy, and everyday essentials right to your doorstep.',
  copyright_text: 'FreshMart. All rights reserved.',
  social_links: [
    { name: 'Facebook',  icon: 'facebook',  url: '#' },
    { name: 'Twitter',   icon: 'twitter',   url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'YouTube',   icon: 'youtube',   url: '#' },
  ],
  quick_links: [
    { label: 'Home',     path: '/' },
    { label: 'Shop',     path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact',  path: '/contact' },
  ],
  service_links: [
    { label: 'FAQ',               path: '/faq' },
    { label: 'Shipping Info',     path: '/shipping-info' },
    { label: 'Returns & Refunds', path: '/returns-refunds' },
    { label: 'Order Tracking',    path: '/track-order' },
    { label: 'Payment Methods',   path: '/payment-methods' },
  ],
  contact_address: '123 Green Street, Dhaka 1205, Bangladesh',
  contact_phone:   '+880 1700-000000',
  contact_email:   'info@freshmart.com',
  contact_hours:   'Mon-Sat: 8AM - 10PM',
});

onMounted(async () => {
  try {
    const res = await api.get('/v1/footer-settings');
    if (res.data?.success && res.data?.data) {
      data.value = { ...data.value, ...res.data.data };
    }
  } catch (e) {
    console.warn('Using default footer data', e);
  } finally {
    loading.value = false;
  }
});
</script>
