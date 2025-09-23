<template>
  <section id="requirements" class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">
      <h3 class="text-3xl font-bold text-orange-600 mb-12 text-center">
        Requirements
      </h3>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(req, index) in requirements"
          :key="index"
          class="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
        >
          <img
            :src="req.image"
            :alt="req.title"
            class="w-20 h-20 object-contain mb-4"
          />
          <h4 class="text-lg font-semibold text-gray-800 mb-2">
            {{ req.title }}
          </h4>
          <p class="text-gray-600 text-base leading-relaxed">
            {{ req.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const requirements = [
  {
    title: "Stable Internet",
    description: "At least 5+ Mbps connection to complete tasks without interruption.",
    image: "https://img.icons8.com/clouds/100/000000/wifi.png",
  },
  {
    title: "Smartphone or Laptop",
    description: "You need a smartphone, laptop, or desktop computer to work efficiently.",
    image: "https://img.icons8.com/clouds/100/000000/laptop.png",
  },
  {
    title: "Basic Language Skills",
    description: "Ability to read and write English or your local language for smooth communication.",
    image: "https://img.icons8.com/clouds/100/000000/language.png",
  },
  {
    title: "Social Media Account",
    description: "A TikTok or YouTube account is preferred for certain engagement tasks.",
    image: "https://img.icons8.com/clouds/100/000000/youtube.png",
  },
  {
    title: "Weekly Commitment",
    description: "Dedicate at least 8+ hours per week to tasks and assignments.",
    image: "https://img.icons8.com/clouds/100/000000/calendar.png",
  },
  {
    title: "KYC Verification",
    description: "Upload your ID, proof of address, and YouTube subscription screenshot.",
    image: "https://img.icons8.com/clouds/100/000000/identification-documents.png",
  },
];
</script>
