// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Shop from '../pages/Shop.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';

import MyAccountLayout from '../layouts/MyAccountLayout.vue';
import Dashboard from '../views/myaccount/Dashboard.vue';
import Orders from '../views/myaccount/Orders.vue';
import Wishlist from '../views/myaccount/Wishlist.vue';
import Address from '../views/myaccount/Address.vue';
import Profile from '../views/myaccount/Profile.vue';
import DeleteProfile from '../views/myaccount/DeleteProfile.vue';

import { useAuthStore } from '../stores/authStore';

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
  { path: '/shipping-info', name: 'ShippingInfo', component: () => import('../views/ShippingInfoPage.vue'), meta: { breadcrumb: 'Shipping Information' } },
  { path: '/returns-refunds', name: 'ReturnsRefunds', component: () => import('../views/ReturnsRefundsPage.vue'), meta: { breadcrumb: 'Returns & Refunds' } },
  { path: '/payment-methods', name: 'PaymentMethods', component: () => import('../views/PaymentMethodsPage.vue'), meta: { breadcrumb: 'Payment Methods' } },
  { path: '/login', name: 'Login', component: LoginPage, meta: { breadcrumb: 'Login' } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { breadcrumb: 'Register' } },
  
  {
    path: '/myaccount',
    component: MyAccountLayout,
    redirect: '/myaccount/dashboard',
    children: [
      { path: 'dashboard', name: 'MyAccountDashboard', component: Dashboard },
      { path: 'orders', name: 'MyAccountOrders', component: Orders },
      { path: 'wishlist', name: 'MyAccountWishlist', component: Wishlist },
      { path: 'address', name: 'MyAccountAddress', component: Address },
      { path: 'profile', name: 'MyAccountProfile', component: Profile },
      { path: 'delete-profile', name: 'MyAccountDeleteProfile', component: DeleteProfile }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.currentUser !== null;

  if (to.path.startsWith('/myaccount')) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

