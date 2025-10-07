<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- backdrop -->
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      @click="close"
      aria-hidden="true"
    ></div>

    <!-- modal -->
    <div
      class="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loginTitle"
      @keydown.esc="close"
    >
      <div class="p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <h2 id="loginTitle" class="text-2xl font-semibold">Welcome back</h2>
          <button @click="close" class="text-gray-400 hover:text-gray-600 rounded-full p-1">
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p class="mt-2 text-sm text-gray-500">Sign in with your Google account or use your email & password.</p>

        <!-- Google button -->
        <button
          @click="loginWithGoogle"
          :disabled="loading"
          class="mt-6 w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg border hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1"
        >
          <svg class="h-5 w-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M533.5 278.4c0-18.6-1.5-37.3-4.7-55.2H272v104.6h146.9c-6.3 34.1-25.4 62.9-54.2 82.1v68.1h87.5c51.3-47.2 80.3-116.9 80.3-199.6z" fill="#4285F4"/>
            <path d="M272 544.3c73.6 0 135.5-24.4 180.7-66.1l-87.5-68.1c-24.3 16.3-55.6 26-93.2 26-71.6 0-132.2-48.3-153.9-113.1H29.6v70.9C74.9 496.3 167.2 544.3 272 544.3z" fill="#34A853"/>
            <path d="M118.1 327.1c-10.9-32.6-10.9-67.6 0-100.2V156H29.6c-39.8 79.7-39.8 172.5 0 252.2l88.5-81.1z" fill="#FBBC05"/>
            <path d="M272 107.7c39.9 0 75.8 13.7 104 40.6l78-78C407.4 24 345.5 0 272 0 167.2 0 74.9 48 29.6 126.1l88.5 70.9C139.8 156 200.4 107.7 272 107.7z" fill="#EA4335"/>
          </svg>
          <span class="text-sm font-medium">Continue with Google</span>
        </button>

        <div class="flex items-center my-6">
          <span class="flex-1 h-px bg-gray-200"></span>
          <span class="px-3 text-xs text-gray-400">or</span>
          <span class="flex-1 h-px bg-gray-200"></span>
        </div>

        <!-- login form -->
        <form @submit.prevent="submit" novalidate>
          <div class="space-y-4">
            <div>
              <label class="text-xs font-medium text-gray-600">Email</label>
              <input
                ref="email"
                v-model.trim="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="mt-1 block w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1"
              />
              <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
            </div>

            <div>
              <div class="flex justify-between items-center">
                <label class="text-xs font-medium text-gray-600">Password</label>
                <button type="button" @click="toggleShowPassword" class="text-xs text-blue-600 hover:underline">{{ showPassword ? 'Hide' : 'Show' }}</button>
              </div>
              <div class="mt-1 relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="6"
                  placeholder="••••••••"
                  class="block w-full px-4 py-2 rounded-lg border pr-12 focus:outline-none focus:ring-2 focus:ring-offset-1"
                />
                <div class="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"> 
                  <span v-if="form.password.length">{{ form.password.length }} chars</span>
                </div>
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>
            </div>

            <div class="flex items-center justify-between">
              <label class="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" v-model="form.remember" class="h-4 w-4 rounded border" />
                <span class="text-sm text-gray-600">Remember me</span>
              </label>

              <button type="button" @click="startForgot" class="text-sm text-blue-600 hover:underline">Forgot password?</button>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 transition-all"
              >
                <span v-if="!loading">Sign in</span>
                <span v-else>Signing in...</span>
              </button>
            </div>

            <p class="text-xs text-gray-500 text-center">Don't have an account? <button type="button" @click="$emit('open-register')" class="text-blue-600 hover:underline">Create one</button></p>
          </div>
        </form>

        <!-- forgot password panel -->
        <transition name="fade">
          <div v-if="forgotVisible" class="mt-6 p-4 rounded-lg bg-gray-50 border">
            <h3 class="text-sm font-medium">Reset password</h3>
            <p class="text-xs text-gray-500">Enter your email and we'll send password reset instructions.</p>
            <div class="mt-3">
              <input v-model.trim="forgotEmail" ref="forgotEmail" type="email" placeholder="your@email.com" class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1" />
              <p v-if="forgotError" class="mt-1 text-xs text-red-600">{{ forgotError }}</p>
            </div>

            <div class="mt-3 flex justify-end gap-2">
              <button @click="cancelForgot" class="px-3 py-1.5 rounded-lg border">Cancel</button>
              <button @click="submitForgot" :disabled="forgotLoading" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white">Send</button>
            </div>
          </div>
        </transition>
      </div>

      <!-- footer -->
      <div class="bg-gray-50 p-4 border-t flex items-center justify-between">
        <div class="text-xs text-gray-500">Secure & encrypted</div>
        <div>
          <button @click="close" class="px-3 py-1 rounded-lg border">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: {
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
        remember: false
      },
      errors: {},
      showPassword: false,

      // forgot password
      forgotVisible: false,
      forgotEmail: '',
      forgotLoading: false,
      forgotError: ''
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.focusFirstInput()
        })
      }
    }
  },
  methods: {
    focusFirstInput() {
      const el = this.$refs.email
      if (el && el.focus) el.focus()
    },
    close() {
      this.$emit('update:visible', false)
      this.reset()
    },
    reset() {
      this.loading = false
      this.form.email = ''
      this.form.password = ''
      this.form.remember = false
      this.errors = {}
      this.showPassword = false
      this.forgotVisible = false
      this.forgotEmail = ''
      this.forgotError = ''
    },
    validate() {
      this.errors = {}
      // simple email check
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.form.email || !emailRe.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address.'
      }
      if (!this.form.password || this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.'
      }
      return Object.keys(this.errors).length === 0
    },
    async submit() {
      if (!this.validate()) return
      this.loading = true
      try {
        // TODO: replace with real API call
        await new Promise(resolve => setTimeout(resolve, 900))
        // emit success with credentials (do NOT send raw password in real apps)
        this.$emit('login', { ...this.form })
        this.close()
      } catch (e) {
        this.errors.general = 'Unexpected error. Please try again.'
      } finally {
        this.loading = false
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
      this.$nextTick(() => {
        // keep focus sensible
      })
    },
    // --- google login ---
    loginWithGoogle() {
      // NOTE: implement actual OAuth flow using your backend / Google SDK.
      // Here we just emit an event so parent can handle.
      this.$emit('login-google')
    },

    // --- forgot password ---
    startForgot() {
      this.forgotVisible = true
      this.$nextTick(() => this.$refs.forgotEmail && this.$refs.forgotEmail.focus())
    },
    cancelForgot() {
      this.forgotVisible = false
      this.forgotEmail = ''
      this.forgotError = ''
    },
    async submitForgot() {
      this.forgotError = ''
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.forgotEmail || !emailRe.test(this.forgotEmail)) {
        this.forgotError = 'Please enter a valid email.'
        return
      }
      this.forgotLoading = true
      try {
        // TODO: call your password reset endpoint
        await new Promise(resolve => setTimeout(resolve, 800))
        this.$emit('forgot-sent', this.forgotEmail)
        this.forgotVisible = false
        this.forgotEmail = ''
      } catch (e) {
        this.forgotError = 'Failed to send reset email. Try again later.'
      } finally {
        this.forgotLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* small transition */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
