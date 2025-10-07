<template>
  <!-- Modal Overlay -->
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div
      class="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative overflow-auto max-h-[90vh]"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
      >
        &times;
      </button>

      <!-- Header -->
      <h3 class="text-lg font-bold text-orange-600 mb-5 text-center uppercase tracking-wide">
        Register
      </h3>

      <!-- Registration Form -->
      <form
        class="space-y-3 text-sm"
        @submit.prevent="submitForm"
        enctype="multipart/form-data"
      >
        <!-- Full Name -->
        <div>
          <label class="block text-gray-600 mb-1">Full Name</label>
          <input type="text" v-model="form.name" class="input-field" required />
        </div>

        <!-- Birth Date -->
        <div>
          <label class="block text-gray-600 mb-1">Birth Date</label>
          <input type="date" v-model="form.birth_date" class="input-field" />
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-gray-600 mb-1">Gender</label>
          <select v-model="form.gender" class="input-field" required>
            <option disabled value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Country with Code & Flag -->
        <div class="relative w-full">
          <label class="block text-gray-600 mb-1 text-sm font-medium">Country</label>
          <div class="relative">
            <button
              type="button"
              @click="dropdownOpen = !dropdownOpen"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between text-sm focus:ring focus:ring-orange-200 focus:outline-none"
            >
              <span class="flex items-center space-x-2">
                <img
                  v-if="selectedCountry"
                  :src="selectedCountry.flag"
                  alt="flag"
                  class="w-5 h-5 rounded-sm"
                />
                <span>{{ selectedCountry ? selectedCountry.name + ' (+' + selectedCountry.dial_code + ')' : 'Select Country' }}</span>
              </span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <ul
              v-show="dropdownOpen"
              class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg max-h-64 overflow-auto shadow-lg"
            >
              <li
                v-for="country in countries"
                :key="country.code"
                @click="selectCountry(country)"
                class="flex items-center space-x-2 px-3 py-2 hover:bg-orange-100 cursor-pointer text-sm"
              >
                <img :src="country.flag" alt="flag" class="w-5 h-5 rounded-sm" />
                <span>{{ country.name }} (+{{ country.dial_code }})</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- City -->
        <div>
          <label class="block text-gray-600 mb-1">City</label>
          <input type="text" v-model="form.city" class="input-field" />
        </div>

        <!-- Address -->
        <div>
          <label class="block text-gray-600 mb-1">Address</label>
          <input type="text" v-model="form.address" class="input-field" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-600 mb-1">Email</label>
          <input type="email" v-model="form.email" class="input-field" required />
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-gray-600 mb-1">Phone Number</label>
          <input type="text" v-model="form.phone_number" class="input-field" required />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-gray-600 mb-1">Status</label>
          <select v-model="form.status" class="input-field" required>
            <option disabled value="">Select Status</option>
            <option value="learning">Student</option>
            <option value="working">Working</option>
          </select>
        </div>

        <!-- Education Section -->
        <div v-if="form.status === 'learning'" class="space-y-3">
          <div>
            <label class="block text-gray-600 mb-1">Education Level</label>
            <select v-model="form.educational_level" class="input-field" required>
              <option disabled value="">Select Education Level</option>
              <option v-for="level in educationLevels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Institute Name</label>
            <input type="text" v-model="form.institute_name" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Department</label>
            <input type="text" v-model="form.department" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Field of Study</label>
            <input type="text" v-model="form.field_of_study" class="input-field" />
          </div>
        </div>

        <!-- Work Section -->
        <div v-if="form.status === 'working'" class="space-y-3">
          <div>
            <label class="block text-gray-600 mb-1">Occupation</label>
            <input type="text" v-model="form.occupation" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Organization Name</label>
            <input type="text" v-model="form.org_name" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Work Country</label>
            <input type="text" v-model="form.work_country" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Work City</label>
            <input type="text" v-model="form.work_city" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Work Department</label>
            <input type="text" v-model="form.work_department" class="input-field" />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Work Description</label>
            <textarea v-model="form.work_description" class="input-field"></textarea>
          </div>
        </div>

        <!-- English Level -->
        <div>
          <label class="block text-gray-600 mb-1">English Level</label>
          <select v-model="form.english_level" class="input-field">
            <option disabled value="">Select English Level</option>
            <option v-for="level in englishLevels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>

        <!-- CV Upload -->
        <div>
          <label class="block text-orange-600 text-xs font-medium mb-1">
            Upload CV (PNG, JPG, JPEG, or PDF)
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            @change="handleFileUpload($event, 'cv')"
            class="input-field"
            required
          />
        </div>

        <!-- YouTube Screenshot -->
        <div>
          <label class="block text-orange-600 text-xs font-medium mb-1">
            Please subscribe to our YouTube channel:
            <a
              href="https://www.youtube.com/channel/UCXRB5hcCZOD2tNcKF5yIiRQ"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 underline hover:text-blue-800"
            >
              Visit & Subscribe
            </a>
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.gif,.webp"
            @change="handleFileUpload($event, 'youtube_screenshot')"
            class="input-field"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-600 mb-1">Password</label>
          <input type="password" v-model="form.password" class="input-field" required />
        </div>

        <div>
          <label class="block text-gray-600 mb-1">Confirm Password</label>
          <input type="password" v-model="form.confirm_password" class="input-field" required />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg w-full font-semibold text-sm mt-4 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      dropdownOpen: false,
      selectedCountry: null,
      form: {
        name: "",
        birth_date: "",
        gender: "",
        country: "",
        city: "",
        address: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        referral_code: "",
        status: "",
        educational_level: "",
        institute_name: "",
        department: "",
        field_of_study: "",
        occupation: "",
        org_name: "",
        work_country: "",
        work_city: "",
        work_department: "",
        work_description: "",
        english_level: "",
        cv: null,
        youtube_screenshot: null,
      },
      educationLevels: [
        "junior secondary school",
        "senior secondary school",
        "preparatory school",
        "high school",
        "vocational diploma",
        "diploma",
        "undergraduate",
        "bachelor",
        "master",
        "doctorate",
        "professor",
        "other",
      ],
      englishLevels: ["native", "professional", "intermediate", "beginner"],
      countries: [
        { name: "Ethiopia", dial_code: "251", code: "ET", flag: "https://flagcdn.com/w20/et.png" },
        { name: "United States", dial_code: "1", code: "US", flag: "https://flagcdn.com/w20/us.png" },
        { name: "United Kingdom", dial_code: "44", code: "GB", flag: "https://flagcdn.com/w20/gb.png" },
        { name: "Canada", dial_code: "1", code: "CA", flag: "https://flagcdn.com/w20/ca.png" },
        { name: "Germany", dial_code: "49", code: "DE", flag: "https://flagcdn.com/w20/de.png" },
        { name: "France", dial_code: "33", code: "FR", flag: "https://flagcdn.com/w20/fr.png" },
        { name: "India", dial_code: "91", code: "IN", flag: "https://flagcdn.com/w20/in.png" },
        // Add more countries as needed
      ],
    };
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country;
      this.form.country = country.name;
      this.dropdownOpen = false;
    },
    handleFileUpload(event, field) {
      this.form[field] = event.target.files[0];
    },
    async submitForm() {
      if (this.form.password !== this.form.confirm_password) {
        alert("Passwords do not match!");
        return;
      }

      const formData = new FormData();
      for (const key in this.form) formData.append(key, this.form[key]);

      try {
        const response = await axios.post("/api/users", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Registration successful!");
        this.$emit("success", response.data);
        this.$emit("close");
      } catch (err) {
        console.error(err);
        alert("Registration failed");
      }
    },
  },
};
</script>

<style scoped>
.input-field {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-orange-200 focus:outline-none;
}

/* Optional scrollbar styling for country dropdown */
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(209, 115, 46, 0.5);
  border-radius: 3px;
}
</style>
