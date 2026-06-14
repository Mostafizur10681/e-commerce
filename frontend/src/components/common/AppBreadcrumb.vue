<template>
  <!-- Only show breadcrumb when not on the home page -->
  <nav
    v-if="breadcrumbs.length > 1"
    aria-label="Breadcrumb"
    class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 py-2.5">
      <ol class="flex flex-wrap items-center gap-1 text-sm">
        <li v-for="(crumb, idx) in breadcrumbs" :key="idx" class="flex items-center gap-1">
          <!-- Home icon for first item -->
          <template v-if="idx === 0">
            <router-link
              :to="crumb.to"
              class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              <!-- Home SVG icon -->
              <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span>{{ crumb.label }}</span>
            </router-link>
          </template>

          <template v-else>
            <!-- Chevron separator -->
            <svg class="w-4 h-4 shrink-0 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>

            <!-- Last crumb (current page) – not a link -->
            <span
              v-if="idx === breadcrumbs.length - 1"
              class="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px] sm:max-w-none"
              aria-current="page"
            >
              {{ crumb.label }}
            </span>

            <!-- Intermediate crumbs – clickable -->
            <router-link
              v-else
              :to="crumb.to"
              class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 truncate max-w-[120px] sm:max-w-none"
            >
              {{ crumb.label }}
            </router-link>
          </template>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../../stores/productStore';

const route = useRoute();
const productStore = useProductStore();

const breadcrumbs = computed(() => {
  const crumbs = [{ label: 'Home', to: '/' }];

  const name = route.name;

  if (name === 'Home') {
    return crumbs; // Just home – we hide the bar for single-item breadcrumbs
  }

  if (name === 'Shop') {
    crumbs.push({ label: 'Shop', to: '/shop' });
  }

  else if (name === 'CategoryProducts') {
    const rawCategory = route.params.categoryName || '';
    // Capitalise each word for display
    const label = rawCategory
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label: 'Category', to: null });
    crumbs.push({ label, to: `/category/${rawCategory}` });
  }

  else if (name === 'ProductDetails') {
    const id = Number(route.params.id);
    const product = productStore.getProductById(id);
    if (product) {
      // Link through category
      const catLabel = (product.category || '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: catLabel, to: `/category/${product.category}` });
      crumbs.push({ label: product.name, to: `/product/${id}` });
    } else {
      crumbs.push({ label: 'Product', to: `/product/${route.params.id}` });
    }
  }

  else if (name === 'Cart') {
    crumbs.push({ label: 'Cart', to: '/cart' });
  }

  else if (name === 'Checkout') {
    crumbs.push({ label: 'Cart', to: '/cart' });
    crumbs.push({ label: 'Checkout', to: '/checkout' });
  }

  else if (name === 'FAQ') {
    crumbs.push({ label: 'FAQ', to: '/faq' });
  }

  else if (name === 'Contact') {
    crumbs.push({ label: 'Contact Us', to: '/contact' });
  }

  else if (name === 'TrackOrder') {
    crumbs.push({ label: 'Track Order', to: '/track-order' });
  }

  else if (name === 'About') {
    crumbs.push({ label: 'About Us', to: '/about' });
  }

  else if (route.path.startsWith('/myaccount')) {
    crumbs.push({ label: 'My Account', to: '/myaccount/dashboard' });
    const subPageName = route.name;
    if (subPageName && subPageName !== 'MyAccountDashboard' && subPageName !== 'Dashboard') {
      const labelMap = {
        'MyAccountOrders': 'My Orders',
        'MyAccountWishlist': 'Wishlist',
        'MyAccountAddress': 'Saved Addresses',
        'MyAccountProfile': 'Manage Profile',
        'MyAccountDeleteProfile': 'Delete Profile'
      };
      const cleanLabel = labelMap[subPageName] || subPageName;
      crumbs.push({ label: cleanLabel, to: route.path });
    }
  }

  // Fallback: build from route meta or route name
  else if (route.meta?.breadcrumb) {
    crumbs.push({ label: route.meta.breadcrumb, to: route.path });
  }

  return crumbs;
});
</script>
