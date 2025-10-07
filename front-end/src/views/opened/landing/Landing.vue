<template>
  <div class="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
    <!-- Navbar -->
    <header class="bg-orange-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">UbuntuMind</h1>
        <nav class="space-x-6 hidden md:flex">
          <a href="#about" class="hover:underline">About</a>
          <a href="#departments" class="hover:underline">Departments</a>
          <a href="#requirements" class="hover:underline">Requirements</a>
          <a href="#faq" class="hover:underline">FAQ</a>
          <a href="#contact" class="hover:underline">Contact</a>
        </nav>
        <button
          @click="showLogin = true"
          class="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          Login
        </button>
       
      </div>
    </header>

    <!-- Hero -->
    <section class="bg-gradient-to-r from-orange-600 to-indigo-600 text-white py-20 text-center">
      <h2 class="text-4xl font-bold mb-4">We are hiring over 7.2 Million scholars for data gathering </h2>
      <p class="max-w-2xl mx-auto">
        Sponsored by 3.4K+ companies. Help us build the world’s largest open-source AI for Africa & the world. Get paid while shaping the future.
      </p>
      <div class="mt-6">
        <a @click="showRegister=true"
           class="cursor-pointer bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
          Register Now
        </a>
      </div>
    </section>

    <!-- About / Vision / Why -->
    <section id="about" class="py-16 max-w-6xl mx-auto px-6">
      <h3 class="text-3xl font-bold text-orange-600 mb-6">About UbuntuMind</h3>
      <p class="mb-4">
        UbuntuMind is an open-source AI project built for everyone. Unlike closed systems, we believe knowledge and intelligence should be free, open, and for humanity.  
      </p>
      <h4 class="text-xl font-bold mb-2">Our Vision</h4>
      <p class="mb-4">
        To become the largest global AI knowledge base powered by real-world data from millions of contributors worldwide.  
      </p>
      <h4 class="text-xl font-bold mb-2">Why?</h4>
      <p>
        Current AIs are trained mostly on western data. We want an AI that understands Africa, Asia, and every community, giving deeper and fairer answers for the world.  
      </p>
    </section>

    <!-- Departments -->
    <section id="departments" class="py-16 bg-gray-100">
      <div class="max-w-6xl mx-auto px-6">
        <h3 class="text-3xl font-bold text-orange-600 mb-6">Departments & Roles</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Engineering & Technology</h4>
            <p>Provide technical documents, code samples, and research papers. Help AI learn advanced engineering concepts.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Medical & Health</h4>
            <p>Contribute verified health knowledge, guides, and safe practices for medical training data.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Social Sciences</h4>
            <p>Provide cultural, historical, and sociological data for human-centered AI training.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Education</h4>
            <p>Upload learning materials, lesson notes, and academic content for future learners.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Business & Economics</h4>
            <p>Provide business cases, finance guides, and market studies to train AI for real-world economies.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow">
            <h4 class="font-bold text-lg mb-2">Arts & Culture</h4>
            <p>Upload music, stories, and literature that reflect global diversity and heritage.</p>
          </div>
        </div>
      </div>
    </section>

    <Aifuture />

    <!-- Requirements -->
     <Requirements />
      <Register 
      :visible="showRegister" 
      @close="showRegister = false"
      @success="handleSuccess"
      />

    <!-- FAQ -->
  <Faqs />
 <LoginModal
      :visible.sync="showLogin"
      @login="handleLogin"
      @login-google="handleGoogleLogin"
      @forgot-sent="handleForgotSent"
      @open-register="() => alert('Open register modal here')"
    />
    <!-- Dashboard -->
    <section v-if="user" class="py-16 bg-gray-50">
      <div class="max-w-5xl mx-auto bg-white shadow rounded-xl p-8">
        <h3 class="text-2xl font-bold text-orange-600 mb-6">Dashboard</h3>
        <p><strong>Status:</strong> {{ eligibility }}</p>
        <p><strong>Credits:</strong> {{ credits }}</p>
        <p><strong>Referrals:</strong> {{ referralsCount }}</p>
        <div class="mt-6">
          <h4 class="font-bold mb-2">Training</h4>
          <ul class="list-disc list-inside text-orange-600">
            <li><a href="#" class="underline">How to gather data</a></li>
            <li><a href="#" class="underline">Upload quality documents</a></li>
            <li><a href="#" class="underline">Promote on social media</a></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-indigo-700 text-white py-10 mt-auto">
      <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        <div>
          <h4 class="font-bold text-lg mb-3">UbuntuMind</h4>
          <p class="text-sm">Building the world’s largest open-source AI with real-world data.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-3">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#about" class="hover:underline">About</a></li>
            <li><a href="#departments" class="hover:underline">Departments</a></li>
            <li><a href="#requirements" class="hover:underline">Requirements</a></li>
            <li><a href="#faq" class="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-3">Sponsors</h4>
          <p class="text-sm">3.4K+ global companies supporting this project.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-3">Follow Us</h4>
          <div class="flex space-x-3">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8 text-sm text-gray-300">
        © 2025 UbuntuMind. All rights reserved
      </div>
    </footer>
  </div>
</template>

<script>
import Register from './register.vue'
import Faqs from './fqs.vue';
import Requirements from './requirements.vue'
import Aifuture from './AiFuture.vue'
import LoginModal from "./login.vue"
export default {
  name: "UbuntuMindApp",
  components:{
    Register,
    Faqs,
    Requirements,
    Aifuture,
    LoginModal,
  },
  data() {
    return {
      showRegister:false,
      user: null,
      eligibility: "Pending Review",
      credits: 0,
      referralsCount: 0,
      referralLink: window.location.origin + "/?ref=ABC123",
      showLogin: false
    };
  },
  methods: {
    handleLogin(credentials) {
      console.log("User logged in:", credentials);
      // TODO: send credentials to backend
    },
    handleGoogleLogin() {
      console.log("Google login clicked");
      // TODO: trigger Google OAuth flow
    },
    handleForgotSent(email) {
      console.log("Forgot password email sent to:", email);
      // maybe show a toast
    },
    loginWithGoogle() {
      this.user = { name: "John Doe", email: "john@example.com" };
    },
    logout() {
      this.user = null;
    },
    copyReferral() {
      navigator.clipboard.writeText(this.referralLink);
      alert("Referral link copied!");
    },
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },
    handleSuccess(data) {
  console.log("New user registered:", data);
}
  },
};
</script>
