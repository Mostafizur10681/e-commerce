<template>
  <!-- Hero Banner -->
  <section class="bg-gray-100 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4 text-center">
      <h1 class="section-title">Track Your Order</h1>
      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Enter your Order ID to see the current status and details.
      </p>
    </div>
  </section>

  <!-- Search Card -->
  <section class="py-8">
    <div class="container mx-auto px-4 flex justify-center">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="flex gap-2">
          <input v-model="searchId" type="text" placeholder="Enter Order ID..."
                 class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" />
          <button @click="track" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            Track Order
          </button>
        </div>
        <p v-if="errorMessage" class="mt-2 text-red-600 text-sm">{{ errorMessage }}</p>
      </div>
    </div>
  </section>

  <!-- Result Section -->
  <section v-if="foundOrder" class="py-8">
    <div class="container mx-auto px-4 max-w-4xl space-y-8">
      <!-- Order Details Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Order Details</h2>
        <ul class="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li><strong>Order ID:</strong> {{ foundOrder.orderId }}</li>
          <li><strong>Customer:</strong> {{ foundOrder.customerName }}</li>
          <li><strong>Phone:</strong> {{ foundOrder.phone }}</li>
          <li><strong>Address:</strong> {{ foundOrder.address }}</li>
          <li><strong>Total:</strong> {{ formatCurrency(foundOrder.totalAmount) }}</li>
          <li><strong>Placed:</strong> {{ new Date(foundOrder.createdAt).toLocaleString() }}</li>
        </ul>
      </div>

      <!-- Progress Tracker -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-4">
        <!-- Horizontal / Vertical Tracker -->
        <div class="flex-1 w-full">
          <div class="flex items-center justify-between md:justify-start md:space-x-4 overflow-x-auto">
            <template v-for="(stage, idx) in stages" :key="stage">
              <div class="flex flex-col items-center md:items-start">
                <div :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full border-2',
                  idx < currentStageIndex ? 'bg-green-500 border-green-500 text-white' :
                  idx === currentStageIndex ? 'bg-primary border-primary text-white animate-pulse' :
                  'bg-gray-200 border-gray-300 text-gray-600'
                ]">
                  <template v-if="idx < currentStageIndex">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </template>
                  <template v-else>{{ idx + 1 }}</template>
                </div>
                <span class="mt-2 text-sm text-center md:text-left whitespace-nowrap" :class="idx <= currentStageIndex ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'">
                  {{ stage }}
                </span>
              </div>
              <div v-if="idx < stages.length - 1" class="flex-1 h-1 bg-gray-300 dark:bg-gray-600 mx-1 md:mx-2"></div>
            </template>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <h3 class="text-xl font-medium mb-4 text-gray-800 dark:text-gray-100">Tracking Timeline</h3>
        <ul class="space-y-4">
          <li v-for="(item, idx) in timeline" :key="idx" class="flex items-center">
            <div class="w-3 h-3 rounded-full mr-3" :class="idx <= currentStageIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'"></div>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <strong>{{ item.stage }}</strong> – {{ new Date(item.date).toLocaleString() }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const stages = ['Order Placed', 'Processing', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered'];
const searchId = ref('');
const errorMessage = ref('');
const foundOrder = ref(null);

onMounted(() => {
  if (route.query.orderId) {
    searchId.value = String(route.query.orderId);
    track();
  }
});

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  } catch {
    return [];
  }
}

function track() {
  errorMessage.value = '';
  const orders = loadOrders();
  const order = orders.find(o => o.orderId === searchId.value.trim());
  if (!order) {
    errorMessage.value = 'Order not found';
    foundOrder.value = null;
    return;
  }
  // Compute current stage based on days elapsed since creation
  const daysPassed = Math.floor((Date.now() - new Date(order.createdAt)) / 86400000);
  const stageIndex = Math.min(daysPassed, stages.length - 1);
  order.currentStageIndex = stageIndex;
  // Build timeline data (date for each stage)
  const baseDate = new Date(order.createdAt);
  order.timeline = stages.map((s, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return { stage: s, date: d };
  });
  foundOrder.value = order;
}

const currentStageIndex = computed(() => {
  return foundOrder.value ? foundOrder.value.currentStageIndex : 0;
});

const timeline = computed(() => {
  return foundOrder.value ? foundOrder.value.timeline : [];
});

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(value);
}
</script>

<style scoped>
/* No extra styles needed – Tailwind handles layout */
</style>
