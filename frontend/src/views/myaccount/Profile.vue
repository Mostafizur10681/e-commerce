<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white">Profile Details</h2>
        <p class="text-xs text-gray-500 mt-1">Review and update your personal contact details.</p>
      </div>

      <!-- Global Error message -->
      <Transition name="fade">
        <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 rounded-xl flex items-start gap-3">
          <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-red-700 dark:text-red-300 font-medium">{{ errorMsg }}</span>
        </div>
      </Transition>

      <form @submit.prevent="handleUpdateProfile" class="space-y-5 max-w-xl">
        <!-- Full Name -->
        <div>
          <label for="profileName" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            id="profileName"
            type="text"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': validationErrors.name }"
            @input="clearValidationError('name')"
          />
          <p v-if="validationErrors.name" class="text-red-500 text-xs mt-1.5 font-semibold">{{ validationErrors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label for="profileEmail" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            id="profileEmail"
            type="email"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': validationErrors.email }"
            @input="clearValidationError('email')"
          />
          <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1.5 font-semibold">{{ validationErrors.email }}</p>
        </div>

        <!-- Phone -->
        <div>
          <label for="profilePhone" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.phone"
            id="profilePhone"
            type="text"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': validationErrors.phone }"
            @input="clearValidationError('phone')"
          />
          <p v-if="validationErrors.phone" class="text-red-500 text-xs mt-1.5 font-semibold">{{ validationErrors.phone }}</p>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-350 text-sm flex items-center gap-2 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ loading ? 'Saving Changes...' : 'Save Profile Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';

const authStore = useAuthStore();
const toastStore = useToastStore();

const form = ref({
  name: '',
  email: '',
  phone: ''
});

const validationErrors = reactive({
  name: '',
  email: '',
  phone: ''
});

const errorMsg = ref('');
const loading = ref(false);

onMounted(() => {
  if (authStore.currentUser) {
    form.value.name = authStore.currentUser.name || '';
    form.value.email = authStore.currentUser.email || '';
    form.value.phone = authStore.currentUser.phone || '';
  }
});

function clearValidationError(field) {
  validationErrors[field] = '';
  errorMsg.value = '';
}

function handleUpdateProfile() {
  validationErrors.name = '';
  validationErrors.email = '';
  validationErrors.phone = '';
  errorMsg.value = '';

  let isValid = true;

  if (!form.value.name.trim()) {
    validationErrors.name = 'Full Name is required.';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    validationErrors.email = 'Email Address is required.';
    isValid = false;
  } else if (!emailRegex.test(form.value.email.trim())) {
    validationErrors.email = 'Please enter a valid email address.';
    isValid = false;
  }

  if (!form.value.phone.trim()) {
    validationErrors.phone = 'Phone Number is required.';
    isValid = false;
  }

  if (!isValid) return;

  loading.value = true;

  // Fake short latency for rich UI response feel
  setTimeout(() => {
    const result = authStore.updateProfile({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone
    });

    loading.value = false;

    if (result.success) {
      toastStore.show('Profile updated successfully!', 'success');
    } else {
      errorMsg.value = result.error;
    }
  }, 500);
}
</script>

<style scoped>
.border-gray-850 {
  border-color: #2d3748;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
