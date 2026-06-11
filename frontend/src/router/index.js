// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Shop from '../pages/Shop.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { breadcrumb: 'Home' } },
  { path: '/shop', name: 'Shop', component: Shop, meta: { breadcrumb: 'Shop' } },
  { path: '/about', name: 'About', component: About, meta: { breadcrumb: 'About Us' } },
  { path: '/product/:id', name: 'ProductDetails', component: () => import('../pages/ProductDetails.vue'), meta: { breadcrumb: '' } },
  { path: '/category/:categoryName', name: 'CategoryProducts', component: () => import('../pages/CategoryProductsPage.vue'), meta: { breadcrumb: '' } },
  { path: '/cart', name: 'Cart', component: () => import('../pages/Cart.vue'), meta: { breadcrumb: 'Cart' } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { breadcrumb: 'Contact Us' } },
  { path: '/checkout', name: 'Checkout', component: () => import('../pages/CheckoutPage.vue'), meta: { breadcrumb: 'Checkout' } },
  { path: '/faq', name: 'FAQ', component: () => import('../pages/FaqPage.vue'), meta: { breadcrumb: 'FAQ' } },
  { path: '/track-order', name: 'TrackOrder', component: () => import('../pages/TrackOrder.vue'), meta: { breadcrumb: 'Track Order' } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

