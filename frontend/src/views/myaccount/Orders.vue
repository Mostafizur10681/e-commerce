<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-105 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white">Order History</h2>
        <span class="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
          {{ filteredOrders.length }} Order{{ filteredOrders.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        <p class="text-sm text-gray-550 dark:text-gray-400 mt-4">Loading your orders...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredOrders.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">📦</div>
        <h3 class="text-lg font-bold text-gray-950 dark:text-white">No orders found</h3>
        <p class="text-sm text-gray-550 dark:text-gray-405 mt-1 max-w-sm mx-auto">You haven't placed any orders yet. Head to the store to start shopping!</p>
        <RouterLink
          to="/shop"
          class="inline-block mt-5 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-dark transition duration-300 text-sm"
        >
          Explore Shop
        </RouterLink>
      </div>

      <!-- Orders Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th class="py-4 px-4">Order ID</th>
              <th class="py-4 px-4">Date</th>
              <th class="py-4 px-4">Total Amount</th>
              <th class="py-4 px-4">Status</th>
              <th class="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
            <tr
              v-for="order in filteredOrders"
              :key="order.orderId"
              class="hover:bg-gray-50/50 dark:hover:bg-gray-850/30 transition-colors duration-150"
            >
              <td class="py-4 px-4 font-bold text-gray-950 dark:text-white">{{ order.orderId }}</td>
              <td class="py-4 px-4 text-gray-500 dark:text-gray-400">{{ formatDate(order.createdAt) }}</td>
              <td class="py-4 px-4 font-bold">৳{{ order.totalAmount.toFixed(2) }}</td>
              <td class="py-4 px-4">
                <span
                  class="inline-block px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="getStatusBadgeClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                <button
                  @click="openOrderDetails(order)"
                  class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-750 dark:text-gray-200 text-xs font-bold rounded-lg transition duration-200"
                >
                  View Order
                </button>
                <button
                  @click="trackOrder(order.orderId)"
                  class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition duration-200"
                >
                  Track Status
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ══════════════════════════════════
         ORDER DETAILS MODAL
         ══════════════════════════════════ -->
    <Transition name="modal-fade">
      <div v-if="selectedOrder" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div @click="closeOrderDetails" class="fixed inset-0 bg-gray-950/60 backdrop-blur-sm"></div>

        <!-- Modal Box -->
        <div class="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 border border-gray-150 dark:border-gray-800 p-6 sm:p-8 transition-colors duration-300">
          <!-- Close button -->
          <button
            @click="closeOrderDetails"
            class="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-850"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Header -->
          <div class="border-b border-gray-100 dark:border-gray-800 pb-5 mb-5">
            <h3 class="text-xl font-extrabold text-gray-950 dark:text-white">Order Details</h3>
            <p class="text-xs text-gray-500 mt-1">
              Order ID: <strong class="text-gray-900 dark:text-white">{{ selectedOrder.orderId }}</strong> • Placed on {{ formatDate(selectedOrder.createdAt) }}
            </p>
          </div>

          <!-- Items list -->
          <div class="mb-6">
            <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Items Ordered</h4>
            
            <div v-if="!selectedOrder.items || selectedOrder.items.length === 0" class="text-xs text-gray-500 py-3 italic bg-gray-50 dark:bg-gray-850 rounded-xl px-4 text-center">
              No items details stored for this order.
            </div>

            <ul v-else class="divide-y divide-gray-100 dark:divide-gray-850 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
              <li
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-850/40 transition-colors"
              >
                <!-- Thumbnail -->
                <img
                  :src="item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=60'"
                  :alt="item.name"
                  class="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-gray-800 flex-shrink-0"
                />
                
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-950 dark:text-white truncate">{{ item.name }}</p>
                  <p class="text-xs text-gray-550 dark:text-gray-400 mt-0.5">৳{{ item.price.toFixed(2) }} each</p>
                </div>

                <!-- Qty and price -->
                <div class="text-right shrink-0">
                  <span class="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold">
                    ×{{ item.quantity }}
                  </span>
                  <p class="text-sm font-extrabold text-gray-950 dark:text-white mt-1">৳{{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Customer info & totals -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-850/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Shipping Details</h4>
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ selectedOrder.customerName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">📞 {{ selectedOrder.phone }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">📧 {{ selectedOrder.email || 'N/A' }}</p>
              <p class="text-xs text-gray-650 dark:text-gray-350 mt-2 leading-relaxed">📍 {{ selectedOrder.address }}</p>
            </div>
            
            <div class="flex flex-col justify-end">
              <div class="space-y-1.5 text-sm">
                <div class="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>৳{{ selectedOrder.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                  <span>Delivery Charge:</span>
                  <span class="text-green-600 dark:text-green-400 font-bold">Free</span>
                </div>
                <div class="flex justify-between text-gray-500">
                  <span>Payment Method:</span>
                  <span class="font-semibold text-gray-800 dark:text-gray-200">Cash on Delivery</span>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex justify-between text-gray-900 dark:text-white font-extrabold">
                  <span>Total Amount:</span>
                  <span class="text-lg text-primary">৳{{ selectedOrder.totalAmount.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer track button -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="closeOrderDetails"
              class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-sm transition"
            >
              Close
            </button>
            <button
              @click="trackOrder(selectedOrder.orderId)"
              class="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary-dark transition flex items-center gap-1.5"
            >
              <span>🚚</span> Track Location
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import api from '../../services/api';

const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const orders = ref([]);
const selectedOrder = ref(null);
const isLoading = ref(false);

onMounted(() => {
  loadOrders();
});

async function loadOrders() {
  isLoading.value = true;
  try {
    const res = await api.get('/v1/auth/orders');
    if (res.data && res.data.success) {
      const rawOrders = res.data.data.data || res.data.data || [];
      orders.value = rawOrders.map(o => ({
        orderId: o.order_number || String(o.id),
        createdAt: o.created_at,
        totalAmount: Number(o.total || 0),
        status: o.status || 'pending',
        paymentStatus: o.payment_status || 'pending',
        customerName: o.customer_name || '',
        phone: o.customer_phone || '',
        email: o.customer_email || '',
        address: [o.address, o.thana, o.district, o.division].filter(Boolean).join(', '),
        items: (o.items || []).map(item => ({
          id: item.id,
          name: item.product?.name || 'Unknown Product',
          image: item.product?.image || '',
          price: Number(item.price || 0),
          quantity: item.quantity || 1
        }))
      }));
    } else {
      toastStore.show(res.data?.message || 'Failed to load orders', 'error');
    }
  } catch (e) {
    console.error('Failed to load orders from API', e);
    toastStore.show(e.response?.data?.message || 'Failed to load orders from server', 'error');
  } finally {
    isLoading.value = false;
  }
}

const filteredOrders = computed(() => {
  return [...orders.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

function openOrderDetails(order) {
  selectedOrder.value = order;
}

function closeOrderDetails() {
  selectedOrder.value = null;
}

function trackOrder(orderId) {
  selectedOrder.value = null;
  router.push({ path: '/track-order', query: { orderId } });
}

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getStatusBadgeClass(status) {
  const s = String(status || '').trim();
  switch (s) {
    case 'Order Placed':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
    case 'Processing':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
    case 'Packed':
      return 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400';
    case 'Shipped':
      return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400';
    case 'Out For Delivery':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
    case 'Delivered':
      return 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400';
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}
</script>

<style scoped>
.border-gray-850 {
  border-color: #2d3748;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
