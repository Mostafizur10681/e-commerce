<template>
  <div class="space-y-10 animate-pulse">
    <!-- Premium Local Breadcrumb Shimmer -->
    <nav class="flex items-center gap-2 text-xs sm:text-sm">
      <div class="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      <div class="h-3 w-3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      <div class="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      <div class="h-3 w-3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      <div class="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
    </nav>

    <!-- Product Gallery & Info Columns -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      <!-- Column 1: Gallery Shimmer -->
      <div class="lg:col-span-6 space-y-4">
        <!-- Main Product Image -->
        <div class="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center p-4 border border-gray-150 dark:border-gray-800 shadow-sm">
          <div class="w-full h-full bg-gray-200/60 dark:bg-gray-700/60 rounded-xl"></div>
        </div>

        <!-- Thumbnail Gallery Shimmer -->
        <div class="flex gap-3">
          <div
            v-for="idx in 4"
            :key="idx"
            class="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-150 dark:border-gray-800"
          ></div>
        </div>
      </div>

      <!-- Column 2: Information Panel Shimmer -->
      <div class="lg:col-span-6 space-y-6">
        
        <!-- Category & Stock status Shimmers -->
        <div class="flex items-center gap-3">
          <div class="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div class="h-6 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>

        <!-- Title Shimmer -->
        <div class="space-y-2">
          <div class="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div class="h-8 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>

        <!-- Rating Summary Shimmer -->
        <div class="flex items-center gap-3">
          <div class="flex gap-0.5">
            <div v-for="n in 5" :key="n" class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div class="h-4 w-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div class="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded-md text-gray-300 dark:text-gray-750">|</div>
          <div class="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>

        <!-- Brand & SKU Shimmer -->
        <div class="grid grid-cols-2 gap-4 py-3 border-y border-gray-200 dark:border-gray-800">
          <div class="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div class="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>

        <!-- Price Block Shimmer -->
        <div class="h-20 w-full bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 border border-gray-150 dark:border-gray-800 flex items-center gap-4">
          <div class="h-8 w-24 bg-gray-200/90 dark:bg-gray-800 rounded-md"></div>
          <div class="h-5 w-16 bg-gray-200/50 dark:bg-gray-800/50 rounded-md"></div>
          <div class="h-6 w-16 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg"></div>
        </div>

        <!-- Quantity Selector Shimmer -->
        <div class="space-y-2.5">
          <div class="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div class="flex items-center gap-4">
            <div class="h-12 w-36 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            <div class="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          </div>
        </div>

        <!-- Action Buttons Shimmer -->
        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <div class="h-14 flex-1 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div class="h-14 flex-1 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        </div>

        <!-- Delivery Information Cards Shimmer -->
        <div class="grid grid-cols-2 gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl">
          <div v-for="i in 4" :key="i" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>
            <div class="space-y-1.5 flex-grow">
              <div class="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div class="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Pure presentation component, no props or methods required
</script>

<style scoped>
</style>
