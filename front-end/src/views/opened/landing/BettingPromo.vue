<template>
  <nav class="bg-yellow-400 text-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-14 items-center">
        <!-- Left: Brand -->
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-700">{{ currentTime }}</span>
        </div>

        <!-- Right: Links with single purple-green bg -->
        <div class="hidden md:flex items-center space-x-0 rounded overflow-hidden bg-gradient-to-r from-purple-600 to-green-500">
          <a 
            href="#home" 
            class="px-4 py-2 text-white font-medium hover:opacity-90 transition"
          >
            HOME
          </a>
          <a 
            href="#avatar" 
            class="px-4 py-2 text-white font-medium hover:opacity-90 transition"
          >
            AVATOR
          </a>
          <a 
            href="#lottery" 
            class="px-4 py-2 text-white font-medium hover:opacity-90 transition"
          >
            LOTTERY
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      currentTime: "",
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      this.currentTime = `${month}.${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style scoped>
nav a {
  text-transform: uppercase;
}
</style>
