<template>
  <section class="bg-gray-200 py-12">
    <div class="max-w-3xl mx-auto px-6">
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden"
        >
          <!-- Question -->
          <button
            @click="toggle(index)"
            class="w-full flex justify-between items-center p-5 text-left text-gray-800 font-semibold hover:bg-orange-50 transition"
          >
            <span>{{ item.q }}</span>
            <svg
              :class="openIndex === index ? 'rotate-180 text-orange-600' : 'text-gray-500'"
              class="w-6 h-6 transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Answer -->
          <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-40"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 max-h-40"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="openIndex === index" class="px-5 pb-5 text-gray-600 leading-relaxed">
              {{ item.a }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const openIndex = ref(null);

// Built-in FAQ list (inside component)
const faqs = [
  { q: "How much can I earn?", a: "You can earn more than $8/hour depending on the type of tasks you complete and your referrals." },
  { q: "Do I need prior experience?", a: "No prior experience is required. We provide training to help you get started easily." },
  { q: "Is it open worldwide?", a: "Yes, it is available globally, with a strong focus on Africa and the Global South." },
  { q: "How do I receive payments?", a: "Payments are processed weekly through PayPal, Bank Transfer, or Mobile Money." },
  { q: "Can I work part-time?", a: "Absolutely. You can work on a flexible schedule that suits you best." },
  { q: "What kind of tasks are available?", a: "Tasks range from data entry, content moderation, surveys, and more advanced online work." },
];

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>
