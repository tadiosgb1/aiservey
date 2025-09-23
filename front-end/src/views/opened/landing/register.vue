<template>
  <!-- Modal Overlay -->
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- Modal Container -->
    <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 relative overflow-auto max-h-[90vh]">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        &times;
      </button>

      <h3 class="text-2xl font-bold text-orange-600 mb-6">Register</h3>

      <form class="space-y-4" @submit.prevent="submitForm" enctype="multipart/form-data">
        <!-- Personal Info -->
        <input type="text" placeholder="Full Name" v-model="form.name" class="w-full p-3 border rounded-lg" required />
        <input type="number" placeholder="Age" v-model="form.age" class="w-full p-3 border rounded-lg" min="0" />
        <input type="date" v-model="form.birth_date" class="w-full p-3 border rounded-lg" />

        <select v-model="form.gender" class="w-full p-3 border rounded-lg" required>
          <option disabled value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="text" placeholder="Country" v-model="form.country" class="w-full p-3 border rounded-lg" required />
        <input type="text" placeholder="City" v-model="form.city" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Address" v-model="form.address" class="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="Email" v-model="form.email" class="w-full p-3 border rounded-lg" required />
        <input type="text" placeholder="Phone Number" v-model="form.phone_number" class="w-full p-3 border rounded-lg" required />

        <!-- Education -->
        <select v-model="form.educational_level" class="w-full p-3 border rounded-lg" required>
          <option disabled value="">Select Education Level</option>
          <option v-for="level in educationLevels" :key="level" :value="level">{{ level }}</option>
        </select>

        <input type="text" placeholder="Institute Name" v-model="form.institute_name" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Department" v-model="form.department" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Field of Study" v-model="form.field_of_study" class="w-full p-3 border rounded-lg" />
        <input type="number" placeholder="Graduation Year" v-model="form.graduation_year" class="w-full p-3 border rounded-lg" />

        <!-- Work -->
        <input type="text" placeholder="Occupation" v-model="form.occupation" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Organization Name" v-model="form.org_name" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Work Country" v-model="form.work_country" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Work City" v-model="form.work_city" class="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Work Department" v-model="form.work_department" class="w-full p-3 border rounded-lg" />
        <textarea placeholder="Work Description" v-model="form.work_description" class="w-full p-3 border rounded-lg"></textarea>

        <!-- Skills & Languages -->
        <input type="text" placeholder="Skills (comma separated)" v-model="form.skills" class="w-full p-3 border rounded-lg" />

        <select v-model="form.english_level" class="w-full p-3 border rounded-lg">
          <option disabled value="">English Level</option>
          <option v-for="level in englishLevels" :key="level" :value="level">{{ level }}</option>
        </select>

        <input type="text" placeholder="Other Languages (comma separated)" v-model="form.other_languages" class="w-full p-3 border rounded-lg" />

        <!-- Documents -->
        <label class="block font-semibold mt-4 text-orange-600">Upload CV</label>
        <input type="file" @change="handleFileUpload($event, 'cv')" class="w-full p-3 border rounded-lg" />

        <label class="block font-semibold mt-4">Upload Certificates (multiple allowed)</label>
        <input type="file" multiple @change="handleFileUpload($event, 'certificates')" class="w-full p-3 border rounded-lg" />

        <label class="block font-semibold mt-4 text-orange-600">
          Please subscribe to our YouTube channel: 
          <span class="text-blue-600 underline">https://youtube.com/your-channel</span>
        </label>
        <input type="file" @change="handleFileUpload($event, 'youtube_screenshot')" class="w-full p-3 border rounded-lg" required />

        <!-- Passwords -->
        <input type="password" placeholder="Password" v-model="form.password" class="w-full p-3 border rounded-lg" required />
        <input type="password" placeholder="Confirm Password" v-model="form.confirm_password" class="w-full p-3 border rounded-lg" required />

        <button type="submit" class="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';

const props = defineProps({
  visible: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'success']);

const form = reactive({
  name: '',
  age: null,
  birth_date: '',
  gender: '',
  country: '',
  city: '',
  address: '',
  email: '',
  phone_number: '',
  password: '',
  confirm_password: '',
  referral_code: '',
  educational_level: '',
  institute_name: '',
  department: '',
  field_of_study: '',
  graduation_year: null,
  occupation: '',
  org_name: '',
  work_country: '',
  work_city: '',
  work_department: '',
  work_description: '',
  skills: '',
  english_level: '',
  other_languages: '',
  cv: null,
  certificates: [],
  youtube_screenshot: null,
});

const educationLevels = [
  'junior secondary school','senior secondary school','preparatory school','high school',
  'vocational diploma','diploma','undergraduate','bachelor','master','doctorate','professor','other'
];

const englishLevels = ['native','professional','intermediate','beginner'];

function handleFileUpload(event, field) {
  if (field === 'certificates') {
    form.certificates = Array.from(event.target.files);
  } else {
    form[field] = event.target.files[0];
  }
}

async function submitForm() {
  if (form.password !== form.confirm_password) {
    alert("Passwords do not match!");
    return;
  }

  const formData = new FormData();
  for (const key in form) {
    if (form[key] instanceof Array) {
      form[key].forEach(file => formData.append(key, file));
    } else {
      formData.append(key, form[key]);
    }
  }

  try {
    const response = await axios.post('/api/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('User registered:', response.data);
    alert('Registration successful!');
    emit('success', response.data);
    emit('close');
  } catch (err) {
    console.error(err);
    alert('Registration failed');
  }
}
</script>
