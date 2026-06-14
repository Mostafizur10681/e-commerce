<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <!-- Left Side: Interactive image and Welcome banner -->
    <div class="relative h-64 lg:h-auto w-full flex flex-col justify-end overflow-hidden group select-none">
      <img
        :src="authBg"
        alt="FreshMart Grocery Shopping"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-gray-950 lg:to-transparent opacity-85"></div>
      
      <!-- Text Overlay -->
      <div class="relative z-10 p-6 sm:p-12 lg:p-16 text-white max-w-xl">
        <span class="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-xs font-semibold text-primary-light mb-4 tracking-wider uppercase">
          Join FreshMart
        </span>
        <h1 class="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-sm">
          Start Shopping
        </h1>
        <p class="text-sm lg:text-lg text-gray-300 font-medium leading-relaxed drop-shadow-sm">
          Create an account to track your orders, save items to your wishlist, and enjoy a seamless checkout.
        </p>
      </div>
    </div>

    <!-- Right Side: Register Form -->
    <div class="flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-gray-50 dark:bg-gray-950">
      <div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800 p-8 transition-all duration-300 my-8">
        
        <!-- Header -->
        <div class="mb-6 text-center">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-3">
            <span class="text-3xl">🥬</span>
            <span class="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">FreshMart</span>
          </RouterLink>
          <h2 class="text-2xl font-bold text-gray-950 dark:text-white">Create an Account</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Please fill in the information below to sign up</p>
        </div>

        <!-- Global Error message -->
        <Transition name="fade">
          <div v-if="errors.global" class="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 rounded-xl flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm text-red-700 dark:text-red-300 font-medium">{{ errors.global }}</span>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          
          <!-- Full Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('name')"
              />
            </div>
            <p v-if="errors.name" class="text-red-500 text-xs mt-1 font-medium">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="email@example.com"
                class="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('email')"
              />
            </div>
            <p v-if="errors.email" class="text-red-500 text-xs mt-1 font-medium">{{ errors.email }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Phone Number
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <input
                id="phone"
                v-model="form.phone"
                type="text"
                placeholder="01700000000"
                class="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('phone')"
              />
            </div>
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1 font-medium">{{ errors.phone }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('password')"
              />
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1 font-medium">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('confirmPassword')"
              />
            </div>
            <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1 font-medium">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creating Account...' : 'Register' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          Already have an account?
          <RouterLink to="/login" class="text-primary hover:text-primary-dark font-bold hover:underline transition-colors ml-1">
            Login
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import authBg from '../assets/auth-bg.png';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  global: ''
});

const loading = ref(false);

function clearError(field) {
  errors[field] = '';
  errors.global = '';
}

function handleRegister() {
  // Reset errors
  errors.name = '';
  errors.email = '';
  errors.phone = '';
  errors.password = '';
  errors.confirmPassword = '';
  errors.global = '';

  let isValid = true;

  // Name Validation
  if (!form.name.trim()) {
    errors.name = 'Full Name is required.';
    isValid = false;
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Email Address is required.';
    isValid = false;
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
    isValid = false;
  }

  // Phone Validation
  if (!form.phone.trim()) {
    errors.phone = 'Phone Number is required.';
    isValid = false;
  }

  // Password Validation
  if (!form.password) {
    errors.password = 'Password is required.';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
    isValid = false;
  }

  // Confirm Password Validation
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required.';
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
    isValid = false;
  }

  if (!isValid) return;

  loading.value = true;

  // Premium feeling slight latency
  setTimeout(() => {
    const result = authStore.register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    });
    
    loading.value = false;

    if (result.success) {
      toastStore.show('Registration successful', 'success');
      authStore.login(form.email, form.password);
      router.push('/myaccount/dashboard');
    } else {
      errors.global = result.error;
    }
  }, 600);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
