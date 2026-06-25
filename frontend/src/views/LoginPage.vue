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
          Welcome Back
        </span>
        <h1 class="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-sm">
          Welcome Back
        </h1>
        <p class="text-sm lg:text-lg text-gray-300 font-medium leading-relaxed drop-shadow-sm">
          Sign in to continue shopping and manage your orders.
        </p>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-gray-50 dark:bg-gray-950">
      <div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10 transition-all duration-300">
        
        <!-- Header -->
        <div class="mb-8 text-center">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">🥬</span>
            <span class="text-2xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">FreshMart</span>
          </RouterLink>
          <h2 class="text-2xl font-bold text-gray-950 dark:text-white">Sign In to Your Account</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter your details to access your account</p>
        </div>

        <!-- Global Error message -->
        <Transition name="fade">
          <div v-if="errors.global" class="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 rounded-xl flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm text-red-700 dark:text-red-300 font-medium">{{ errors.global }}</span>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Email / Phone field -->
          <div>
            <label for="emailOrPhone" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address or Phone Number
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </span>
              <input
                id="emailOrPhone"
                v-model="form.emailOrPhone"
                type="text"
                placeholder="email@example.com or 01700000000"
                class="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.emailOrPhone ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('emailOrPhone')"
              />
            </div>
            <p v-if="errors.emailOrPhone" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.emailOrPhone }}</p>
          </div>

          <!-- Password field -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label for="password" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <button
                type="button"
                @click="forgotPassword"
                class="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white transition-all duration-200 outline-none"
                :class="errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-950' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary'"
                @input="clearError('password')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 5.656m0-5.656L9.75 9.75M8.25 14.25l-.75-.75M13.828 10.172l3.536-3.536m-3.536 3.536L15 11.25M8.25 14.25l-3.536 3.536m3.536-3.536L6.75 13.5m0-6.75A9.05 9.05 0 002.5 12c.983 3.13 3.861 5.5 7.25 5.5a8.966 8.966 0 004.836-1.417" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1.5 font-medium">{{ errors.password }}</p>
          </div>

          <!-- Remember Me and forgot password options -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="form.rememberMe"
                class="w-4.5 h-4.5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-opacity-25"
              />
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Remember Me</span>
            </label>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Signing In...' : 'Login' }}
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          Don't have an account?
          <RouterLink to="/register" class="text-primary hover:text-primary-dark font-bold hover:underline transition-colors ml-1">
            Create Account
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import authBg from '../assets/auth-bg.png';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const form = reactive({
  emailOrPhone: '',
  password: '',
  rememberMe: false
});

const errors = reactive({
  emailOrPhone: '',
  password: '',
  global: ''
});

const showPassword = ref(false);
const loading = ref(false);

function clearError(field) {
  errors[field] = '';
  errors.global = '';
}

function forgotPassword() {
  toastStore.show('Forgot password logic is not implemented initially.', 'info');
}

async function handleLogin() {
  // Reset errors
  errors.emailOrPhone = '';
  errors.password = '';
  errors.global = '';

  let isValid = true;

  // Validation
  if (!form.emailOrPhone.trim()) {
    errors.emailOrPhone = 'Email or Phone is required.';
    isValid = false;
  }

  if (!form.password) {
    errors.password = 'Password is required.';
    isValid = false;
  }

  if (!isValid) return;

  loading.value = true;

  const result = await authStore.login(form.emailOrPhone, form.password);
  loading.value = false;

  if (result.success) {
    toastStore.show('Login successful', 'success');
    router.push('/myaccount/dashboard');
  } else {
    if (result.errors) {
      Object.keys(result.errors).forEach((key) => {
        if (key === 'email') {
          errors.emailOrPhone = result.errors[key][0];
        } else if (errors[key] !== undefined) {
          errors[key] = result.errors[key][0];
        }
      });
    } else {
      errors.global = result.error;
    }
  }
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
