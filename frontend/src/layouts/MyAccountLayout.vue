<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Title area -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight">My Account</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your orders, addresses, wishlist, and profile settings.</p>
        </div>
        <!-- Mobile Drawer Toggle Button -->
        <button
          @click="isMobileDrawerOpen = true"
          class="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-semibold"
        >
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Account Menu
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <!-- ══════════════════════════════════
             DESKTOP SIDEBAR (lg and up)
             ══════════════════════════════════ -->
        <aside class="hidden lg:block lg:sticky lg:top-28 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm p-6 space-y-6 transition-colors duration-300">
          <!-- User info header -->
          <div class="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase">
              {{ currentUserInitials }}
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-base truncate">{{ authStore.currentUser?.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.currentUser?.email }}</p>
            </div>
          </div>

          <!-- Menu Links -->
          <nav class="space-y-1">
            <RouterLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
              :class="isRouteActive(item.path)
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105"
                :class="isRouteActive(item.path) ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary'"
              />
              {{ item.label }}
            </RouterLink>

            <!-- Logout Link -->
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 text-left mt-4 group"
            >
              <svg class="w-5 h-5 shrink-0 text-red-400 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </nav>
        </aside>

        <!-- ══════════════════════════════════
             MAIN CONTENT WRAPPER
             ══════════════════════════════════ -->
        <main class="lg:col-span-3 min-w-0">
          <RouterView />
        </main>
      </div>
    </div>

    <!-- ══════════════════════════════════
         MOBILE DRAWER DIALOG
         ══════════════════════════════════ -->
    <Transition name="drawer-fade">
      <div v-if="isMobileDrawerOpen" class="fixed inset-0 z-[100] lg:hidden flex">
        <!-- Backdrop -->
        <div @click="isMobileDrawerOpen = false" class="fixed inset-0 bg-gray-950/45 backdrop-blur-sm"></div>

        <!-- Drawer Content -->
        <Transition name="drawer-slide">
          <div v-if="isMobileDrawerOpen" class="relative flex flex-col w-full max-w-xs h-full bg-white dark:bg-gray-900 shadow-2xl z-10 transition-colors duration-300">
            <!-- Header -->
            <div class="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <span class="font-extrabold text-lg flex items-center gap-2">🥬 Account Menu</span>
              <button
                @click="isMobileDrawerOpen = false"
                class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-850"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Profile Info -->
            <div class="p-5 flex items-center gap-4 bg-gray-50 dark:bg-gray-850/50">
              <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
                {{ currentUserInitials }}
              </div>
              <div class="min-w-0">
                <h3 class="font-bold text-base truncate">{{ authStore.currentUser?.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.currentUser?.email }}</p>
              </div>
            </div>

            <!-- Scrollable Navigation -->
            <nav class="flex-1 overflow-y-auto p-4 space-y-1">
              <RouterLink
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                @click="isMobileDrawerOpen = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                :class="isRouteActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
              >
                <component :is="item.icon" class="w-5 h-5" />
                {{ item.label }}
              </RouterLink>

              <button
                @click="handleLogout(); isMobileDrawerOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 text-left mt-4"
              >
                <svg class="w-5 h-5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </nav>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';

const authStore = useAuthStore();
const toastStore = useToastStore();
const route = useRoute();
const router = useRouter();

const isMobileDrawerOpen = ref(false);

const currentUserInitials = computed(() => {
  const name = authStore.currentUser?.name || '';
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
});

function isRouteActive(path) {
  return route.path === path;
}

function handleLogout() {
  authStore.logout();
  toastStore.show('Logged out successfully', 'success');
  router.push('/login');
}

// Icon helper components as h-renderers for simplicity
const DashboardIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' })
  ])
};

const OrdersIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
  ])
};

const WishlistIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
  ])
};

const AddressIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
  ])
};

const ProfileIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
  ])
};

const DeleteIcon = {
  render: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
  ])
};

const menuItems = [
  { path: '/myaccount/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/myaccount/orders', label: 'My Orders', icon: OrdersIcon },
  { path: '/myaccount/wishlist', label: 'Wishlist', icon: WishlistIcon },
  { path: '/myaccount/address', label: 'Address Book', icon: AddressIcon },
  { path: '/myaccount/profile', label: 'Manage Profile', icon: ProfileIcon },
  { path: '/myaccount/delete-profile', label: 'Delete Profile', icon: DeleteIcon }
];
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(-100%);
}
</style>
