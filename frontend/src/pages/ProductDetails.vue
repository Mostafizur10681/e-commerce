<template>
  <div class="min-h-screen bg-gray-55 dark:bg-gray-950 transition-colors duration-300 pb-16">
    <!-- Sticky Purchase Bar (Desktop) -->
    <transition name="slide-down">
      <div
        v-if="showStickyBar && product"
        class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800 shadow-md py-3 transition-all duration-300 hidden md:block"
      >
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0">
            <img :src="product.image" :alt="product.name" class="w-12 h-12 object-contain bg-white rounded-lg p-0.5 border border-gray-150 dark:border-gray-850 shrink-0" />
            <div class="min-w-0">
              <h4 class="font-extrabold text-sm text-gray-900 dark:text-white truncate">{{ product.name }}</h4>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="font-black text-sm text-primary">৳{{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">৳{{ product.originalPrice }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Small Qty Selector -->
            <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-850 p-0.5 shadow-sm scale-90">
              <button
                @click="decreaseQty"
                :disabled="quantity <= 1"
                class="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                -
              </button>
              <span class="w-8 text-center font-bold text-sm text-gray-850 dark:text-white">
                {{ quantity }}
              </span>
              <button
                @click="increaseQty"
                :disabled="product.stock === 0 || quantity >= product.stock"
                class="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                +
              </button>
            </div>

            <button
              @click="addToCart"
              :disabled="product.stock === 0"
              class="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition duration-200 flex items-center gap-1.5 shadow disabled:opacity-50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="max-w-7xl mx-auto p-4 md:p-8">
      
      <!-- Loading State -->
      <ProductDetailsSkeleton v-if="loading" />

      <!-- Not Found State -->
      <div v-else-if="!product" class="flex flex-col items-center justify-center py-20 text-center">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Product Not Found</h1>
        <p class="text-gray-550 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <router-link to="/shop" class="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200">
          Back to Shop
        </router-link>
      </div>

      <!-- Product Found State -->
      <div v-else class="space-y-10">
        
        <!-- Premium Local Breadcrumb -->
        <nav aria-label="Breadcrumb" class="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-1.5 sm:gap-2">
          <router-link to="/" class="hover:text-primary transition-colors">Home</router-link>
          <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <router-link :to="`/category/${product.category}`" class="hover:text-primary transition-colors font-medium">{{ product.category }}</router-link>
          <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <span class="text-gray-800 dark:text-gray-200 font-bold truncate max-w-[200px] sm:max-w-none">{{ product.name }}</span>
        </nav>

        <!-- Product Gallery & Info Columns -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Column 1: Gallery -->
          <div class="lg:col-span-6 space-y-4">
            
            <!-- Main Product Image with Zoom on Hover -->
            <div class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-800 shadow-sm aspect-square flex items-center justify-center">
              <img
                :src="selectedImage"
                :alt="product.name"
                @mousemove="handleMouseMove"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                :style="zoomStyle"
                class="w-full h-full object-contain transition-transform duration-200"
              />
              <!-- Sale Badge -->
              <span
                v-if="product.badge"
                class="absolute top-4 left-4 px-3 py-1 text-xs font-black text-white rounded-full uppercase tracking-wider shadow"
                :class="{
                  'bg-emerald-500': product.badge === 'Organic',
                  'bg-blue-500': product.badge === 'New',
                  'bg-orange-500': product.badge === 'Best Seller',
                  'bg-yellow-500 !text-gray-900': product.badge === 'Featured',
                  'bg-red-500': product.badge === 'Sale',
                  'bg-primary': !['Organic', 'New', 'Best Seller', 'Featured', 'Sale'].includes(product.badge)
                }"
              >
                {{ product.badge }}
              </span>
            </div>

            <!-- Thumbnail Gallery -->
            <div v-if="product.images && product.images.length > 0" class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <button
                v-for="(img, idx) in product.images"
                :key="idx"
                @click="selectedImage = img"
                class="w-20 h-20 rounded-xl overflow-hidden border-2 bg-white dark:bg-gray-800 focus:outline-none transition shrink-0"
                :class="selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'"
              >
                <img :src="img" :alt="`${product.name} thumbnail ${idx + 1}`" class="w-full h-full object-contain" />
              </button>
            </div>
          </div>

          <!-- Column 2: Information Panel -->
          <div class="lg:col-span-6 space-y-6">
            
            <!-- Category & Stock status -->
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-2.5 py-1 text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-lg">
                {{ product.category }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700">
                <span class="w-2 h-2 rounded-full" :class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'"></span>
                {{ product.stock > 0 ? `In Stock` : 'Out of Stock' }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {{ product.name }}
            </h1>

            <!-- Rating Summary -->
            <div class="flex items-center gap-3">
              <div class="flex items-center text-amber-400">
                <svg v-for="n in 5" :key="n" class="w-5 h-5" :class="n <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-700'" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ product.rating }}</span>
              <span class="text-gray-300 dark:text-gray-700">|</span>
              <button @click="activeTab = 'reviews'" class="text-sm text-primary hover:underline font-bold transition-all">
                {{ reviews.length }} Customer Reviews
              </button>
            </div>

            <!-- Brand & SKU -->
            <div class="grid grid-cols-2 gap-4 py-3 border-y border-gray-200 dark:border-gray-800 text-sm">
              <div>
                <span class="text-gray-500 dark:text-gray-400">Brand:</span>
                <span class="ml-1.5 font-bold text-gray-850 dark:text-gray-200">{{ product?.brand || 'No Brand' }}</span>
              </div>
              <div>
                <span class="text-gray-500 dark:text-gray-400">SKU:</span>
                <span class="ml-1.5 font-mono font-bold text-gray-850 dark:text-gray-200">{{ product?.sku || 'N/A' }}</span>
              </div>
            </div>

            <!-- Price Block -->
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-gray-100/50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800">
              <span class="text-4xl font-black text-primary">৳{{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">৳{{ product.originalPrice }}</span>
              <span v-if="discountPercent > 0" class="px-2.5 py-1 text-xs font-black bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-300 rounded-lg">
                {{ discountPercent }}% OFF
              </span>
            </div>

            <!-- Attribute Selectors -->
            <div v-if="product.attributes && product.attributes.length > 0" class="space-y-4">
              <div
                v-for="group in groupedAttributes"
                :key="group.name"
                class="space-y-2"
              >
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ group.name }}</span>
                  <span v-if="selectedAttributes[group.name]" class="text-xs font-bold text-primary">: {{ selectedAttributes[group.name] }}</span>
                </div>
                <!-- Color swatches for 'Color' attribute -->
                <div v-if="group.name.toLowerCase() === 'color'" class="flex flex-wrap gap-2">
                  <button
                    v-for="val in group.values"
                    :key="val"
                    type="button"
                    @click="selectAttribute(group.name, val)"
                    :title="val"
                    class="w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-sm"
                    :style="{ backgroundColor: colorMap[val.toLowerCase()] || val.toLowerCase() }"
                    :class="selectedAttributes[group.name] === val
                      ? 'border-primary ring-2 ring-primary/30 scale-110'
                      : 'border-gray-200 dark:border-gray-700'"
                  ></button>
                </div>
                <!-- Pill buttons for all other attributes -->
                <div v-else class="flex flex-wrap gap-2">
                  <button
                    v-for="val in group.values"
                    :key="val"
                    type="button"
                    @click="selectAttribute(group.name, val)"
                    class="px-3.5 py-1.5 rounded-lg text-sm font-bold border-2 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
                    :class="selectedAttributes[group.name] === val
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-primary/50'"
                  >{{ val }}</button>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="space-y-2.5">
              <span class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">Select Quantity</span>
              <div class="flex items-center gap-4">
                <div class="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 p-1.5 shadow-sm">
                  <button
                    @click="decreaseQty"
                    :disabled="quantity <= 1"
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-150 dark:hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
                  </button>
                  <span class="w-14 text-center font-extrabold text-xl text-gray-850 dark:text-white" data-testid="quantity-value">
                    {{ quantity }}
                  </span>
                  <button
                    @click="increaseQty"
                    :disabled="product.stock === 0 || quantity >= product.stock"
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-150 dark:hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  </button>
                </div>
                  <span class="text-sm font-semibold text-gray-500 dark:text-gray-400" v-if="product.unit">Per {{ product.unit.replace(/^\d+\s*/, '') }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                @click="addToCart"
                :disabled="product.stock === 0"
                class="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add to Cart</span>
              </button>
              <button
                @click="buyNow"
                :disabled="product.stock === 0"
                class="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Buy Now</span>
              </button>
            </div>

            <!-- Delivery Information Cards -->
            <div class="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 shadow-sm text-sm">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🚚</span>
                <div>
                  <h5 class="font-extrabold text-gray-950 dark:text-white text-xs">Fast Delivery</h5>
                  <p class="text-[10px] text-gray-500">1–2 Days inside Dhaka</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">💵</span>
                <div>
                  <h5 class="font-extrabold text-gray-950 dark:text-white text-xs">Cash on Delivery</h5>
                  <p class="text-[10px] text-gray-500">Check package first</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">🛡</span>
                <div>
                  <h5 class="font-extrabold text-gray-950 dark:text-white text-xs">Secure Payment</h5>
                  <p class="text-[10px] text-gray-500">SSL Encrypted checkout</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">🔄</span>
                <div>
                  <h5 class="font-extrabold text-gray-950 dark:text-white text-xs">Easy Returns</h5>
                  <p class="text-[10px] text-gray-500">7-Day Refund Policy</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Description, Reviews, and Shipping Tabs -->
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-150 dark:border-gray-800 shadow-sm space-y-6">
          <div class="border-b border-gray-150 dark:border-gray-800 overflow-x-auto">
            <div class="flex gap-8 min-w-max">
              <button
                v-for="tab in ['description', 'reviews', 'shipping']"
                :key="tab"
                @click="activeTab = tab"
                class="py-4 border-b-2 text-sm font-bold capitalize transition-all focus:outline-none focus:ring-0"
                :class="activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-850 dark:hover:text-gray-200'"
              >
                <span v-if="tab === 'reviews'">Reviews ({{ reviews.length }})</span>
                <span v-else>{{ tab === 'shipping' ? 'Shipping Info' : tab }}</span>
              </button>
            </div>
          </div>

          <div>
            <!-- Tab 1: Description -->
            <div v-if="activeTab === 'description'" class="text-gray-650 dark:text-gray-300 leading-relaxed text-sm space-y-4">
              <p>{{ product.description }}</p>
              <p>FreshMart delivers premium quality grocery supplies straight to your doorstep. All our produce items are sourced carefully from verified agricultural cooperatives, ensuring you get maximum taste, nutritional value, and absolute freshness every day.</p>
              
              <!-- Specifications Table -->
              <div v-if="groupedAttributes.length > 0" class="mt-6 rounded-2xl overflow-hidden border border-gray-150 dark:border-gray-800 max-w-xl">
                <div class="bg-gray-50 dark:bg-gray-800/60 px-4 py-2.5 flex items-center gap-2 border-b border-gray-150 dark:border-gray-800">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  <span class="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specifications</span>
                </div>
                <div class="divide-y divide-gray-100 dark:divide-gray-800">
                  <div
                    v-for="group in groupedAttributes"
                    :key="group.name"
                    class="flex items-center gap-4 px-4 py-3 hover:bg-gray-50/60 dark:hover:bg-gray-800/20 transition-colors"
                  >
                    <span class="w-28 shrink-0 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ group.name }}</span>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="val in group.values"
                        :key="val"
                        class="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20"
                      >{{ val }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 2: Reviews -->
            <div v-if="activeTab === 'reviews'" class="space-y-8">
              <!-- Reviews List -->
              <div class="space-y-4">
                <h3 class="text-lg font-bold text-gray-950 dark:text-white">Customer Feedback</h3>
                <div v-if="reviews.length === 0" class="text-sm text-gray-500 dark:text-gray-400">No reviews yet. Be the first to write a review!</div>
                <div v-else class="grid gap-4">
                  <div v-for="(rev, idx) in reviews" :key="rev.date + rev.name + idx" class="p-5 bg-gray-50/50 dark:bg-gray-850/30 rounded-2xl border border-gray-150 dark:border-gray-800">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-black text-emerald-700 dark:text-emerald-300 text-sm">
                          {{ rev.name.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <h5 class="font-bold text-sm text-gray-950 dark:text-white leading-none mb-1">{{ rev.name }}</h5>
                          <div class="flex items-center text-amber-400">
                            <svg v-for="n in 5" :key="n" class="w-3.5 h-3.5" :class="n <= rev.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <span class="text-xs text-gray-400" v-if="rev.date">{{ rev.date }}</span>
                    </div>
                    <p class="mt-3 text-sm text-gray-650 dark:text-gray-300 leading-relaxed">{{ rev.comment }}</p>
                  </div>
                </div>
              </div>

              <!-- Add Review Form -->
              <div class="p-6 bg-gray-50/50 dark:bg-gray-850/30 rounded-2xl border border-gray-150 dark:border-gray-800">
                <h4 class="font-bold text-base text-gray-950 dark:text-white mb-4">Write a Product Review</h4>
                
                <div v-if="!isAuthenticated" class="text-center py-6">
                  <p class="text-gray-600 dark:text-gray-400 mb-4 font-semibold text-sm">
                    You must be logged in to post a review for this product.
                  </p>
                  <button
                    @click="redirectToLogin"
                    class="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-sm hover:shadow active:scale-98 transition duration-200 focus:outline-none"
                  >
                    Login to Review
                  </button>
                </div>
                
                <form v-else @submit.prevent="submitReview" class="space-y-4">
                  <div>
                    <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Your Rating</label>
                    <div class="flex items-center gap-1">
                      <button
                        v-for="n in 5"
                        :key="n"
                        type="button"
                        @click="newReview.rating = n"
                        @mouseenter="hoverRating = n"
                        @mouseleave="hoverRating = 0"
                        class="text-gray-300 hover:scale-110 active:scale-95 transition focus:outline-none"
                        :class="(hoverRating ? n <= hoverRating : n <= newReview.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-700'"
                      >
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </button>
                      <span class="ml-3 text-sm font-semibold text-gray-500" v-if="newReview.rating > 0">
                        {{ newReview.rating }} / 5 Stars
                      </span>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Name</label>
                      <input
                        v-model="newReview.name"
                        type="text"
                        placeholder="Your Name"
                        disabled
                        class="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none transition-all cursor-not-allowed opacity-75"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Feedback Comment</label>
                    <textarea
                      v-model="newReview.comment"
                      rows="3"
                      placeholder="Share your experience with this item..."
                      required
                      class="w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-sm hover:shadow active:scale-98 transition duration-200 focus:outline-none"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>

            <!-- Tab 3: Shipping -->
            <div v-if="activeTab === 'shipping'" class="text-sm text-gray-650 dark:text-gray-300 leading-relaxed space-y-4">
              <h4 class="font-extrabold text-base text-gray-950 dark:text-white">Delivery Locations & Fee Structures</h4>
              <p>We pack and deliver goods nationwide across all districts and major divisions of Bangladesh. Review pricing and estimated timelines below:</p>
              <ul class="list-disc pl-5 space-y-1.5 font-medium">
                <li><strong>Dhaka City (Inside):</strong> 1–2 Business Days (60 BDT)</li>
                <li><strong>Outside Dhaka Divisions:</strong> 2–5 Business Days (120 BDT)</li>
                <li><strong>Remote & Countryside Zones:</strong> 3–7 Business Days (150 BDT)</li>
              </ul>
              <p class="text-xs text-amber-600 dark:text-amber-400 font-semibold">Important notice: Processing timelines are subject to temporary extensions during national holidays, weather disruptions, or civic transport anomalies.</p>
            </div>
          </div>
        </div>

        <!-- Section 11: Trust Badges strip -->
        <div class="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6 border-t border-b border-gray-200/50 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider uppercase">
          <span class="flex items-center gap-1.5">
            <span class="text-primary text-base">✔</span> 100% Authentic Product
          </span>
          <span class="flex items-center gap-1.5">
            <span class="text-primary text-base">✔</span> Secure Checkout
          </span>
          <span class="flex items-center gap-1.5">
            <span class="text-primary text-base">✔</span> Fast Delivery
          </span>
          <span class="flex items-center gap-1.5">
            <span class="text-primary text-base">✔</span> Easy Return
          </span>
        </div>

        <!-- Section 9: Related Products -->
        <section class="space-y-6 pt-4">
          <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">You May Also Like</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard
              v-for="rel in relatedProducts"
              :key="rel.id"
              :product="rel"
              @addToCart="cartStore.addToCart(rel)"
            />
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton.vue';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
import { useReviewStore } from '../stores/reviewStore';
import { useToastStore } from '../stores/toastStore';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();
const cartStore = useCartStore();
const reviewStore = useReviewStore();
const toast = useToastStore();
const authStore = useAuthStore();

const product = ref(null);
const reviews = ref([]);
const loading = ref(true);

const isAuthenticated = computed(() => authStore.currentUser !== null);

const newReview = ref({
  name: authStore.currentUser ? authStore.currentUser.name : '',
  rating: 0,
  comment: ''
});

watch(() => authStore.currentUser, (newVal) => {
  if (newVal) {
    newReview.value.name = newVal.name;
  } else {
    newReview.value.name = '';
  }
}, { immediate: true });

const hoverRating = ref(0);

const selectedImage = ref('');
const quantity = ref(1);
const activeTab = ref('description');

// Attribute selection state
const selectedAttributes = ref({});

// Color name → CSS color mapping
const colorMap = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#eab308',
  orange: '#f97316', purple: '#a855f7', pink: '#ec4899', black: '#111827',
  white: '#f9fafb', gray: '#6b7280', grey: '#6b7280', brown: '#92400e',
  navy: '#1e3a5f', teal: '#14b8a6', cyan: '#06b6d4', indigo: '#6366f1',
  lime: '#84cc16', emerald: '#10b981', violet: '#7c3aed', rose: '#f43f5e',
};

// Group attributes: [{ name: 'Color', values: ['Blue','Red'] }, { name: 'Size', values: ['S','M','L'] }]
const groupedAttributes = computed(() => {
  if (!product.value || !product.value.attributes) return [];
  const map = {};
  for (const attr of product.value.attributes) {
    if (!map[attr.name]) map[attr.name] = [];
    if (!map[attr.name].includes(attr.value)) {
      map[attr.name].push(attr.value);
    }
  }
  return Object.entries(map).map(([name, values]) => ({ name, values }));
});

function selectAttribute(name, value) {
  selectedAttributes.value = { ...selectedAttributes.value, [name]: value };
}

function resetAttributes() {
  selectedAttributes.value = {};
}

// Interactive zoom coordinates
const activeZoom = ref(false);
const zoomStyle = ref({});

function handleMouseMove(e) {
  const { left, top, width, height } = e.target.getBoundingClientRect();
  const x = ((e.pageX - left - window.scrollX) / width) * 100;
  const y = ((e.pageY - top - window.scrollY) / height) * 100;
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(1.8)'
  };
}

function handleMouseEnter() {
  activeZoom.value = true;
}

function handleMouseLeave() {
  activeZoom.value = false;
  zoomStyle.value = { transform: 'scale(1)', transformOrigin: 'center' };
}

// Sticky purchase bar on scroll
const showStickyBar = ref(false);

function handleScroll() {
  showStickyBar.value = window.scrollY > 500;
}



// Computed Discount percent
const discountPercent = computed(() => {
  if (!product.value || !product.value.originalPrice) return 0;
  return Math.round(((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100);
});

// Computed Related Products
const relatedProducts = computed(() => {
  if (!product.value) return [];
  return productStore.products.filter(
    p => p.category === product.value.category && p.id !== product.value.id
  ).slice(0, 4);
});

// Load single product data helper
async function loadProduct(id) {
  loading.value = true;
  try {
    const response = await api.get(`/v1/products/${id}`);
    if (response.data && response.data.success && response.data.data) {
      const p = response.data.data;
      product.value = {
        id: p.id,
        name: p.name,
        category: p.category ? p.category.name : 'Uncategorized',
        price: p.sale_price ? parseFloat(p.sale_price) : parseFloat(p.price),
        originalPrice: p.sale_price ? parseFloat(p.price) : null,
        // Determine unit: use explicit unit field, or fallback to attribute named 'unit', else default to '1 kg'
        unit: p.unit || (p.attributes?.find(attr => attr.name.toLowerCase() === 'unit')?.value) || '1 kg',
        image: p.image || 'https://picsum.photos/seed/placeholder/400/400',
        images: p.images && p.images.length ? p.images : [p.image || 'https://picsum.photos/seed/placeholder/400/400'],
        rating: p.rating ? parseFloat(p.rating) : 5.0,
        badge: p.featured ? 'Featured' : (p.best_seller ? 'Best Seller' : (p.organic ? 'Organic' : (p.new_arrival ? 'New' : (p.sale_price ? 'Sale' : null)))),
        description: p.description,
        stock: p.stock,
        attributes: p.attributes || [],
        brand: p.brand || 'No Brand',
        sku: p.SKU || ''
      };
      selectedImage.value = product.value.images?.[0] || product.value.image;
    } else {
      fallbackProduct(id);
    }
  } catch (error) {
    console.error('Failed to load product from API, using fallback:', error);
    fallbackProduct(id);
  } finally {
    try {
      await reviewStore.fetchReviews(id);
      reviews.value = reviewStore.getReviews(id);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
    loading.value = false;
  }
  quantity.value = 1;
  activeTab.value = 'description';
  resetAttributes();
}

function fallbackProduct(id) {
  product.value = productStore.getProductById(id);
  if (product.value) {
    selectedImage.value = product.value.images?.[0] || product.value.image;
  }
}

// Watch route changes (such as clicking related products)
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadProduct(Number(newId));
  }
});

onMounted(() => {
  const productId = Number(route.params.id);
  loadProduct(productId);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function increaseQty() {
  if (quantity.value < product.value.stock) {
    quantity.value++;
  }
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  if (!product.value) return;
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value, selectedAttributes.value);
  }
  toast.show(`${quantity.value} item(s) added to cart`);
  quantity.value = 1;
}

function buyNow() {
  if (!product.value) return;
  cartStore.addToCart(product.value, selectedAttributes.value);
  toast.show('Product added to cart');
  router.push({ name: 'Checkout' });
}

function redirectToLogin() {
  router.push({ name: 'Login', query: { redirect: route.fullPath } });
}

async function submitReview() {
  const currentId = Number(route.params.id);
  if (!newReview.value.rating) {
    toast.show('Please select a rating');
    return;
  }
  if (!newReview.value.comment) return;
  
  const res = await reviewStore.addReview(currentId, {
    rating: newReview.value.rating,
    comment: newReview.value.comment
  });
  
  if (res.success) {
    reviews.value = reviewStore.getReviews(currentId);
    toast.show('Review submitted successfully');
    newReview.value = {
      name: authStore.currentUser ? authStore.currentUser.name : '',
      rating: 0,
      comment: ''
    };
  } else {
    toast.show(res.error || 'Failed to submit review');
  }
}
</script>

<style scoped>
/* Fade effect for details loading */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Sliding down animation for sticky bar */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
