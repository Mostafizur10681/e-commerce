<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8">
    
    <!-- Not Found State -->
    <div v-if="!product" class="flex flex-col items-center justify-center py-20 text-center">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Product Not Found</h1>
      <p class="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <router-link to="/shop" class="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg shadow-md transition-all duration-200">
        Back to Shop
      </router-link>
    </div>

    <!-- Product Found State -->
    <div v-else>
      <transition appear name="fade">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Image Gallery -->
          <div class="flex flex-col space-y-4">
            <!-- Main Image -->
            <div class="relative">
              <img :src="selectedImage" :alt="product.name" class="w-full h-auto rounded-lg shadow-sm transition-opacity duration-300" />
            </div>
            <!-- Thumbnails -->
            <div class="flex space-x-2 overflow-x-auto">
              <template v-for="(img, idx) in product.images" :key="idx">
                <img :src="img" @click="selectedImage = img" class="w-16 h-16 object-cover rounded cursor-pointer transition-transform duration-200"
                  :class="{'ring-2 ring-primary': selectedImage === img}" />
              </template>
            </div>
          </div>
          <!-- Details -->
          <div class="flex flex-col space-y-4">
            <h1 class="text-3xl font-bold">{{ product.name }}</h1>
            <p class="text-xl text-primary font-semibold">৳{{ product.price }}</p>
            <p class="text-gray-600 dark:text-gray-300">{{ product.description }}</p>
            <p class="text-sm" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
              <span v-if="product.stock > 0">In stock ({{ product.stock }})</span>
              <span v-else>Out of stock</span>
            </p>
            <!-- Rating -->
            <div class="flex items-center space-x-1">
              <svg v-for="n in 5" :key="n" class="w-5 h-5"
                :class="n <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
                fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span class="text-sm text-gray-500 dark:text-gray-400">({{ product.rating }})</span>
            </div>
            <!-- Quantity Controller -->
            <div class="flex items-center space-x-2">
              <button @click="decreaseQty" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded" :disabled="quantity <= 1">-</button>
              <span class="px-4 py-1 border rounded" data-testid="quantity-value">{{ quantity }}</span>
              <button @click="increaseQty" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded" :disabled="product.stock === 0">+</button>
            </div>
            <!-- Action Buttons -->
            <div class="flex space-x-4">
              <button @click="addToCart" class="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                :disabled="product.stock === 0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                Add to Cart
              </button>
              <button @click="buyNow" class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Reviews section -->
      <section class="mt-12 overflow-hidden">
        <h2 class="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div v-if="reviews.length === 0" class="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</div>
        
        <transition-group appear name="slide-up" tag="ul" class="space-y-4">
          <li v-for="(rev, idx) in reviews" :key="rev.date + rev.name + idx" class="border-b dark:border-gray-800 pb-4 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-lg">
            <div class="flex items-center justify-between">
              <span class="font-bold text-gray-800 dark:text-gray-200">{{ rev.name }}</span>
              <p class="text-xs text-gray-500 dark:text-gray-400" v-if="rev.date">{{ rev.date }}</p>
            </div>
            <div class="flex items-center my-1">
              <svg v-for="n in 5" :key="n" class="w-4 h-4"
                :class="n <= rev.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
                fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mt-2">{{ rev.comment }}</p>
          </li>
        </transition-group>

        <!-- Review form -->
        <div class="mt-10 bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-medium mb-4">Add a Review</h3>
          <form @submit.prevent="submitReview" class="grid gap-4  transition-all duration-300">
            <div>
              <input v-model="newReview.name" type="text" placeholder="Your Name" required class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
            <div>
              <div class="flex items-center space-x-1 mb-2">
                <svg v-for="n in 5" :key="n"
                  @click="newReview.rating = n"
                  @mouseenter="hoverRating = n"
                  @mouseleave="hoverRating = 0"
                  class="w-8 h-8 cursor-pointer transition-colors duration-200"
                  :class="(hoverRating ? n <= hoverRating : n <= newReview.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400" v-if="newReview.rating > 0">
                Selected Rating: {{ newReview.rating }}/5
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400" v-else>
                Selected Rating: 0/5
              </div>
            </div>
            <div>
              <textarea v-model="newReview.comment" rows="3" placeholder="Your comment" required class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none transition-all"></textarea>
            </div>
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg w-max font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              Submit Review
            </button>
          </form>
        </div>
      </section>
        <!-- Related Products Section -->
        <section class="mt-12">
          <h2 class="text-2xl font-semibold mb-4">Related Products</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard v-for="rel in relatedProducts" :key="rel.id" :product="rel" @addToCart="cartStore.addToCart(rel)" />
          </div>
        </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
import { useReviewStore } from '../stores/reviewStore';
import { useToastStore } from '../stores/toastStore';

const route = useRoute();
const router = useRouter();
const productId = Number(route.params.id);

const productStore = useProductStore();
const cartStore = useCartStore();
const reviewStore = useReviewStore();
const toast = useToastStore();

const product = ref(null);
const reviews = ref([]);

const newReview = ref({ name: '', rating: 0, comment: '' });
const hoverRating = ref(0);

const selectedImage = ref('');
const quantity = ref(1);

const relatedProducts = computed(() => {
  return productStore.products.filter(p => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 4);
});

onMounted(() => {
  product.value = productStore.getProductById(productId);
  reviews.value = reviewStore.getReviews(productId);
  // Initialize gallery and quantity
  if (product.value) {
    selectedImage.value = product.value.images?.[0] || product.value.image;
  }
  // Initialize related products computed (no runtime code needed here)
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
    cartStore.addToCart(product.value);
  }
  toast.show(`${quantity.value} item(s) added to cart`);
  // Reset quantity to 1 after adding
  quantity.value = 1;
}

function buyNow() {
  // Add product to cart and navigate to checkout
  cartStore.addToCart(product.value);
  toast.show('Product added to cart');
  router.push({ name: 'Checkout' });
}

function submitReview() {
  if (!newReview.value.rating) {
    toast.show('Please select a rating');
    return;
  }
  if (!newReview.value.name || !newReview.value.comment) return;
  const rev = { ...newReview.value, date: new Date().toLocaleDateString() };
  reviewStore.addReview(productId, rev);
  reviews.value = reviewStore.getReviews(productId);
  toast.show('Review submitted successfully');
  newReview.value = { name: '', rating: 0, comment: '' };
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
