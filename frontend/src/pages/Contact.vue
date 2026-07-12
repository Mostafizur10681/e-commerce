<template>
  <!-- Page wrapper -->
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto">

      <!-- Page Heading -->
      <div class="text-center mb-12">
        <h1 class="section-title">Contact Us</h1>
        <p class="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Have a question, feedback, or need support? Fill out the form and our team will get back to you shortly.
        </p>
      </div>

      <!-- Two-column grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

        <!-- ==============================
             LEFT: Hero Image + Info Card
             ============================= -->
        <div class="flex flex-col gap-6">
          <!-- Hero image card -->
          <div class="relative rounded-2xl overflow-hidden shadow-xl group h-72 sm:h-80 lg:h-96 cursor-default">
            <img
              :src="settings.support_image || contactHero"
              alt="Customer Support"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <!-- Overlay text -->
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 class="text-2xl font-bold leading-tight mb-1">{{ settings.support_title }}</h2>
              <p class="text-sm text-gray-200 leading-relaxed">
                {{ settings.support_desc }}
              </p>
              <a
                :href="'tel:' + settings.support_phone"
                class="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <!-- Phone icon -->
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Call Support
              </a>
            </div>
          </div>

          <!-- Contact Information Card -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Contact Information</h3>
            <ul class="space-y-4 text-sm">
              <!-- Phone -->
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Phone</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ settings.phone }}</p>
                </div>
              </li>
              <!-- Email -->
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Email</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ settings.email }}</p>
                </div>
              </li>
              <!-- Address -->
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Address</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ settings.address }}</p>
                </div>
              </li>
              <!-- Business Hours -->
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Business Hours</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ settings.business_hours_weekday }}</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ settings.business_hours_weekend }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- ==============================
             RIGHT: Contact Form Card
             ============================== -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors duration-300">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

          <form @submit.prevent="sendMessage" class="space-y-5">

            <!-- Full Name -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.fullName"
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-55 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
              <p v-if="errors.fullName" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.fullName }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-55 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
              <p v-if="errors.email" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Phone Number -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phone"
                id="phone"
                type="text"
                placeholder="+880 1700-000000"
                required
                class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-55 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
              <p v-if="errors.phone" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.phone }}
              </p>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Subject <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.subject"
                id="subject"
                type="text"
                placeholder="How can we help you?"
                required
                class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-55 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
              <p v-if="errors.subject" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.subject }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.message"
                id="message"
                rows="5"
                required
                placeholder="Describe your question or issue in detail…"
                class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-55 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 resize-none"
              />
              <p v-if="errors.message" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <template v-if="!isSubmitting">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                Send Message
              </template>
              <template v-else>
                <!-- Spinner -->
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Sending…
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToastStore } from '@/stores/toastStore';
import api from '@/services/api';
import contactHero from '@/assets/contact-hero.png';

const toast = useToastStore();

const settings = ref({
  phone: '+880 1700-000000',
  email: 'support@freshmart.com',
  address: '42 Green Lane, Dhaka 1212, Bangladesh',
  business_hours_weekday: 'Mon – Sat: 9:00 AM – 8:00 PM',
  business_hours_weekend: 'Sunday: 11:00 AM – 5:00 PM',
  support_title: 'Need Help?',
  support_desc: 'Our support team is always ready to assist you.',
  support_phone: '+8801700000000',
  support_image: ''
});

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const errors = ref({});
const isSubmitting = ref(false);

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

const fetchSettings = async () => {
  try {
    const res = await api.get('/v1/contact-settings');
    if (res.data && res.data.success && res.data.data) {
      settings.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to load contact settings:', err);
  }
};

onMounted(() => {
  fetchSettings();
});

const sendMessage = async () => {
  if (!validate()) return;
  isSubmitting.value = true;

  const message = {
    name: form.value.fullName,
    email: form.value.email,
    phone: form.value.phone,
    subject: form.value.subject,
    message: form.value.message,
  };

  try {
    const res = await api.post('/v1/messages', message);
    if (res.data && res.data.success) {
      toast.show('Message sent successfully');
      form.value = { fullName: '', email: '', phone: '', subject: '', message: '' };
      errors.value = {};
    } else {
      toast.show('Failed to submit message. Please try again.');
    }
  } catch (err) {
    console.error('Contact message submit error:', err);
    toast.show('Failed to send message. Please check your network connection.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Styles */
</style>
