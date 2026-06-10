<template>
  <section class="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-12">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">Checkout</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Billing Details Form -->
      <form @submit.prevent="placeOrder" class="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Billing Details</h2>

        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input v-model="form.fullName" id="fullName" type="text" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5  dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <input v-model="form.phone" id="phone" type="tel" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5  dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <input v-model="form.address" id="address" type="text" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5  dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="district" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
        <select v-model="form.district" id="district" required
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5 dark:bg-gray-700 dark:text-gray-100 px-3 py-2">
          <option value="" disabled>Select a district</option>
          <option v-for="dist in districts" :key="dist" :value="dist">{{ dist }}</option>
        </select>
      </div>
      <div>
        <label for="thana" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thana</label>
        <select v-model="form.thana" id="thana" :disabled="!form.district" required
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5 dark:bg-gray-700 dark:text-gray-100 px-3 py-2">
          <option value="" disabled>Select District First</option>
          <option v-for="th in filteredThanas" :key="th" :value="th">{{ th }}</option>
        </select>
      </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (optional)</label>
            <input v-model="form.email" id="email" type="email"
                   class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5  dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
          </div>
        </div>

        <button type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="!isLoading">Place Order</span>
          <span v-else>Processing…</span>
        </button>
      </form>

      <!-- Order Summary -->
      <aside id="order-summary" class="lg:sticky lg:top-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Order Summary</h2>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="item in cartItems" :key="item.id" class="py-4 flex items-center">
            <img :src="item.product.image" :alt="item.product.name"
                 class="w-12 h-12 rounded object-cover mr-4 flex-shrink-0" />
            <div class="flex-1">
              <p class="text-gray-800 dark:text-gray-100 font-medium">{{ item.product.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">₹{{ item.product.price.toFixed(2) }} each</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-100">
                x{{ item.quantity }}
              </span>
              <span class="text-gray-900 dark:text-gray-100 font-medium">
                ₹{{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </li>
        </ul>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-center">
          <span class="text-xl font-bold text-gray-900 dark:text-gray-100">Total</span>
          <span class="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">₹{{ totalPrice.toFixed(2) }}</span>
        </div>
<button @click="downloadPDF" class="mt-4 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
  Download Order PDF
</button>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useToastStore } from '@/stores/toastStore';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { allDistricts } from '@bangladeshi/bangladesh-address/build/src/district/index.js';
import bdThana from '@bangladeshi/bangladesh-address/build/src/json/bd-thana.json';

const router = useRouter();
const cartStore = useCartStore();
const toast = useToastStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const isLoading = ref(false);

const districts = allDistricts();

const form = ref({
  fullName: '',
  phone: '',
  address: '',
  district: '',
  thana: '',
  email: ''
});

const validateForm = () => {
  const { fullName, phone, address, district, thana } = form.value;
  return fullName && phone && address && district && thana;
};

const placeOrder = async () => {
  if (!validateForm()) {
    toast.show('Please fill all required fields.');
    return;
  }
  isLoading.value = true;
  // Simulate async operation (e.g., order processing)
  await new Promise(resolve => setTimeout(resolve, 800));
  toast.show('Order placed successfully!');
  cartStore.clearCart();
  // Reset form
  form.value = { fullName: '', phone: '', address: '', district: '', thana: '', email: '' };
  isLoading.value = false;
  router.push({ name: 'Home' });
};
const filteredThanas = computed(() => {
  if (!form.value.district) return [];
  return bdThana
    .filter(item => item.district === form.value.district)
    .map(item => item.thana);
});

const downloadPDF = async () => {
  const element = document.getElementById('order-summary');
  if (!element) {
    toast.show('Order summary not found');
    return;
  }
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('order-summary.pdf');
};</script>

<style scoped>
/* Glassmorphism effect preserved */
section,
form,
aside {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(12px);
}
</style>
