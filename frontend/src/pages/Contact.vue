<template>
  <section class="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-12">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark mb-8 text-center">Contact Us</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Left: Contact Image -->
      <div class="relative rounded-xl overflow-hidden shadow-lg group">
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
             alt="Customer support"
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <div class="text-white text-lg font-semibold">
            Need Help?<br />
            We're here to assist you.<br />
            Contact us anytime.
          </div>
        </div>
      </div>

      <!-- Right: Contact Form -->
      <form @submit.prevent="sendMessage" class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input v-model="form.fullName" id="fullName" type="text" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
          <p v-if="errors.fullName" class="text-red-600 text-sm mt-1">{{ errors.fullName }}</p>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input v-model="form.email" id="email" type="email" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <input v-model="form.phone" id="phone" type="tel" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
          <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
        </div>
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <input v-model="form.subject" id="subject" type="text" required
                 class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 px-3 py-2" />
          <p v-if="errors.subject" class="text-red-600 text-sm mt-1">{{ errors.subject }}</p>
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
          <textarea v-model="form.message" id="message" rows="4" required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 px-3 py-2"></textarea>
          <p v-if="errors.message" class="text-red-600 text-sm mt-1">{{ errors.message }}</p>
        </div>
        <button type="submit" :disabled="isSubmitting"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else>Sending…</span>
        </button>
      </form>
    </div>

    <!-- Optional Recent Messages -->
    <section v-if="recentMessages.length" class="mt-12">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-dark mb-4">Recent Messages</h2>
      <ul class="space-y-3">
        <li v-for="msg in recentMessages" :key="msg.createdAt" class="bg-white dark:bg-gray-800 rounded-md p-4 shadow">
          <p class="font-medium text-gray-900 dark:text-gray-100">{{ msg.name }} – {{ msg.subject }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ new Date(msg.createdAt).toLocaleString() }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useToastStore } from '@/stores/toastStore';

const toast = useToastStore();

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const errors = ref({});
const isSubmitting = ref(false);
const recentMessages = ref([]);

const validate = () => {
  const newErrors = {};
  if (!form.value.fullName) newErrors.fullName = 'Full name is required.';
  if (!form.value.email) {
    newErrors.email = 'Email address is required.';
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }
  if (!form.value.phone) newErrors.phone = 'Phone number is required.';
  if (!form.value.subject) newErrors.subject = 'Subject is required.';
  if (!form.value.message) newErrors.message = 'Message is required.';
  else if (form.value.message.length < 10) newErrors.message = 'Message must be at least 10 characters.';

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const loadRecent = () => {
  const stored = localStorage.getItem('contactMessages');
  if (stored) {
    try {
      const arr = JSON.parse(stored);
      recentMessages.value = arr.slice(-5).reverse();
    } catch (e) {
      console.error('Failed to parse contactMessages', e);
    }
  }
};

loadRecent();

const sendMessage = async () => {
  if (!validate()) return;
  isSubmitting.value = true;

  const message = {
    name: form.value.fullName,
    email: form.value.email,
    phone: form.value.phone,
    subject: form.value.subject,
    message: form.value.message,
    createdAt: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  existing.push(message);
  localStorage.setItem('contactMessages', JSON.stringify(existing));

  toast.show('Message sent successfully');

  // Reset form
  form.value = { fullName: '', email: '', phone: '', subject: '', message: '' };
  errors.value = {};
  loadRecent();
  isSubmitting.value = false;
};
</script>

<style scoped>
section, form, aside {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(12px);
}
</style>
