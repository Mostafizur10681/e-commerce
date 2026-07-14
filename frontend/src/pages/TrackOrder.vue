<template>
  <!-- Hero Banner -->
  <section class="track-hero">
    <div class="container mx-auto px-4 text-center">
      <h1 class="section-title">Track Your Order</h1>
      <p class="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Enter your Order ID below to see real-time status and shipping details.
      </p>
    </div>
  </section>

  <!-- Search Card -->
  <section class="py-8">
    <div class="container mx-auto px-4 flex justify-center">
      <div class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div class="flex gap-2">
          <input v-model="searchId" type="text" placeholder="e.g. ORD-20260713-HYC7GG"
                 class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          <button @click="track" class="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition font-semibold text-sm">
            Track
          </button>
        </div>
        <p v-if="errorMessage" class="mt-3 text-red-500 text-sm flex items-center gap-1.5">
          <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </section>

  <!-- Result Section -->
  <section v-if="foundOrder" class="pb-16">
    <div class="container mx-auto px-4 max-w-5xl space-y-6">

      <!-- ─── Fancy Step Tracker ─── -->
      <div class="tracker-card" :class="{ 'cancelled-card': foundOrder.status === 'cancelled' }">
        <div class="flex justify-between items-center mb-6">
          <h2 class="tracker-heading" style="margin-bottom: 0;">Shipment Progress</h2>
          <span v-if="foundOrder.status === 'cancelled'" class="cancelled-badge">Order Cancelled</span>
        </div>

        <!-- Desktop: horizontal row (show for all statuses, cancelled uses red theme) -->
        <div :class="['stepper-desktop pt-5', { 'stepper-cancelled': foundOrder.status === 'cancelled' }]">
          <template v-for="(stage, idx) in stages" :key="stage">
            <div class="step-col">
              <!-- Bubble -->
              <div :class="['step-bubble', isCancelled ? 'cancelled-step' : stepState(idx)]">
                <span v-if="idx === currentStageIndex && !isCancelled" class="pulse-ring"></span>

                <!-- ── ORDER PLACED (Calendar/Clock/Receipt Style) ── -->
                <svg v-if="isStage(stage,'order placed') || isStage(stage,'pending')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Blue background board/paper structure -->
                  <rect x="14" y="8" width="36" height="46" rx="4" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                  <!-- Red header clip -->
                  <path d="M22 6h20v8H22z" class="icon-red-fill icon-dark-stroke" stroke-width="3" />
                  <!-- Writing lines on paper -->
                  <line x1="20" y1="24" x2="44" y2="24" class="icon-dark-stroke" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="20" y1="32" x2="40" y2="32" class="icon-dark-stroke" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="20" y1="40" x2="34" y2="40" class="icon-dark-stroke" stroke-width="2.5" stroke-linecap="round" />
                  <!-- A pulsing check mark in red -->
                  <path d="M42 36 l3 3 l7 -7" class="icon-red-stroke icon-draw-line" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <!-- ── PROCESSING (24 Hours Call/Support Icon) ── -->
                <svg v-else-if="isStage(stage,'processing')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- 24 Hours clock ring -->
                  <circle cx="32" cy="32" r="22" class="icon-dark-stroke icon-spin-slow" stroke-width="3" stroke-dasharray="10 5" />
                  <!-- Red telephone handset overlay -->
                  <path d="M18 20c0-2 2-4 5-4h4l3 7-2 3c3 4 6 7 10 10l3-2 7 3v4c0 3-2 5-5 5-14 0-25-11-25-25z" class="icon-red-fill icon-dark-stroke" stroke-width="3" stroke-linejoin="round" />
                  <!-- Clock hand inside -->
                  <line x1="32" y1="32" x2="32" y2="22" class="icon-dark-stroke" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="32" y1="32" x2="40" y2="32" class="icon-dark-stroke" stroke-width="2.5" stroke-linecap="round" />
                </svg>

                <!-- ── PACKED (Gift Box with Ribbon) ── -->
                <svg v-else-if="isStage(stage,'packed')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Gift Box Container -->
                  <rect x="12" y="24" width="40" height="30" rx="2" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                  <!-- Red Ribbon Vertical -->
                  <rect x="28" y="24" width="8" height="30" class="icon-red-fill icon-dark-stroke" stroke-width="3" />
                  <!-- Box Lid -->
                  <rect x="9" y="18" width="46" height="8" rx="1" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                  <!-- Red Ribbon Loop top (Lid Ribbon) -->
                  <path d="M24 18c0-5 4-8 8-8s8 3 8 8" class="icon-red-stroke icon-dark-stroke icon-ribbon-bounce" stroke-width="3" stroke-linecap="round" />
                </svg>

                <!-- ── SHIPPED (Red Delivery Truck with 24h Sign) ── -->
                <svg v-else-if="isStage(stage,'shipped')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="icon-truck-drive">
                    <!-- Road Line -->
                    <line x1="6" y1="52" x2="58" y2="52" class="icon-dark-stroke" stroke-width="3" stroke-linecap="round" />
                    <!-- Truck Body (Red Cab & Container) -->
                    <!-- Container Back -->
                    <rect x="10" y="16" width="28" height="26" rx="2" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                    <!-- Red Cab Front -->
                    <path d="M38 24h10l6 8v10H38V24z" class="icon-red-fill icon-dark-stroke" stroke-width="3" stroke-linejoin="round" />
                    <!-- Cab Window -->
                    <path d="M44 24h4l4 6h-8v-6z" class="icon-dark-stroke" stroke-width="2.5" fill="#ffffff" />
                    <!-- Wheels -->
                    <circle cx="20" cy="46" r="6" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                    <circle cx="20" cy="46" r="2" class="icon-dark-fill" />
                    <circle cx="44" cy="46" r="6" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                    <circle cx="44" cy="46" r="2" class="icon-dark-fill" />
                  </g>
                </svg>

                <!-- ── OUT FOR DELIVERY (Fast Motorcycle Delivery / Map Route) ── -->
                <svg v-else-if="isStage(stage,'delivery')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Map pin route lines -->
                  <path d="M12 40c0-10 16-16 16-24" class="icon-dark-stroke icon-route-dash" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 6" />
                  <!-- Red Map Pin -->
                  <g class="icon-pin-drop">
                    <path d="M32 6c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14z" class="icon-red-fill icon-dark-stroke" stroke-width="3" />
                    <circle cx="32" cy="20" r="5" fill="#ffffff" class="icon-dark-stroke" stroke-width="2" />
                  </g>
                  <!-- Ground lines -->
                  <line x1="10" y1="52" x2="54" y2="52" class="icon-dark-stroke" stroke-width="3" stroke-linecap="round" />
                </svg>

                <!-- ── DELIVERED / COMPLETED (Hands holding package or verified badge) ── -->
                <svg v-else-if="isStage(stage,'delivered') || isStage(stage,'completed')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Completed Badge Circle -->
                  <circle cx="32" cy="32" r="24" class="icon-dark-stroke icon-badge-rotate" stroke-width="3" stroke-dasharray="6 4" fill="#ffffff" />
                  <!-- Red inner circle -->
                  <circle cx="32" cy="32" r="18" class="icon-red-fill icon-dark-stroke" stroke-width="2.5" />
                  <!-- White / Dark check mark -->
                  <path d="M22 32l7 7 14-14" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" class="icon-draw-check" />
                </svg>

                <!-- ── CANCELLED ── -->
                <svg v-else-if="isStage(stage,'cancelled')"
                     class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="22" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                  <line x1="20" y1="20" x2="44" y2="44" class="icon-red-stroke icon-dark-stroke" stroke-width="4" stroke-linecap="round" />
                  <line x1="44" y1="20" x2="20" y2="44" class="icon-red-stroke icon-dark-stroke" stroke-width="4" stroke-linecap="round" />
                </svg>

                <!-- ── FALLBACK ── -->
                <svg v-else class="envato-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="22" class="icon-dark-stroke" stroke-width="3" fill="#ffffff" />
                  <text x="32" y="38" text-anchor="middle" font-size="18" font-weight="bold" class="icon-dark-fill">{{ idx+1 }}</text>
                </svg>

              </div>
              <!-- Label -->
              <span :class="['step-label', isCancelled ? 'label-cancelled' : (idx <= currentStageIndex ? 'label-on' : 'label-off')]">
                {{ stage }}
              </span>
            </div>
            <!-- Connector -->
            <div v-if="idx < stages.length - 1" :class="['connector', { 'connector-cancelled': isCancelled }]">
              <div :class="['connector-bar', isCancelled ? 'filled-cancelled' : (idx < currentStageIndex ? 'filled' : '')]"></div>
            </div>
          </template>
        </div>

        <!-- Mobile: vertical list -->
        <ol :class="['stepper-mobile', { 'stepper-cancelled': isCancelled }]">
          <li v-for="(stage, idx) in stages" :key="'m'+stage"
              :class="['mobile-step', stepState(idx)]">
            <div class="mobile-dot">
              <svg v-if="idx < currentStageIndex" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <span v-else-if="idx === currentStageIndex" class="mobile-pulse"></span>
              <span v-else class="text-xs font-bold">{{ idx + 1 }}</span>
            </div>
            <div class="mobile-info">
              <span :class="['mobile-label', idx <= currentStageIndex ? 'label-on' : 'label-off']">{{ stage }}</span>
              <span v-if="idx === currentStageIndex" class="mobile-badge">Current Status</span>
            </div>
          </li>
        </ol>

        <!-- Cancelled Realistic Design -->
        <div v-if="foundOrder.status === 'cancelled'" class="cancelled-illustration-box">
          <div class="cancelled-graphic-wrap">
            <svg class="cancelled-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#f87171" stroke-width="5" stroke-dasharray="10 5" fill="#fef2f2" class="dark:fill-red-950/20" />
              <path d="M35 35 L65 65 M65 35 L35 65" stroke="#ef4444" stroke-width="8" stroke-linecap="round" class="cancelled-cross-anim" />
            </svg>
          </div>
          <h3 class="cancelled-title">Order #{{ foundOrder.orderId }} was Cancelled</h3>
          <p class="cancelled-desc">This order has been cancelled and cannot be tracked further. If you think this is a mistake, please reach out to our customer support team.</p>
        </div>
      </div>

      <!-- ─── Order Details ─── -->
      <div class="details-card">
        <h2 class="section-heading">Order Details</h2>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Order ID</span>
            <span class="detail-value font-mono text-sm">{{ foundOrder.orderId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Customer</span>
            <span class="detail-value">{{ foundOrder.customerName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Phone</span>
            <span class="detail-value">{{ foundOrder.phone || '—' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Address</span>
            <span class="detail-value">{{ foundOrder.address || '—' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Amount</span>
            <span class="detail-value font-bold" style="color:var(--color-primary)">{{ formatCurrency(foundOrder.totalAmount) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Placed On</span>
            <span class="detail-value">{{ new Date(foundOrder.createdAt).toLocaleString() }}</span>
          </div>
        </div>
      </div>



    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';

const route = useRoute();
const authStore = useAuthStore();

const stages = ref(['Order Placed', 'Processing', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered']);
const activeStatuses = ref([]);
const searchId = ref('');
const errorMessage = ref('');
const foundOrder = ref(null);

onMounted(async () => {
  await fetchActiveStatuses();
  if (route.query.orderId) {
    searchId.value = String(route.query.orderId);
    track();
  }
});

async function fetchActiveStatuses() {
  try {
    const res = await api.get('/v1/order-statuses/active');
    if (res.data && res.data.success) {
      activeStatuses.value = res.data.data;
      const sequential = activeStatuses.value.filter(s => s.name.toLowerCase() !== 'cancelled');
      if (sequential.length > 0) stages.value = sequential.map(s => s.name);
    }
  } catch (e) {
    console.error('Failed to load active order statuses from DB:', e);
  }
}

function isStage(stage, keyword) {
  return String(stage).toLowerCase().trim().includes(keyword);
}

function stepState(idx) {
  if (idx < currentStageIndex.value) return 'done';
  if (idx === currentStageIndex.value) return 'active';
  return 'pending';
}

function loadOrders() {
  try { return JSON.parse(localStorage.getItem('orders') || '[]'); }
  catch { return []; }
}

async function track() {
  errorMessage.value = '';
  foundOrder.value = null;
  const trimmedId = searchId.value.trim();
  if (!trimmedId) { errorMessage.value = 'Please enter an Order ID'; return; }

  try {
    const res = await api.get(`/v1/orders/track/${trimmedId}`);
    if (res.data && res.data.success) {
      const o = res.data.data;
      const formattedOrder = {
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
      };
      setupTrackingStages(formattedOrder);
      foundOrder.value = formattedOrder;
      return;
    }
  } catch (e) {
    console.error('API fallback:', e);
  }

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === trimmedId);
  if (!order) { errorMessage.value = 'Order not found'; return; }
  setupTrackingStages(order);
  foundOrder.value = order;
}

function setupTrackingStages(order) {
  const normStatus = String(order.status || '').toLowerCase().trim();
  let stageIndex = stages.value.findIndex(
    s => s.toLowerCase() === normStatus || s.toLowerCase().replace(/[\s_]+/g, '-') === normStatus
  );
  if (stageIndex === -1) {
    if (normStatus === 'pending') stageIndex = stages.value.findIndex(s => s.toLowerCase().includes('order placed') || s.toLowerCase() === 'pending');
    else if (normStatus === 'completed') stageIndex = stages.value.findIndex(s => s.toLowerCase().includes('delivered') || s.toLowerCase() === 'completed');
  }
  if (stageIndex === -1) {
    const daysPassed = Math.floor((Date.now() - new Date(order.createdAt)) / 86400000);
    stageIndex = Math.min(daysPassed, stages.value.length - 1);
  }
  order.currentStageIndex = stageIndex;
  const baseDate = new Date(order.createdAt);
  order.timeline = stages.value.map((s, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return { stage: s, date: d };
  });
}

const currentStageIndex = computed(() => foundOrder.value ? foundOrder.value.currentStageIndex : 0);
const timeline = computed(() => foundOrder.value ? foundOrder.value.timeline : []);
const isCancelled = computed(() => foundOrder.value?.status === 'cancelled');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(value);
}
</script>

<style scoped>
/* ─── Hero ─── */
.track-hero {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  padding: 3.5rem 1rem 3rem;
}
.dark .track-hero { background: linear-gradient(135deg, #052e16 0%, #14532d 100%); }

/* ─── Tracker Card ─── */
.tracker-card {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem 2.5rem;
  border: 1px solid #e8f5e9;
}
.dark .tracker-card { background: #1e293b; border-color: #334155; }
.tracker-heading { font-size: 1rem; font-weight: 700; color: #14532d; margin-bottom: 2rem; }
.dark .tracker-heading { color: #4ade80; }

/* ─── Desktop Stepper (hidden on mobile) ─── */
.stepper-desktop {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden; /* NO scrollbar */
}
@media (max-width: 600px) { .stepper-desktop { display: none; } }

.step-col { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 0; }
.connector { flex: 1; height: 3px; background: #e2e8f0; border-radius: 9px; margin-top: 27px; min-width: 8px; overflow: hidden; }
.dark .connector { background: #334155; }
.connector-bar { height: 100%; width: 0; background: linear-gradient(90deg, #16a34a, #4ade80); border-radius: 9px; transition: width 1s ease; }
.connector-bar.filled { width: 100%; }
.connector.connector-cancelled { background: #fee2e2; }
.connector-bar.filled-cancelled { background: linear-gradient(90deg, #ef4444, #f87171) !important; width: 100%; }

/* ─── Step Bubble ─── */
.step-bubble {
  position: relative;
  width: 72px; height: 72px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #ffffff;
  border: 3px solid #1e293b;
  --box-shadow: 0 6px 0 #1e293b;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 8px;
}
.dark .step-bubble {
  background: #1e293b;
  border-color: #f1f5f9;
  box-shadow: 0 6px 0 #f1f5f9;
}
.step-bubble.pending {
  opacity: 0.65;
  filter: grayscale(80%);
}
.step-bubble.done {
  transform: translateY(-2px);
  --box-shadow: 0 8px 0 #1e293b;
}
/* .dark .step-bubble.done {
  box-shadow: 0 8px 0 #f1f5f9;
} */
.step-bubble.active {
  transform: scale(1.18) translateY(-4px);
  border-color: green;
}
.dark .step-bubble.active {
  border-color: green;
}

/* ── Cancelled state: all steps turn red ── */
.stepper-cancelled .step-bubble,
.step-bubble.cancelled-step {
  border-color: #ef4444 !important;
  background: #fff0f0 !important;
}
.dark .stepper-cancelled .step-bubble,
.dark .step-bubble.cancelled-step {
  border-color: #ef4444 !important;
  background: #2d1515 !important;
}
.label-cancelled {
  color: #ef4444 !important;
  font-weight: 700;
}

/* Pulse ring */
.pulse-ring {
  position: absolute; inset: -9px;
  border-radius: 50%;
  border: 3px solid green;
  animation: pulseRing 1.8s ease-out infinite;
  pointer-events: none;
}
@keyframes pulseRing {
  0%   { transform: scale(1); opacity: 0.9; }
  60%  { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* Step label */
.step-label {
  margin-top: 1rem;
  font-size: 0.72rem;
  text-align: center;
  max-width: 80px;
  line-height: 1.4;
  transition: color 0.3s;
  font-weight: 700;
  color: #64748b;
}
.label-on  { color: #1e293b; }
.dark .label-on { color: #f1f5f9; }
.step-bubble.active + .step-label {
  color: green;
}

/* ─── Envato Styled Illustrated Icons ─── */
.envato-icon {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Shared vector strokes and fills */
.icon-dark-stroke {
  stroke: #1e293b;
  stroke-width: 3.5px;
  fill: none;
}
.dark .icon-dark-stroke {
  stroke: #f1f5f9;
}
.icon-dark-fill {
  fill: #1e293b;
}
.dark .icon-dark-fill {
  fill: #f1f5f9;
}
.icon-red-fill {
  fill: green;
}
.icon-red-stroke {
  stroke: green;
  stroke-width: 3.5px;
  fill: none;
}

/* Custom animations for each icon */

/* 1. Paper / Calendar draw mark animation */
.icon-draw-line {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: drawLine 2s ease-in-out infinite alternate;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

/* 2. Slow spin for clock ring / gear */
.icon-spin-slow {
  animation: spinSlow 6s linear infinite;
  transform-origin: 32px 32px;
}
@keyframes spinSlow {
  to { transform: rotate(360deg); }
}

/* 3. Ribbon Bounce */
.icon-ribbon-bounce {
  animation: ribbonBounce 1.5s ease-in-out infinite alternate;
  transform-origin: 32px 18px;
}
@keyframes ribbonBounce {
  0% { transform: scaleY(1); }
  100% { transform: scaleY(1.2) translateY(-1px); }
}

/* 4. Truck Drive Bounce */
.icon-truck-drive {
  animation: truckDrive 1.8s ease-in-out infinite;
}
@keyframes truckDrive {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateY(-2px); }
  50% { transform: translateX(2px) translateY(0); }
  75% { transform: translateY(-1px); }
}

/* 5. Pin drop / bounce */
.icon-pin-drop {
  animation: pinDrop 1.6s ease-in-out infinite alternate;
  transform-origin: 32px 44px;
}
@keyframes pinDrop {
  0% { transform: translateY(0) scaleY(1); }
  100% { transform: translateY(-5px) scaleY(0.95); }
}

/* 6. Completed Badge rotating outline & checkmark */
.icon-badge-rotate {
  animation: badgeRotate 10s linear infinite;
  transform-origin: 32px 32px;
}
@keyframes badgeRotate {
  to { transform: rotate(360deg); }
}
.icon-draw-check {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: drawCheckIcon 1.8s ease-in-out infinite;
}
@keyframes drawCheckIcon {
  0% { stroke-dashoffset: 40; }
  70%, 100% { stroke-dashoffset: 0; }
}

/* ─── Mobile Stepper ─── */
.stepper-mobile { display: none; padding: 0; margin: 0; list-style: none; }
@media (max-width: 600px) { .stepper-mobile { display: flex; flex-direction: column; gap: 0; } }

.mobile-step {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.75rem 0;
  border-left: 2px solid #e2e8f0;
  padding-left: 1.25rem;
  margin-left: 1rem;
  position: relative;
}
.mobile-step:last-child { border-color: transparent; }
.mobile-step.done   { border-color: #22c55e; }
.mobile-step.active { border-color: #22c55e; }
.dark .mobile-step  { border-color: #334155; }
.dark .mobile-step.done, .dark .mobile-step.active { border-color: #22c55e; }

.mobile-dot {
  position: absolute;
  left: -11px;
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem;
}
.mobile-step.done   .mobile-dot { background: linear-gradient(135deg, #15803d, #22c55e); color: #fff; }
.mobile-step.active .mobile-dot { background: linear-gradient(135deg, #166534, #22c55e); color: #fff; box-shadow: 0 0 0 4px rgba(34,197,94,0.25); }
.mobile-step.pending .mobile-dot { background: #e2e8f0; color: #94a3b8; }
.dark .mobile-step.pending .mobile-dot { background: #1e293b; border: 2px solid #334155; }

.mobile-pulse { display: block; width: 8px; height: 8px; border-radius: 50%; background: #fff; animation: pulseRing 1.5s ease-out infinite; }
.mobile-info { display: flex; flex-direction: column; }
.mobile-label { font-size: 0.85rem; }
.mobile-badge { font-size: 0.65rem; color: #22c55e; font-weight: 600; margin-top: 2px; }

/* ─── Details Card ─── */
.details-card {
  background: #fff; border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 1.75rem; border: 1px solid #f0f0f0;
}
.dark .details-card { background: #1e293b; border-color: #334155; }
.section-heading { font-size: 1rem; font-weight: 700; color: #14532d; margin-bottom: 1.25rem; }
.dark .section-heading { color: #4ade80; }
.details-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem 1.5rem; }
@media (max-width: 520px) { .details-grid { grid-template-columns: 1fr; } }
.detail-item { display: flex; flex-direction: column; gap: 2px; }
.detail-label { font-size: 0.7rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; }
.detail-value { font-size: 0.9rem; color: #111827; font-weight: 500; }
.dark .detail-value { color: #e2e8f0; }

/* Cancelled Card specific layout */
.cancelled-card {
  border-color: #fee2e2;
  background-color: #fffdfd;
}
.dark .cancelled-card {
  border-color: #991b1b;
  background-color: #1e1b1b;
}

.cancelled-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #ef4444;
  background-color: #fee2e2;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #fca5a5;
  text-transform: uppercase;
}
.dark .cancelled-badge {
  color: #fca5a5;
  background-color: #7f1d1d;
  border-color: #991b1b;
}

.cancelled-illustration-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
}

.cancelled-graphic-wrap {
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
}

.cancelled-svg {
  width: 100%;
  height: 100%;
}

.cancelled-cross-anim {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: drawCross 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes drawCross {
  to {
    stroke-dashoffset: 0;
  }
}

.cancelled-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ef4444;
  margin-bottom: 0.5rem;
}

.cancelled-desc {
  max-width: 480px;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}
.dark .cancelled-desc {
  color: #9ca3af;
}

</style>
