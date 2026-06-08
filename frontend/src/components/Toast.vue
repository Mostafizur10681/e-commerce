<template>
  <div class="fixed top-20 right-4 md:top-28 z-[9999] flex flex-col gap-2 pointer-events-none">
    <transition-group name="toast">
      <div v-for="toast in toastStore.toasts" :key="toast.id"
        class="pointer-events-auto flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium min-w-[250px]"
        :class="{
          'bg-green-600': toast.type === 'success',
          'bg-red-600': toast.type === 'error',
          'bg-blue-600': toast.type === 'info'
        }">
        <span>{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore';

const toastStore = useToastStore();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
