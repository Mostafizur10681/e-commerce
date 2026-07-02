<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- Page heading -->
      <div class="text-center mb-10">
        <h1 class="section-title">Checkout</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Complete your order details below</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">

        <!-- ══════════════════════════════════
             LEFT: Billing Details Form
             ══════════════════════════════════ -->
        <form @submit.prevent="placeOrder" class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-5 transition-colors duration-300">

          <!-- Section header -->
          <div class="flex items-center gap-3 mb-2">
            <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Billing Details</h2>
          </div>

          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.fullName"
              id="fullName"
              type="text"
              required
              placeholder="John Doe"
              class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
            />
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.phone"
              id="phone"
              type="tel"
              required
              placeholder="+880 1700-000000"
              class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
            />
          </div>

          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.address"
              id="address"
              type="text"
              required
              placeholder="House #, Road #, Area"
              class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
            />
          </div>

          <!-- Division + District + Thana (3 cols) -->
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Division <span class="text-red-500">*</span>
              </label>
              <Multiselect
                v-model="form.division"
                :options="divisions"
                label="division_name"
                track-by="id"
                value-prop="id"
                :object="true"
                placeholder="Select Division"
                :searchable="true"
                class="w-full text-sm"
              />
            </div>
            <div class="col-span-12 lg:col-span-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                District <span class="text-red-500">*</span>
              </label>
              <Multiselect
                v-model="form.district"
                :options="districts"
                label="district_name"
                track-by="id"
                value-prop="id"
                :object="true"
                :disabled="!form.division"
                placeholder="Select District"
                :searchable="true"
                class="w-full text-sm"
              />
            </div>
            <div class="col-span-12 lg:col-span-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Thana <span class="text-red-500">*</span>
              </label>
              <Multiselect
                v-model="form.thana"
                :options="filteredThanas"
                label="thana_name"
                track-by="id"
                value-prop="id"
                :object="true"
                :disabled="!form.district"
                placeholder="Select Thana"
                :searchable="true"
                class="w-full text-sm"
              />
            </div>
          </div>

          <!-- Email (optional) -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email <span class="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="you@example.com"
              class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
            />
          </div>

          <!-- Payment method note -->
          <div class="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4">
            <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div>
              <p class="text-xs font-semibold text-amber-700 dark:text-amber-300">Cash on Delivery</p>
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Pay when your order arrives at your door.</p>
            </div>
          </div>

          <!-- Place Order Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
          >
            <template v-if="!isLoading">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Place Order
            </template>
            <template v-else>
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Processing…
            </template>
          </button>
        </form>

        <!-- ══════════════════════════════════
             RIGHT: Order Summary
             ══════════════════════════════════ -->
        <aside
          id="order-summary"
          class="lg:sticky lg:top-28 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 max-h-[calc(100vh-8rem)] overflow-y-auto transition-colors duration-300"
        >
          <!-- Header -->
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </span>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
            <span class="ml-auto text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }}
            </span>
          </div>

          <!-- Empty cart state -->
          <div v-if="cartItems.length === 0" class="text-center py-10">
            <div class="text-4xl mb-3">🛒</div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Your cart is empty.</p>
          </div>

          <!-- Cart items list -->
          <ul v-else class="divide-y divide-gray-100 dark:divide-gray-800">
            <li v-for="item in cartItems" :key="item.id" class="py-4 flex items-center gap-3">
              <img
                :src="item.product.image || item.product.images?.[0]"
                :alt="item.product.name"
                class="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100 dark:border-gray-700"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{{ item.product.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">৳{{ item.product.price.toFixed(2) }} each</p>
              </div>
              <div class="flex flex-col items-end gap-1 flex-shrink-0">
                <span class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 font-medium">
                  × {{ item.quantity }}
                </span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">
                  ৳{{ (item.product.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </li>
          </ul>

          <!-- Subtotal / Delivery / Total -->
          <div class="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2.5">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>৳{{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Delivery</span>
              <span class="text-green-600 dark:text-green-400 font-medium">Free</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
              <span class="text-base font-bold text-gray-900 dark:text-white">Total</span>
              <span class="text-xl font-extrabold text-primary">৳{{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Download PDF -->
          <button
            @click="downloadPDF"
            class="mt-6 w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2.5 rounded-xl text-sm transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Order PDF
          </button>

          <!-- Trust badges -->
          <div class="mt-5 flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span class="flex items-center gap-1">🔒 Secure Checkout</span>
            <span class="flex items-center gap-1">🚚 Free Delivery</span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useToastStore } from '@/stores/toastStore';
import { useAuthStore } from '@/stores/authStore';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import api from '@/services/api';

const router = useRouter();
const cartStore = useCartStore();
const toast = useToastStore();
const authStore = useAuthStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const isLoading = ref(false);

const divisions = ref([]);
const districts = ref([]);
const filteredThanas = ref([]);

const form = ref({
  fullName: '',
  phone: '',
  address: '',
  division: null,
  district: null,
  thana: null,
  email: ''
});

onMounted(async () => {
  if (authStore.currentUser) {
    form.value.fullName = authStore.currentUser.name || '';
    form.value.phone = authStore.currentUser.phone || '';
    form.value.email = authStore.currentUser.email || '';
  }
  
  try {
    const res = await api.get('/v1/divisions?per_page=100');
    if (res.data?.success) divisions.value = res.data.data.data || res.data.data;
  } catch (err) {
    console.error('Failed to load divisions', err);
  }
});

watch(() => form.value.division, async (newDiv) => {
  form.value.district = null;
  form.value.thana = null;
  districts.value = [];
  filteredThanas.value = [];
  if (newDiv) {
    try {
      const res = await api.get(`/v1/districts?division_id=${newDiv.id}&per_page=500`);
      if (res.data?.success) districts.value = res.data.data.data || res.data.data;
    } catch (err) {
      console.error('Failed to load districts', err);
    }
  }
});

watch(() => form.value.district, async (newDist) => {
  form.value.thana = null;
  filteredThanas.value = [];
  if (newDist) {
    try {
      const res = await api.get(`/v1/thanas?district_id=${newDist.id}&per_page=500`);
      if (res.data?.success) filteredThanas.value = res.data.data.data || res.data.data;
    } catch (err) {
      console.error('Failed to load thanas', err);
    }
  }
});

function generateOrderId() {
  const seq = Number(localStorage.getItem('order_seq') || '0') + 1;
  localStorage.setItem('order_seq', seq);
  const year = new Date().getFullYear();
  return `ORD-${year}-${String(seq).padStart(6, '0')}`;
}
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
    // Create order object and store it
    const order = {
      orderId: generateOrderId(),
      customerName: form.value.fullName,
      phone: form.value.phone,
      address: `${form.value.address}, ${form.value.thana}, ${form.value.district}`,
      totalAmount: totalPrice.value,
      createdAt: new Date().toISOString(),
      status: 'Order Placed',
      items: cartItems.value.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image || item.product.images?.[0]
      })),
      email: form.value.email || '',
      userId: authStore.currentUser?.id || null
    };
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    toast.show(`Your Order ID: ${order.orderId}`);
    cartStore.clearCart();
    // Reset form
    form.value = { fullName: '', phone: '', address: '', division: null, district: null, thana: null, email: '' };
    isLoading.value = false;
    router.push({ name: 'Home' });
};

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
/* Remove old glassmorphism override that broke dark mode */
</style>
