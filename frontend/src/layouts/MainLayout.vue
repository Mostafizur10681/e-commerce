<template>
  <div>
    <Header />
    <router-view />
    <Footer />
    <Toast />
    <CartDrawer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Toast from '../components/Toast.vue';
import CartDrawer from '../components/CartDrawer.vue';
</script>
