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

      <form @submit.prevent="handleUpdateProfile" class="w-full space-y-5">
        
        <!-- Profile Image Selection -->
        <div class="flex items-center gap-6 mb-6">
          <div class="relative shrink-0 group">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
              <img v-if="profileImagePreview" :src="profileImagePreview" alt="Profile Preview" class="w-full h-full object-cover" />
              <svg v-else class="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <label for="profileImage" class="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity duration-200">
              <span class="text-xs font-bold">Change</span>
              <input type="file" id="profileImage" accept="image/*" class="hidden" @change="handleImageSelected" />
            </label>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-white">Profile Picture</h3>
            <p class="text-xs text-gray-500 mt-1">PNG, JPG, or GIF up to 2MB.</p>
            <p v-if="validationErrors.profile_pic" class="text-red-500 text-xs mt-1.5 font-semibold">{{ validationErrors.profile_pic }}</p>
          </div>
        </div>

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
            maxlength="11"
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': validationErrors.phone }"
            @input="form.phone = String(form.phone || '').replace(/\D/g, '').slice(0, 11)"
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

    <!-- Change Password Section -->
    <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-gray-950 dark:text-white">Change Password</h2>
        <p class="text-xs text-gray-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <!-- Password Error message -->
      <Transition name="fade">
        <div v-if="pwdErrorMsg" class="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 rounded-xl flex items-start gap-3">
          <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-red-700 dark:text-red-300 font-medium">{{ pwdErrorMsg }}</span>
        </div>
      </Transition>

      <form @submit.prevent="handleUpdatePassword" class="w-full space-y-5">
        <!-- Current Password -->
        <div>
          <label for="currentPassword" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Current Password <span class="text-red-500">*</span>
          </label>
          <input
            v-model="pwdForm.currentPassword"
            id="currentPassword"
            type="password"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': pwdValidationErrors.currentPassword }"
          />
          <p v-if="pwdValidationErrors.currentPassword" class="text-red-500 text-xs mt-1.5 font-semibold">{{ pwdValidationErrors.currentPassword }}</p>
        </div>

        <!-- New Password -->
        <div>
          <label for="newPassword" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            New Password <span class="text-red-500">*</span>
          </label>
          <input
            v-model="pwdForm.newPassword"
            id="newPassword"
            type="password"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': pwdValidationErrors.newPassword }"
          />
          <p v-if="pwdValidationErrors.newPassword" class="text-red-500 text-xs mt-1.5 font-semibold">{{ pwdValidationErrors.newPassword }}</p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Confirm Password <span class="text-red-500">*</span>
          </label>
          <input
            v-model="pwdForm.confirmPassword"
            id="confirmPassword"
            type="password"
            required
            class="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': pwdValidationErrors.confirmPassword }"
          />
          <p v-if="pwdValidationErrors.confirmPassword" class="text-red-500 text-xs mt-1.5 font-semibold">{{ pwdValidationErrors.confirmPassword }}</p>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="pwdLoading"
            class="px-6 py-3 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-350 text-sm flex items-center gap-2 disabled:cursor-not-allowed"
          >
            <svg v-if="pwdLoading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ pwdLoading ? 'Updating Password...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';

const authStore = useAuthStore();
const toastStore = useToastStore();

const form = ref({
  name: '',
  email: '',
  phone: '',
  profileFile: null
});

const profileImagePreview = ref(null);

const validationErrors = reactive({
  name: '',
  email: '',
  phone: '',
  profile_pic: ''
});

const errorMsg = ref('');
const loading = ref(false);

const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://127.0.0.1:8000';

onMounted(() => {
  if (authStore.currentUser) {
    form.value.name = authStore.currentUser.name || '';
    form.value.email = authStore.currentUser.email || '';
    form.value.phone = authStore.currentUser.phone ? String(authStore.currentUser.phone) : '';
    
    if (authStore.currentUser.profile_pic) {
      profileImagePreview.value = `${backendUrl}/storage/${authStore.currentUser.profile_pic}`;
    }
  }
});

function handleImageSelected(event) {
  const file = event.target.files[0];
  if (file) {
    form.value.profileFile = file;
    profileImagePreview.value = URL.createObjectURL(file);
    validationErrors.profile_pic = '';
  }
}

