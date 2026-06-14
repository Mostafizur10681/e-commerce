<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white">Saved Addresses</h2>
        <button
          v-if="!isFormOpen"
          @click="openAddForm"
          class="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs shadow-md transition duration-200 flex items-center gap-1"
        >
          <span>➕</span> Add New Address
        </button>
      </div>

      <!-- Collapsible Form Card -->
      <Transition name="slide">
        <div
          v-if="isFormOpen"
          class="bg-gray-50 dark:bg-gray-850 rounded-2xl p-6 border border-gray-150 dark:border-gray-800 mb-6 space-y-4"
        >
          <h3 class="text-base font-bold text-gray-950 dark:text-white">
            {{ isEditing ? 'Edit Address' : 'Add New Address' }}
          </h3>
          
          <form @submit.prevent="saveAddress" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Full Name -->
              <div>
                <label for="fullName" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.fullName"
                  id="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.phone"
                  id="phone"
                  type="tel"
                  required
                  placeholder="01700000000"
                  class="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- District -->
              <div>
                <label for="district" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  District <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.district"
                  id="district"
                  required
                  class="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                >
                  <option value="" disabled>Select district</option>
                  <option v-for="dist in districts" :key="dist" :value="dist">{{ dist }}</option>
                </select>
              </div>

              <!-- Thana -->
              <div>
                <label for="thana" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Thana <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.thana"
                  id="thana"
                  :disabled="!form.district"
                  required
                  class="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled>Select Thana</option>
                  <option v-for="th in filteredThanas" :key="th" :value="th">{{ th }}</option>
                </select>
              </div>
            </div>

            <!-- Full Address details -->
            <div>
              <label for="address" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Full Address <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.address"
                id="address"
                rows="2"
                required
                placeholder="House no., street name, village name, etc."
                class="w-full rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              ></textarea>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                @click="closeForm"
                class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-xs transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs shadow-md transition duration-200"
              >
                {{ isEditing ? 'Update Address' : 'Save Address' }}
              </button>
            </div>
          </form>
        </div>
      </Transition>

      <!-- Empty State -->
      <div v-if="addresses.length === 0" class="text-center py-12">
        <div class="text-5xl mb-4">📍</div>
        <h3 class="text-lg font-bold text-gray-950 dark:text-white">No addresses saved</h3>
        <p class="text-sm text-gray-500 mt-1 max-w-sm mx-auto">Add a saved shipping address for faster, friction-free checkouts.</p>
      </div>

      <!-- Address Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-5 shadow-sm relative flex flex-col justify-between"
        >
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-gray-950 dark:text-white text-base">{{ addr.fullName }}</h4>
            </div>
            
            <p class="text-xs text-gray-500 dark:text-gray-400">📞 {{ addr.phone }}</p>
            <p class="text-sm text-gray-750 dark:text-gray-300 leading-relaxed pt-2">
              {{ addr.address }}, {{ addr.thana }}, {{ addr.district }}
            </p>
          </div>

          <div class="mt-5 pt-3 border-t border-gray-100 dark:border-gray-850 flex justify-end gap-2">
            <button
              @click="editAddress(addr)"
              class="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition"
            >
              Edit
            </button>
            <button
              @click="deleteAddress(addr.id)"
              class="px-3 py-1.5 text-xs font-bold text-red-650 hover:bg-red-50 dark:hover:bg-red-950/25 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { allDistricts } from '@bangladeshi/bangladesh-address/build/src/district/index.js';
import bdThana from '@bangladeshi/bangladesh-address/build/src/json/bd-thana.json';

const authStore = useAuthStore();
const toastStore = useToastStore();

const addresses = ref([]);
const isFormOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  fullName: '',
  phone: '',
  district: '',
  thana: '',
  address: ''
});

const districts = allDistricts();

const filteredThanas = computed(() => {
  if (!form.value.district) return [];
  return bdThana
    .filter(item => item.district === form.value.district)
    .map(item => item.thana);
});

onMounted(() => {
  loadAddresses();
});

function loadAddresses() {
  const userId = authStore.currentUser?.id;
  if (!userId) return;
  try {
    addresses.value = JSON.parse(localStorage.getItem('addresses_' + userId) || '[]');
  } catch (e) {
    console.error('Failed to parse addresses', e);
    addresses.value = [];
  }
}

function openAddForm() {
  form.value = { fullName: '', phone: '', district: '', thana: '', address: '' };
  isEditing.value = false;
  editingId.value = null;
  isFormOpen.value = true;
}

function closeForm() {
  isFormOpen.value = false;
  isEditing.value = false;
  editingId.value = null;
}

function saveAddress() {
  const userId = authStore.currentUser?.id;
  if (!userId) return;

  if (isEditing.value) {
    const idx = addresses.value.findIndex(a => a.id === editingId.value);
    if (idx > -1) {
      addresses.value[idx] = {
        ...addresses.value[idx],
        fullName: form.value.fullName,
        phone: form.value.phone,
        district: form.value.district,
        thana: form.value.thana,
        address: form.value.address
      };
      toastStore.show('Address updated successfully', 'success');
    }
  } else {
    addresses.value.push({
      id: Date.now().toString(),
      fullName: form.value.fullName,
      phone: form.value.phone,
      district: form.value.district,
      thana: form.value.thana,
      address: form.value.address
    });
    toastStore.show('Address added successfully', 'success');
  }

  localStorage.setItem('addresses_' + userId, JSON.stringify(addresses.value));
  closeForm();
}

function editAddress(addr) {
  form.value = {
    fullName: addr.fullName,
    phone: addr.phone,
    district: addr.district,
    thana: addr.thana,
    address: addr.address
  };
  editingId.value = addr.id;
  isEditing.value = true;
  isFormOpen.value = true;
}

function deleteAddress(id) {
  const userId = authStore.currentUser?.id;
  if (!userId) return;

  addresses.value = addresses.value.filter(a => a.id !== id);
  localStorage.setItem('addresses_' + userId, JSON.stringify(addresses.value));
  toastStore.show('Address deleted', 'success');
}
</script>

<style scoped>
.border-gray-850 {
  border-color: #2d3748;
}
.text-gray-450 {
  color: #a0aec0;
}
.text-red-650 {
  color: #e53e3e;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
