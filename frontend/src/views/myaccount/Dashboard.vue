<template>
  <div class="space-y-6">
    <!-- Welcome Card -->
    <div class="relative bg-gradient-to-r from-primary/90 to-emerald-500/90 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
      <!-- Background details -->
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-300/10 rounded-full blur-2xl"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Customer Portal
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome Back, {{ authStore.currentUser?.name }}!</h2>
          <p class="text-sm text-emerald-100 mt-2 font-medium">
            Member since {{ formatMemberDate(authStore.currentUser?.createdAt) }}
          </p>
        </div>
        <div class="shrink-0 flex gap-2">
          <RouterLink
            to="/shop"
            class="px-5 py-2.5 bg-white text-primary font-bold text-sm rounded-xl hover:bg-emerald-50 transition duration-300 shadow-md flex items-center gap-1.5"
          >
            <span>🛒</span> Continue Shopping
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <!-- Orders card -->
      <RouterLink
        to="/myaccount/orders"
        class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 hover:border-primary/40 dark:hover:border-primary/40 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-5 group"
      >
        <div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-black text-gray-900 dark:text-white">{{ stats.totalOrders }}</p>
          <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mt-0.5 tracking-wider">Total Orders</p>
        </div>
      </RouterLink>

      <!-- Wishlist card -->
      <RouterLink
        to="/myaccount/wishlist"
        class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 hover:border-primary/40 dark:hover:border-primary/40 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-5 group"
      >
        <div class="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-black text-gray-900 dark:text-white">{{ stats.wishlistCount }}</p>
          <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mt-0.5 tracking-wider">Wishlist Items</p>
        </div>
      </RouterLink>

      <!-- Address card -->
      <RouterLink
        to="/myaccount/address"
        class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 hover:border-primary/40 dark:hover:border-primary/40 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-5 group"
      >
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-primary dark:text-primary-light group-hover:scale-110 transition-transform duration-300">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-black text-gray-900 dark:text-white">{{ stats.addressCount }}</p>
          <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mt-0.5 tracking-wider">Addresses Saved</p>
        </div>
      </RouterLink>
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl shadow-sm p-6 sm:p-8">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
      
      <div v-if="activities.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
        <span class="text-3xl">✨</span>
        <p class="text-sm mt-2 font-medium">No recent activities on your account.</p>
      </div>

      <div v-else class="relative border-l-2 border-gray-100 dark:border-gray-800 ml-4 space-y-6 pb-2">
        <div
          v-for="(act, idx) in activities"
          :key="idx"
          class="relative pl-7 group"
        >
          <!-- Bullet dot -->
          <span class="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-900 border-2 border-primary group-hover:scale-125 transition-transform duration-200"></span>
          
          <div class="text-sm">
            <span class="font-bold text-gray-900 dark:text-white">{{ act.title }}</span>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ act.description }}</p>
            <span class="inline-block text-xxs bg-gray-100 dark:bg-gray-800 text-gray-450 rounded-md px-1.5 py-0.5 font-semibold mt-1">
              {{ formatActivityTime(act.time) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useWishlistStore } from '../../stores/wishlistStore';

const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

const stats = reactive({
  totalOrders: 0,
  wishlistCount: 0,
  addressCount: 0
});

const activities = reactive([]);

onMounted(() => {
  const userId = authStore.currentUser?.id;
  const userPhone = authStore.currentUser?.phone;
  const userEmail = authStore.currentUser?.email;

  // 1. Calculate orders count
  let rawOrders = [];
  try {
    rawOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  } catch (e) {
    console.error('Failed to parse orders', e);
  }

  // Filter orders related to this user
  const userOrders = rawOrders.filter(o => 
    o.userId === userId || 
    (userPhone && o.phone === userPhone) || 
    (userEmail && o.email === userEmail)
  );
  stats.totalOrders = userOrders.length;

  // 2. Load Wishlist
  wishlistStore.loadWishlist();
  stats.wishlistCount = wishlistStore.items.length;

  // 3. Addresses count
  let rawAddresses = [];
  try {
    rawAddresses = JSON.parse(localStorage.getItem('addresses_' + userId) || '[]');
  } catch (e) {
    console.error('Failed to parse addresses', e);
  }
  stats.addressCount = rawAddresses.length;

  // 4. Generate activities list
  // Base registration activity
  if (authStore.currentUser?.createdAt) {
    activities.push({
      title: 'Account Registered',
      description: 'Your FreshMart account was created successfully.',
      time: authStore.currentUser.createdAt
    });
  }

  // Address updates activity
  if (rawAddresses.length > 0) {
    activities.push({
      title: 'Address Book Updated',
      description: `You have ${rawAddresses.length} saved addresses in your account list.`,
      time: new Date().toISOString()
    });
  }

  // Add order activities
  userOrders.forEach(o => {
    activities.push({
      title: 'Order Placed',
      description: `Order ${o.orderId} of value ৳${o.totalAmount.toFixed(2)} was placed. Status: ${o.status}.`,
      time: o.createdAt
    });
  });

  // Sort activities by time descending
  activities.sort((a, b) => new Date(b.time) - new Date(a.time));
});

function formatMemberDate(isoString) {
  if (!isoString) return 'recently';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(isoString).toLocaleDateString('en-US', options);
}

function formatActivityTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
.text-gray-450 {
  color: #a0aec0;
}
.border-gray-850 {
  border-color: #2d3748;
}
</style>
