<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center text-gray-500 py-12">
      <p class="text-xl">Your cart is empty.</p>
      <router-link to="/shop" class="text-primary hover:underline mt-4 inline-block">
        Continue Shopping
      </router-link>
    </div>
    <div v-else>
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-2 text-left">Product</th>
            <th class="p-2 text-left">Price</th>
            <th class="p-2 text-center">Quantity</th>
            <th class="p-2 text-right">Subtotal</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.product.id" class="border-b border-gray-200 dark:border-gray-700">
            <td class="p-2 flex items-center gap-4">
              <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded" />
              <span class="font-medium" v-text="item.product.name"></span>
            </td>
            <td class="p-2">৳{{ item.product.price }}</td>
            <td class="p-2 text-center">
              <button @click="decrease(item.product.id)" class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-l">
                -
              </button>
              <span class="px-3">{{ item.quantity }}</span>
              <button @click="increase(item.product.id)" class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-r">
                +
              </button>
            </td>
            <td class="p-2 text-right">৳{{ (item.product.price * item.quantity).toFixed(2) }}</td>
            <td class="p-2 text-center">
              <button @click="remove(item.product.id)" class="text-red-600 hover:underline">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end items-center mt-6 space-x-4">
        <div class="text-xl font-semibold">
          Total: <span class="text-primary">৳{{ totalPrice.toFixed(2) }}</span>
        </div>
        <router-link to="/checkout" class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg">
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useToastStore } from '../stores/toastStore';

const cartStore = useCartStore();
const toast = useToastStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

function increase(productId) {
  cartStore.increaseQty(productId);
  toast.show('Quantity increased');
}
function decrease(productId) {
  cartStore.decreaseQty(productId);
  toast.show('Quantity decreased');
}
function remove(productId) {
  cartStore.removeFromCart(productId);
  toast.show('Item removed from cart');
}
</script>

<style scoped>
/* Optional scoped styles for table layout */
</style>
