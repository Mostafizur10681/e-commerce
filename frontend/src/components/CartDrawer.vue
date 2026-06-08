<template>
  <div>
    <!-- Overlay -->
    <transition name="fade">
      <div v-if="uiStore.isCartDrawerOpen" @click="uiStore.setCartDrawer(false)"
        class="fixed inset-0 bg-black/50 z-[100] transition-opacity"></div>
    </transition>

    <!-- Drawer Panel -->
    <transition name="slide-right">
      <div v-if="uiStore.isCartDrawerOpen"
        class="fixed inset-y-0 right-0 z-[101] w-full md:w-[400px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 class="text-xl font-bold">Your Cart</h2>
          <button @click="uiStore.setCartDrawer(false)" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartItems.length === 0" class="text-center text-gray-500 mt-10">
            <p>Your cart is empty.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="item in cartItems" :key="item.product.id" class="flex gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded shadow-sm" />
              <div class="flex-1">
                <h3 class="font-medium text-sm line-clamp-2 leading-tight">{{ item.product.name }}</h3>
                <p class="text-primary font-bold text-sm mt-1">৳{{ item.product.price }}</p>
                <div class="flex items-center mt-2 border border-gray-200 dark:border-gray-700 rounded-md w-max bg-white dark:bg-gray-800">
                  <button @click="decrease(item.product.id)" class="px-2.5 py-0.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">-</button>
                  <span class="px-3 text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="increase(item.product.id)" class="px-2.5 py-0.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">+</button>
                </div>
              </div>
              <button @click="remove(item.product.id)" class="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div class="flex justify-between items-center mb-4">
            <span class="font-medium text-gray-600 dark:text-gray-300">Total</span>
            <span class="text-xl font-bold text-primary">৳{{ totalPrice.toFixed(2) }}</span>
          </div>
          <button class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex justify-center items-center gap-2"
            :disabled="cartItems.length === 0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Checkout Now
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useUiStore } from '../stores/uiStore';
import { useToastStore } from '../stores/toastStore';

const cartStore = useCartStore();
const uiStore = useUiStore();
const toast = useToastStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

function increase(productId) {
  cartStore.increaseQty(productId);
}
function decrease(productId) {
  cartStore.decreaseQty(productId);
}
function remove(productId) {
  cartStore.removeFromCart(productId);
  toast.show('Item removed from cart');
}

function handleKeydown(e) {
  if (e.key === 'Escape' && uiStore.isCartDrawerOpen) {
    uiStore.setCartDrawer(false);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
