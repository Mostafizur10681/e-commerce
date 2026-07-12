<template>
  <div
    class="card relative flex flex-col justify-between overflow-hidden bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl shadow-sm transition-all duration-300 select-none animate-pulse"
  >
    <!-- Card Top: Image Shimmer -->
    <div class="relative overflow-hidden aspect-square bg-gray-50 dark:bg-gray-955/50 flex items-center justify-center p-2">
      <!-- Dummy image block -->
      <div class="w-full h-full bg-gray-200/70 dark:bg-gray-800/70 rounded-2xl"></div>
      
      <!-- Dummy wishlist button -->
      <div class="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl bg-gray-200/90 dark:bg-gray-700/90 shadow-sm"></div>
    </div>

    <!-- Card Bottom: Information Shimmer -->
    <div class="p-4 flex-grow flex flex-col justify-between gap-3 bg-white dark:bg-gray-900 transition-colors">
      <div class="space-y-2">
        <!-- Category shimmer -->
        <div class="h-3 w-16 bg-gray-200/80 dark:bg-gray-800/50 rounded-md"></div>
        <!-- Name shimmer -->
        <div class="h-4 w-5/6 bg-gray-200/80 dark:bg-gray-800/50 rounded-md"></div>
        
        <!-- Rating stars shimmer -->
        <div class="flex items-center gap-1.5 pt-0.5">
          <div class="flex gap-0.5">
            <div v-for="n in 5" :key="n" class="w-3.5 h-3.5 rounded-full bg-gray-200/70 dark:bg-gray-800/75"></div>
          </div>
          <div class="h-3 w-6 bg-gray-200/70 dark:bg-gray-800/75 rounded-md"></div>
        </div>
      </div>

      <!-- Pricing and Cart Action Shimmer -->
      <div class="flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800/80 pt-3">
        <div class="min-w-0 space-y-1.5 flex-grow">
          <div class="flex items-baseline gap-1.5">
            <!-- Price shimmer -->
            <div class="h-5 w-16 bg-gray-200/90 dark:bg-gray-800 rounded-md"></div>
            <!-- Original price shimmer -->
            <div class="h-4 w-10 bg-gray-100 dark:bg-gray-800/40 rounded-md"></div>
          </div>
          <!-- Unit shimmer -->
          <div class="h-3 w-12 bg-gray-200/70 dark:bg-gray-800/40 rounded-md"></div>
        </div>

        <!-- Add Button shimmer -->
        <div class="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pure presentation component, no props or methods required
</script>

<style scoped>
</style>
