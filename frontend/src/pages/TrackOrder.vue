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
      <div class="tracker-card">
        <h2 class="tracker-heading">Shipment Progress</h2>

        <!-- Desktop: horizontal row -->
        <div class="stepper-desktop pt-5">
          <template v-for="(stage, idx) in stages" :key="stage">
            <div class="step-col">
              <!-- Bubble -->
              <div :class="['step-bubble', stepState(idx)]">
                <span v-if="idx === currentStageIndex" class="pulse-ring"></span>

                <!-- ── ORDER PLACED ── -->
                <svg v-if="isStage(stage,'order placed') || isStage(stage,'pending')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <!-- bag body swings -->
                  <g class="bag-swing">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </g>
                </svg>

                <!-- ── PROCESSING ── -->
                <svg v-else-if="isStage(stage,'processing')"
                     class="anim-icon gear-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>

                <!-- ── PACKED ── -->
                <svg v-else-if="isStage(stage,'packed')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <!-- box base stays fixed -->
                  <path d="M3 9l9 5 9-5M12 22V14"/>
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <!-- lid bounces up -->
                  <path class="box-lid" d="M3.27 6.96L12 12.01l8.73-5.05"/>
                </svg>

                <!-- ── SHIPPED ── -->
                <svg v-else-if="isStage(stage,'shipped')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <!-- truck body bounces slightly -->
                  <g class="truck-bounce">
                    <rect x="1" y="3" width="15" height="13" rx="1"/>
                    <path d="M16 8h4l3 3v5h-7V8z"/>
                    <!-- wheels spin -->
                    <circle class="wheel-spin" cx="5.5" cy="18.5" r="2.5"/>
                    <circle class="wheel-spin" cx="18.5" cy="18.5" r="2.5"/>
                    <!-- wheel hubs -->
                    <circle class="wheel-hub" cx="5.5" cy="18.5" r="0.8" fill="currentColor" stroke="none"/>
                    <circle class="wheel-hub" cx="18.5" cy="18.5" r="0.8" fill="currentColor" stroke="none"/>
                  </g>
                </svg>

                <!-- ── OUT FOR DELIVERY ── -->
                <svg v-else-if="isStage(stage,'delivery')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <!-- hour hand ticks -->
                  <line class="clock-hour" x1="12" y1="12" x2="12" y2="7"/>
                  <!-- minute hand spins -->
                  <line class="clock-minute" x1="12" y1="12" x2="16" y2="12"/>
                  <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>
                </svg>

                <!-- ── DELIVERED / COMPLETED ── -->
                <svg v-else-if="isStage(stage,'delivered') || isStage(stage,'completed')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <g class="check-pop">
                    <path class="check-circle" d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline class="check-mark" points="22 4 12 14.01 9 11.01"/>
                  </g>
                </svg>

                <!-- ── CANCELLED ── -->
                <svg v-else-if="isStage(stage,'cancelled')"
                     class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line class="x-shake" x1="15" y1="9" x2="9" y2="15"/>
                  <line class="x-shake" x1="9" y1="9" x2="15" y2="15"/>
                </svg>

                <!-- ── FALLBACK ── -->
                <svg v-else class="anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <text x="12" y="16.5" text-anchor="middle" font-size="9" fill="currentColor" stroke="none">{{ idx+1 }}</text>
                </svg>

              </div>
              <!-- Label -->
              <span :class="['step-label', idx <= currentStageIndex ? 'label-on' : 'label-off']">
                {{ stage }}
              </span>
            </div>
            <!-- Connector -->
            <div v-if="idx < stages.length - 1" class="connector">
              <div :class="['connector-bar', idx < currentStageIndex ? 'filled' : '']"></div>
            </div>
          </template>
        </div>

        <!-- Mobile: vertical list -->
        <ol class="stepper-mobile">
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

