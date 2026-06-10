// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Shop from '../pages/Shop.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/about', name: 'About', component: About },
  { path: '/product/:id', name: 'ProductDetails', component: () => import('../pages/ProductDetails.vue') },
  { path: '/category/:categoryName', name: 'CategoryProducts', component: () => import('../pages/CategoryProductsPage.vue') },
  { path: '/cart', name: 'Cart', component: () => import('../pages/Cart.vue') },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/faq', name: 'FAQ', component: () => import('../pages/FaqPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
