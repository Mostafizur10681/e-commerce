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

            <!-- Division + District + Thana (3 cols) -->
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 lg:col-span-4">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
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
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
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
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
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
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import api from '../../services/api';

const authStore = useAuthStore();
const toastStore = useToastStore();

const addresses = ref([]);
const isFormOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const divisions = ref([]);
const districts = ref([]);
const filteredThanas = ref([]);

const form = ref({
  fullName: '',
  phone: '',
  division: null,
  district: null,
  thana: null,
  address: ''
});

onMounted(async () => {
  loadAddresses();
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
  form.value = { fullName: '', phone: '', division: null, district: null, thana: null, address: '' };
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
        division: form.value.division,
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
      division: form.value.division,
      district: form.value.district,
      thana: form.value.thana,
      address: form.value.address
    });
    toastStore.show('Address added successfully', 'success');
  }

  localStorage.setItem('addresses_' + userId, JSON.stringify(addresses.value));
  closeForm();
}

async function editAddress(addr) {
  isEditing.value = true;
  editingId.value = addr.id;
  
  form.value.fullName = addr.fullName;
  form.value.phone = addr.phone;
  form.value.address = addr.address;
  form.value.division = addr.division;

  // Wait for the watcher to fetch districts
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Now set district, which triggers thanas fetch
  form.value.district = districts.value.find(d => d.id === addr.district?.id) || addr.district;
  
  // Wait for the watcher to fetch thanas
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Now set thana
  form.value.thana = filteredThanas.value.find(t => t.id === addr.thana?.id) || addr.thana;
  
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