/* ─── Step Bubble ─── */
.step-bubble {
  position: relative;
  width: 58px; height: 58px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s;
}
.step-bubble.pending {
  background: #f1f5f9; border: 2px solid #e2e8f0; color: #94a3b8;
}
.dark .step-bubble.pending { background: #0f172a; border-color: #334155; color: #475569; }

.step-bubble.done {
  background: linear-gradient(135deg, #15803d, #22c55e);
  border: 2px solid #16a34a; color: #fff;
  box-shadow: 0 4px 16px rgba(34,197,94,0.35);
}
.step-bubble.active {
  background: linear-gradient(135deg, #166534, #16a34a, #22c55e);
  border: 2px solid #15803d; color: #fff;
  box-shadow: 0 6px 24px rgba(34,197,94,0.5);
  transform: scale(1.15);
}

/* Pulse ring */
.pulse-ring {
  position: absolute; inset: -7px;
  border-radius: 50%;
  border: 3px solid #4ade80;
  animation: pulseRing 1.8s ease-out infinite;
  pointer-events: none;
}
@keyframes pulseRing {
  0%   { transform: scale(1); opacity: 0.9; }
  60%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Step label */
.step-label {
  margin-top: 0.6rem;
  font-size: 0.68rem;
  text-align: center;
  max-width: 72px;
  line-height: 1.3;
  transition: color 0.3s;
}
.label-on  { color: #15803d; font-weight: 700; }
.dark .label-on { color: #4ade80; }
.label-off { color: #94a3b8; }

/* ─── Animated Icons ─── */
.anim-icon { width: 26px; height: 26px; flex-shrink: 0; position: relative; z-index: 1; }

/* Shopping Bag – pendulum swing */
.bag-swing {
  transform-origin: 12px 4px;
  transform-box: fill-box;
  animation: bagSwing 2s ease-in-out infinite;
}
@keyframes bagSwing {
  0%, 100% { transform: rotate(-8deg); }
  50%       { transform: rotate(8deg);  }
}

/* Gear – continuous spin */
.gear-spin {
  animation: gearSpin 2s linear infinite;
  transform-origin: center;
  transform-box: fill-box;
}
.step-bubble.pending .gear-spin { animation-duration: 4s; opacity: 0.7; }
.step-bubble.done    .gear-spin { animation-duration: 3s; }
@keyframes gearSpin {
  to { transform: rotate(360deg); }
}

/* Box lid – bounce up/down */
.box-lid {
  transform-origin: center;
  transform-box: fill-box;
  animation: lidBounce 1.5s ease-in-out infinite;
}
@keyframes lidBounce {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-3px); }
}

/* Truck – bounce body + spin wheels */
.truck-bounce {
  animation: truckBounce 0.8s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center bottom;
}
@keyframes truckBounce {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1.5px); }
}
.wheel-spin {
  transform-box: fill-box;
  transform-origin: center;
  animation: wheelSpin 0.6s linear infinite;
}
@keyframes wheelSpin {
  to { transform: rotate(360deg); }
}

/* Clock – hour hand ticks, minute hand spins fast */
.clock-hour {
  transform-box: fill-box;
  transform-origin: 12px 12px;
  animation: hourTick 8s steps(12, end) infinite;
}
@keyframes hourTick {
  to { transform: rotate(360deg); }
}
.clock-minute {
  transform-box: fill-box;
  transform-origin: 12px 12px;
  animation: minuteSpin 1.5s linear infinite;
}
@keyframes minuteSpin {
  to { transform: rotate(360deg); }
}

/* Check pop – draws path + scales */
.check-pop {
  animation: checkPop 2s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes checkPop {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
}
.check-mark {
  stroke-dasharray: 30;
  stroke-dashoffset: 0;
  animation: drawCheck 2s ease-in-out infinite;
}
@keyframes drawCheck {
  0%        { stroke-dashoffset: 30; opacity: 0.5; }
  40%, 100% { stroke-dashoffset: 0;  opacity: 1; }
}

/* X shake for cancelled */
.x-shake {
  transform-box: fill-box;
  transform-origin: center;
  animation: xShake 0.6s ease-in-out infinite alternate;
}
@keyframes xShake {
  0%   { transform: rotate(-5deg); }
  100% { transform: rotate(5deg);  }
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


</style>
