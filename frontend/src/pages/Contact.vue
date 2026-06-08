<template>
  <section class="max-w-4xl mx-auto py-12 px-4 text-center">
    <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">We would love to hear from you. Reach out via the form below.</p>
    <form class="grid gap-4 max-w-md mx-auto" @submit.prevent="submit">
      <input type="text" placeholder="Name" class="p-2 border rounded bg-white dark:bg-gray-800" required />
      <input type="email" placeholder="Email" class="p-2 border rounded bg-white dark:bg-gray-800" required />
      <textarea placeholder="Message" class="p-2 border rounded bg-white dark:bg-gray-800" rows="4" required></textarea>
      <button type="submit" class="bg-primary text-white py-2 rounded hover:bg-primary-dark transition">Send Message</button>
    </form>
  </section>
</template>

<script setup>
function submit() {
  // placeholder - real handling not needed for demo
  alert('Message sent!');
}
</script>
