<template>
  <MainLayout />
</template>

<script setup>
import { onMounted } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import { useProductStore } from './stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>
