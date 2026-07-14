<template>
  <MainLayout />
</template>

<script setup>
import { onMounted } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import { useProductStore } from './stores/productStore';
import { useWishlistStore } from './stores/wishlistStore';

const productStore = useProductStore();
const wishlistStore = useWishlistStore();

onMounted(() => {
  productStore.fetchProducts();
  wishlistStore.loadWishlist();
});
</script>
