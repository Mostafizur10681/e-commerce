<template>
  <div>
    <Header />
    <AppBreadcrumb />
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
import AppBreadcrumb from '../components/common/AppBreadcrumb.vue';
</script>