function validateProfileForm() {
  validationErrors.name = '';
  validationErrors.email = '';
  validationErrors.phone = '';
  validationErrors.profile_pic = '';
  
  let isValid = true;

  if (!String(form.value.name).trim()) {
    validationErrors.name = 'Full Name is required.';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailStr = String(form.value.email).trim();
  if (!emailStr) {
    validationErrors.email = 'Email Address is required.';
    isValid = false;
  } else if (!emailRegex.test(emailStr)) {
    validationErrors.email = 'Please enter a valid email address.';
    isValid = false;
  }

  const phoneStr = String(form.value.phone || '').trim();
  const hasLetters = /[a-zA-Z]/.test(phoneStr);
  const phoneRegex = /^\d{11}$/;
  
  if (!phoneStr) {
    validationErrors.phone = 'Phone Number is required.';
    isValid = false;
  } else if (hasLetters) {
    validationErrors.phone = 'Phone number cannot contain characters. Only numbers are allowed.';
    isValid = false;
  } else if (!phoneRegex.test(phoneStr)) {
    validationErrors.phone = 'Phone number must be exactly 11 digits.';
    isValid = false;
  }

  return isValid;
}

watch(() => form.value.name, () => { if(validationErrors.name) validateProfileForm(); });
watch(() => form.value.email, () => { if(validationErrors.email) validateProfileForm(); });
watch(() => form.value.phone, () => {
  // Always validate phone as they type to enforce character checking immediately
  validateProfileForm(); 
});

function handleUpdateProfile() {
  errorMsg.value = '';
  
  if (!validateProfileForm()) return;

  loading.value = true;

  // Fake short latency for rich UI response feel
  setTimeout(async () => {
    const result = await authStore.updateProfile({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      profile_pic: form.value.profileFile
    });

    loading.value = false;

    if (result.success) {
      toastStore.show('Profile updated successfully!', 'success');
      form.value.profileFile = null; // reset file input state
    } else {
      if (result.errors) {
        if (result.errors.name) validationErrors.name = result.errors.name[0];
        if (result.errors.email) validationErrors.email = result.errors.email[0];
        if (result.errors.phone) validationErrors.phone = result.errors.phone[0];
        if (result.errors.profile_pic) validationErrors.profile_pic = result.errors.profile_pic[0];
      }
      errorMsg.value = result.error || 'Failed to update profile.';
    }
  }, 500);
}

const pwdForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const pwdValidationErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const pwdErrorMsg = ref('');
const pwdLoading = ref(false);

function validatePwdForm() {
  pwdValidationErrors.currentPassword = '';
  pwdValidationErrors.newPassword = '';
  pwdValidationErrors.confirmPassword = '';
  
  let isValid = true;

  if (!pwdForm.value.currentPassword) {
    pwdValidationErrors.currentPassword = 'Current Password is required.';
    isValid = false;
  }
  if (!pwdForm.value.newPassword) {
    pwdValidationErrors.newPassword = 'New Password is required.';
    isValid = false;
  } else if (pwdForm.value.newPassword.length < 8) {
    pwdValidationErrors.newPassword = 'Password must be at least 8 characters.';
    isValid = false;
  }
  if (!pwdForm.value.confirmPassword) {
    // Only show required if they have started typing new password
    if (pwdForm.value.newPassword) {
      pwdValidationErrors.confirmPassword = 'Confirm Password is required.';
      isValid = false;
    }
  } else if (pwdForm.value.newPassword !== pwdForm.value.confirmPassword) {
    pwdValidationErrors.confirmPassword = 'Passwords do not match.';
    isValid = false;
  }

  return isValid;
}

watch(pwdForm, () => {
  // Always validate dynamically to show length/match errors immediately
  validatePwdForm();
}, { deep: true });

function handleUpdatePassword() {
  pwdErrorMsg.value = '';
  
  if (!validatePwdForm()) return;

  pwdLoading.value = true;

  setTimeout(async () => {
    const result = await authStore.changePassword(
      pwdForm.value.currentPassword,
      pwdForm.value.newPassword
    );

    pwdLoading.value = false;

    if (result.success) {
      toastStore.show('Password changed successfully!', 'success');
      pwdForm.value.currentPassword = '';
      pwdForm.value.newPassword = '';
      pwdForm.value.confirmPassword = '';
    } else {
      if (result.errors) {
        if (result.errors.current_password) pwdValidationErrors.currentPassword = result.errors.current_password[0];
        if (result.errors.password) pwdValidationErrors.newPassword = result.errors.password[0];
      }
      pwdErrorMsg.value = result.error || 'Failed to change password.';
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
