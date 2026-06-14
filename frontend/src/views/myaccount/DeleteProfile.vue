<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-950/30 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div class="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
        <h2 class="text-xl font-bold text-red-650 flex items-center gap-2">
          <span>⚠️</span> Danger Zone: Delete Account
        </h2>
        <p class="text-xs text-gray-500 mt-1">Permanently remove your personal account profile from FreshMart.</p>
      </div>

      <!-- Warning card -->
      <div class="bg-red-50/60 dark:bg-red-950/10 border border-red-200 dark:border-red-900/35 rounded-2xl p-5 mb-6 space-y-3">
        <h3 class="text-sm font-extrabold text-red-700 dark:text-red-400">Important Warning Regarding Account Deletion</h3>
        <p class="text-sm text-red-650 dark:text-red-300/80 leading-relaxed">
          Deleting your profile is <strong>permanent</strong> and cannot be undone. All your history will be wiped out instantly:
        </p>
        <ul class="list-disc pl-5 text-xs text-red-600 dark:text-red-400 space-y-1.5 font-medium">
          <li>Your profile detail records (Name, Email, and Phone Number) will be removed.</li>
          <li>All saved shipping/billing addresses will be deleted.</li>
          <li>Your wishlist liked items registry will be wiped.</li>
          <li>You will no longer be able to track your active orders or see your past order histories.</li>
        </ul>
      </div>

      <!-- Submit button -->
      <div class="pt-2">
        <button
          @click="isConfirmOpen = true"
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-600/10 transition-all duration-300 text-sm flex items-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete My Account
        </button>
      </div>
    </div>

    <!-- ══════════════════════════════════
         CONFIRMATION DIALOG MODAL
         ══════════════════════════════════ -->
    <Transition name="confirm-fade">
      <div v-if="isConfirmOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div @click="isConfirmOpen = false" class="fixed inset-0 bg-gray-950/65 backdrop-blur-sm"></div>

        <!-- Dialog Box -->
        <div class="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl z-10 border border-gray-150 dark:border-gray-800 p-6 sm:p-8 text-center transition-all duration-300 animate-scale-up">
          <!-- Warning Icon -->
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-4 animate-bounce">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 class="text-lg font-black text-gray-950 dark:text-white mb-2">Are you absolutely sure?</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            This action cannot be undone. This will permanently delete your account profile, order tracking access, addresses, and wishlist history.
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              @click="isConfirmOpen = false"
              class="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-sm transition"
            >
              No, Keep Account
            </button>
            <button
              @click="confirmDeletion"
              class="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-red-600/10 flex items-center justify-center gap-1.5"
            >
              Yes, Delete Account
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';

const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const isConfirmOpen = ref(false);

function confirmDeletion() {
  isConfirmOpen.value = false;
  
  const result = authStore.deleteProfile();
  if (result.success) {
    toastStore.show('Your account has been deleted permanently.', 'success');
    router.push('/');
  } else {
    toastStore.show(result.error || 'Failed to delete account.', 'error');
  }
}
</script>

<style scoped>
.text-red-650 {
  color: #e53e3e;
}
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.3s ease;
}
.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}
</style>
