<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <!-- HEADER -->
    <header class="bg-gradient-to-r from-green-700 via-green-600 to-purple-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <img src="https://via.placeholder.com/40/00a86b/ffffff?text=P" alt="logo" class="w-10 h-10 rounded-full"/>
            </div>
            <div>
              <h1 class="text-xl font-extrabold text-white leading-none">Peer2Play <span class="text-purple-300">Arena</span></h1>
              <p class="text-xs text-green-200">P2P sports prediction & challenges</p>
            </div>
          </div>
          <!-- nav -->
          <nav class="hidden lg:flex items-center space-x-4 ml-6">
            <button class="text-sm px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition">Home</button>
            <button class="text-sm px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition">Games</button>
            <button class="text-sm px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition">Promotions</button>
            <button class="text-sm px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition">Rewards</button>
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <!-- account links -->
          <div class="hidden md:flex items-center bg-white bg-opacity-5 px-3 py-1 rounded-lg space-x-3">
            <button class="text-xs text-green-200 hover:underline">Deposit</button>
            <button class="text-xs text-green-200 hover:underline">Withdraw</button>
            <div class="text-xs text-gray-300 px-2">|</div>
            <div class="text-xs text-gray-300">Telebirr · M-Pesa · eBirr</div>
          </div>

          <!-- auth -->
          <div v-if="!auth.logged" class="flex items-center space-x-2">
            <button @click="openLogin" class="px-3 py-1.5 bg-transparent border border-white border-opacity-10 rounded-lg text-sm hover:bg-white hover:bg-opacity-10">Login</button>
            <button @click="openRegister" class="px-3 py-1.5 bg-green-400 text-gray-900 rounded-lg text-sm font-semibold hover:opacity-90">Register</button>
          </div>

          <div v-else class="flex items-center space-x-3">
            <div class="text-sm text-white hidden sm:block">
              <div class="font-semibold">{{ auth.user.name }}</div>
              <div class="text-xs text-green-100">Balance: ETB {{ auth.user.balance }}</div>
            </div>
            <button @click="logout" class="px-3 py-1.5 bg-white bg-opacity-10 rounded-lg text-sm hover:bg-opacity-20">Logout</button>
          </div>
        </div>
      </div>
    </header>

<BettingPro />

    <!-- MAIN -->
    <main class=" px-4 py-6 grid grid-cols-12 gap-6">


        
      <!-- LEFT: filters & sports list -->
      <aside class="col-span-12 lg:col-span-3 bg-gray-850 rounded-2xl p-4 shadow-lg border border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-bold text-green-300">Explore Sports</h2>
          <button class="text-xs px-2 py-1 bg-green-600 text-white rounded-full">All</button>
        </div>

        <div class="space-y-3">
          <div v-for="sport in sports" :key="sport.key" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-white bg-opacity-8">
                <i :class="sport.icon" class="text-green-300 text-lg"></i>
              </div>
              <div>
                <div class="text-sm font-semibold">{{ sport.label }}</div>
                <div class="text-xs text-gray-400">{{ sport.sample }} matches</div>
              </div>
            </div>
            <button :class="['text-xs px-3 py-1 rounded-full', selectedSport===sport.key ? 'bg-purple-600 text-white' : 'bg-white bg-opacity-5 text-green-200']"
                    @click="selectedSport = sport.key">
              {{ selectedSport===sport.key ? 'Selected' : 'Select' }}
            </button>
          </div>
        </div>

        <hr class="my-4 border-gray-800"/>

        <!-- VIP tiers -->
        <div class="mb-4">
          <h3 class="text-xs font-bold text-green-300 mb-2">VIP Tiers</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tier in vipTiers"
              :key="tier"
              @click="selectedTier = tier"
              :class="['px-3 py-1 rounded-full text-xs font-semibold', selectedTier===tier ? 'bg-green-500 text-white' : 'bg-white bg-opacity-5 text-green-200']"
            >
              VIP {{ tier }}
            </button>
          </div>
        </div>

        <!-- Search by club / match -->
        <div>
          <h3 class="text-xs font-bold text-green-300 mb-2">Search</h3>
          <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search team, club or match..."
                 class="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-sm placeholder-gray-500"/>
          <div v-if="searchResults.length" class="mt-2">
            <div v-for="r in searchResults.slice(0,5)" :key="r.id" class="text-xs px-2 py-1 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-5" @click="applyMatch(r)">
              <span class="font-semibold">{{ r.home }}</span> vs <span>{{ r.away }}</span>
              <span class="text-gray-400 ml-2 text-xs">({{ r.sport }})</span>
            </div>
          </div>
        </div>

        <hr class="my-4 border-gray-800"/>

        <!-- Quick links -->
        <div class="text-sm space-y-2 text-black">
          <button class="w-full text-left px-3 py-2 rounded-lg bg-white bg-opacity-2 hover:bg-opacity-5">Top Leagues</button>
          <button class="w-full text-left px-3 py-2 rounded-lg bg-white bg-opacity-2 hover:bg-opacity-5">My Challenges</button>
          <button class="w-full text-left px-3 py-2 rounded-lg bg-white bg-opacity-2 hover:bg-opacity-5">Leaderboard</button>
        </div>
      </aside>

      <!-- CENTER: matches and create challenge -->
      <section class="col-span-12 lg:col-span-6 space-y-6">

        <!-- Featured / create quick -->
        <div class="bg-gradient-to-r from-green-700 to-purple-700 rounded-2xl p-4 shadow-xl text-white flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold">Featured Today</h2>
            <p class="text-sm opacity-90">Live score preview & quick create challenges from upcoming matches</p>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="openCreateModal()" class="px-4 py-2 bg-white text-green-700 rounded-xl font-semibold hover:opacity-95">+ Create Challenge</button>
            <button @click="quickSimulate()" class="px-4 py-2 bg-white bg-opacity-10 rounded-xl font-semibold">Simulate Result</button>
          </div>
        </div>

        <!-- Sport filters -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-300">Showing</div>
            <div class="text-sm font-semibold text-white">{{ selectedSportLabel }}</div>
            <div class="text-sm text-gray-400">· VIP {{ selectedTier }}</div>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-xs text-gray-400">Sort</label>
            <select v-model="sortBy" class="bg-gray-900 border border-gray-800 text-sm px-3 py-1 rounded-lg">
              <option value="time">Time</option>
              <option value="popularity">Popularity</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <!-- Matches list -->
        <div class="grid grid-cols-1 gap-4">
          <div v-for="match in filteredMatches" :key="match.id" class="bg-gray-850 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="text-center w-36">
                <div class="text-xs text-gray-400">{{ match.time }}</div>
                <div class="text-base font-bold text-white">{{ match.home }}</div>
                <div class="text-sm text-gray-300">vs</div>
                <div class="text-base font-bold text-white">{{ match.away }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ match.league }}</div>
              </div>

              <div class="hidden md:block h-12 w-px bg-gray-800"></div>

              <div class="text-sm text-gray-300">
                <div class="mb-1">Market: <span class="text-green-300 font-semibold">{{ match.marketLabel }}</span></div>
                <div class="mb-1">Odds preview: <span class="text-white font-semibold">—</span> (for reference)</div>
                <div class="text-xs text-gray-400">Corners: {{ match.sampleCorners }} · Cards: {{ match.sampleCards }}</div>
              </div>
            </div>

            <div class="flex flex-col items-end space-y-2">
              <div class="text-sm text-gray-300">VIP: <span class="text-green-300 font-bold">{{ match.vip }}</span></div>
              <div class="flex gap-2">
                <button @click="openQuickCreateFromMatch(match)" class="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm">Create</button>
                <button @click="exploreMatch(match)" class="px-3 py-1.5 bg-white bg-opacity-5 rounded-lg text-sm">Explore</button>
              </div>
            </div>
          </div>
        </div>

        <!-- My Challenges (created by you): -->
        <div class="bg-gray-850 border border-gray-800 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-green-300">Your Challenges</h3>
            <div class="text-xs text-gray-400">Initiated / Joined</div>
          </div>

          <div v-if="myChallenges.length" class="space-y-3">
            <div v-for="c in myChallenges" :key="c.id" class="p-3 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold">{{ c.match }}</div>
                <div class="text-xs text-gray-400">{{ c.type }} · VIP {{ c.tier }} · {{ c.players.length }}/{{ c.maxPlayers }}</div>
              </div>

              <div class="flex items-center gap-2">
                <span v-if="c.initiator" class="text-xs px-2 py-1 rounded-full bg-green-600 text-gray-900 font-semibold">Initiator</span>
                <span v-else class="text-xs px-2 py-1 rounded-full bg-white bg-opacity-5 text-green-200">Joined</span>
                <button @click="viewChallenge(c)" class="px-2 py-1 bg-white bg-opacity-5 rounded-lg text-xs">View</button>
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-gray-400">You have not created or joined any challenges yet.</div>
        </div>

      </section>

      <!-- RIGHT SIDEBAR: real challenges + create -->
      <aside class="col-span-12 lg:col-span-3">
        <div class="bg-gray-850 rounded-2xl p-4 shadow-lg border border-gray-800 sticky top-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-green-300">Live Challenges</h3>
            <button @click="openCreateModal()" class="text-xs px-3 py-1 rounded-full bg-green-600 text-gray-900 font-semibold">+ Create</button>
          </div>

          <div class="space-y-3 max-h-96 overflow-auto pr-2">
            <div v-for="ch in lobbyChallenges" :key="ch.id" class="p-3 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold text-white">{{ ch.match }}</div>
                <div class="text-xs text-gray-400">{{ ch.type }} · VIP {{ ch.tier }}</div>
                <div class="text-xs text-gray-500 mt-1">
                  <i class="fas fa-user mr-1"></i>{{ ch.players.length }} joined
                </div>
              </div>
              <div class="flex flex-col items-end">
                <div class="flex -space-x-2 mb-2">
                  <div v-for="(p, idx) in ch.players.slice(0,3)" :key="idx" class="w-8 h-8 rounded-full bg-green-700 text-gray-900 flex items-center justify-center text-xs font-bold border-2 border-gray-900">
                    {{ p[0] }}
                  </div>
                </div>
                <div class="flex gap-2">
                  <button @click="joinPublic(ch)" class="px-2 py-1 rounded-lg bg-purple-600 text-white text-xs">Join</button>
                  <button @click="viewChallenge(ch)" class="px-2 py-1 rounded-lg bg-white bg-opacity-5 text-xs">View</button>
                </div>
              </div>
            </div>

            <div v-if="!lobbyChallenges.length" class="text-xs text-gray-500">No live challenges. Create one now.</div>
          </div>

          <hr class="my-4 border-gray-800" />

          <div class="text-xs text-gray-400">
            <p class="mb-2">Payments</p>
            <div class="flex gap-2">
              <button class="px-2 py-1 rounded-lg bg-white bg-opacity-5">Telebirr</button>
              <button class="px-2 py-1 rounded-lg bg-white bg-opacity-5">M-Pesa</button>
              <button class="px-2 py-1 rounded-lg bg-white bg-opacity-5">eBirr</button>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- Create Challenge Modal -->
    <div v-if="modals.create" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-gray-900 rounded-2xl w-full max-w-xl p-6 border border-gray-800">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-green-300">Create Challenge</h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div class="space-y-3">
          <label class="text-sm text-gray-300">Pick Match</label>
          <select v-model="createForm.matchId" class="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm">
            <option value="">-- choose match (you can prefill from explore) --</option>
            <option v-for="m in allMatches" :value="m.id" :key="m.id">
              {{ m.home }} vs {{ m.away }} · {{ m.time }} · VIP {{ m.vip }}
            </option>
          </select>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-sm text-gray-300">Type</label>
              <select v-model="createForm.type" class="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm">
                <option value="winner">Who will win?</option>
                <option value="winner_goals">Winner + Goals</option>
                <option value="goals_total">Total Goals (Over/Under)</option>
                <option value="cards">Cards (Total)</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-gray-300">VIP Tier</label>
              <select v-model="createForm.tier" class="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm">
                <option v-for="t in vipTiers" :value="t" :key="t">VIP {{ t }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-300">Max Players</label>
            <input v-model.number="createForm.maxPlayers" type="number" min="2" max="50"
                   class="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-300">Optional Note / Rules</label>
            <textarea v-model="createForm.note" class="w-full bg-gray-800 px-3 py-2 rounded-lg text-sm" rows="3"></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button @click="closeCreateModal" class="px-3 py-2 rounded-lg bg-white bg-opacity-5">Cancel</button>
            <button @click="submitCreate" class="px-4 py-2 rounded-lg bg-green-600 text-gray-900 font-semibold">Create</button>
          </div>
        </div>
      </div>
    </div>

    <!-- AUTH Modals (Login/Register) -->
    <div v-if="modals.login" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-gray-900 rounded-2xl w-full max-w-sm p-6 border border-gray-800">
        <h3 class="text-lg font-bold text-green-300 mb-2">Login</h3>
        <input v-model="authForm.phone" type="text" placeholder="Phone number" class="w-full px-3 py-2 rounded-lg bg-gray-800 mb-2 text-sm" />
        <input v-model="authForm.password" type="password" placeholder="Password" class="w-full px-3 py-2 rounded-lg bg-gray-800 mb-2 text-sm" />
        <div class="flex justify-between items-center">
          <button @click="modals.login=false" class="px-3 py-2 rounded-lg bg-white bg-opacity-5">Cancel</button>
          <button @click="login" class="px-4 py-2 rounded-lg bg-green-600 text-gray-900 font-semibold">Login</button>
        </div>
      </div>
    </div>

    <div v-if="modals.register" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-gray-900 rounded-2xl w-full max-w-sm p-6 border border-gray-800">
        <h3 class="text-lg font-bold text-green-300 mb-2">Register</h3>
        <input v-model="regForm.name" type="text" placeholder="Full name" class="w-full px-3 py-2 rounded-lg bg-gray-800 mb-2 text-sm" />
        <input v-model="regForm.phone" type="text" placeholder="Phone number" class="w-full px-3 py-2 rounded-lg bg-gray-800 mb-2 text-sm" />
        <input v-model="regForm.password" type="password" placeholder="Password" class="w-full px-3 py-2 rounded-lg bg-gray-800 mb-2 text-sm" />
        <div class="flex justify-between items-center">
          <button @click="modals.register=false" class="px-3 py-2 rounded-lg bg-white bg-opacity-5">Cancel</button>
          <button @click="register" class="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold">Register</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/*
  Betting.vue - Demo front-end for P2P sports prediction/challenges.
  Vue 2 component using Tailwind CSS classes. All data is simulated.
*/

import BettingPro from './BettingPromo.vue'

export default {
    components:{
     BettingPro
    },
  name: "BettingPage",
  data() {
    return {
      // Auth simulation
      auth: { logged: false, user: null },

      // Selected filters
      selectedSport: "football",
      selectedTier: 250,
      searchQuery: "",
      searchResults: [],
      sortBy: "time",

      // VIP tiers
      vipTiers: [250, 500, 1000, 2000, 4000, 8000, 10000],

      // Sport list (with icons - Font Awesome classes)
      sports: [
        { key: "football", label: "Football", icon: "fas fa-futbol", sample: 120 },
        { key: "basketball", label: "Basketball", icon: "fas fa-basketball-ball", sample: 34 },
        { key: "tennis", label: "Tennis", icon: "fas fa-table-tennis", sample: 48 },
        { key: "cricket", label: "Cricket", icon: "fas fa-cricket", sample: 18 },
        { key: "esports", label: "eSports", icon: "fas fa-gamepad", sample: 60 },
        { key: "Volly Ball", label: "Volley Ball", icon: "fas fa-gamepad", sample: 60 },
        { key: "ICY Hokey", label: "ICY Hokey", icon: "fas fa-gamepad", sample: 60 },
        { key: "American Football", label: "American Football", icon: "fas fa-gamepad", sample: 60 },
        { key: "Hand ball", label: "Hand ball", icon: "fas fa-gamepad", sample: 60 },

        { key: "Boxing", label: "Boxing", icon: "fas fa-gamepad", sample: 60 },
        { key: "Base Ball", label: "Base Ball", icon: "fas fa-gamepad", sample: 60 },
        { key: "Fatsal", label: "Fatsal", icon: "fas fa-gamepad", sample: 60 },
        { key: "Rugby", label: "Rugby", icon: "fas fa-gamepad", sample: 60 },
      ],

      // Sample matches (for explore + create)
      allMatches: [
        { id: 101, sport: "football", home: "Arsenal", away: "Chelsea", league: "Premier League", time: "Today 18:00", vip: 250, marketLabel: "Who will win?", sampleCorners: 6, sampleCards: 2 },
        { id: 102, sport: "football", home: "Real Madrid", away: "Barcelona", league: "La Liga", time: "Tomorrow 21:00", vip: 1000, marketLabel: "Winner + Goals", sampleCorners: 8, sampleCards: 3 },
        { id: 103, sport: "basketball", home: "Lakers", away: "Warriors", league: "NBA", time: "Today 20:00", vip: 500, marketLabel: "Winner", sampleCorners: 0, sampleCards: 0 },
        { id: 104, sport: "tennis", home: "Nadal", away: "Djokovic", league: "ATP Finals", time: "Tomorrow 14:00", vip: 250, marketLabel: "Set Winner", sampleCorners: 0, sampleCards: 0 },
        { id: 105, sport: "cricket", home: "India", away: "Australia", league: "Test Series", time: "In 2 days", vip: 2000, marketLabel: "Match Winner", sampleCorners: 0, sampleCards: 0 },
       
        // more sample matches...
      ],

      // Lobby challenges (public)
      lobbyChallenges: [
        { id: 201, match: "Arsenal vs Chelsea", type: "Who will win?", tier: 250, players: ["Abel","Miki"], maxPlayers: 3 },
        { id: 202, match: "Lakers vs Warriors", type: "Winner", tier: 500, players: ["Sara"], maxPlayers: 5 },
        { id: 203, match: "Real vs Barca", type: "Winner + Goals", tier: 1000, players: ["Nahom","Teddy","Ruth"], maxPlayers: 8 },
      ],

      // My challenges (user-specific)
      myChallenges: [],

      // UI modals & forms
      modals: { create: false, login: false, register: false },
      createForm: { matchId: "", type: "winner", tier: 250, maxPlayers: 3, note: "" },

      // login/register forms simulation
      authForm: { phone: "", password: "" },
      regForm: { name: "", phone: "", password: "" },

      // basic search debouncing
      searchTimeout: null,
    };
  },
  computed: {
    // Label for selected sport
    selectedSportLabel() {
      const s = this.sports.find(x => x.key === this.selectedSport);
      return s ? s.label : "All sports";
    },
    // Matches filtered by sport, VIP, and search
    filteredMatches() {
      let list = this.allMatches.filter(m => m.sport === this.selectedSport && m.vip >= this.selectedTier ? m.vip === this.selectedTier : true);
      // apply search
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(m => m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q) || m.league.toLowerCase().includes(q));
      }
      // sort
      if (this.sortBy === "time") {
        return list;
      } else if (this.sortBy === "vip") {
        return list.sort((a,b) => b.vip - a.vip);
      } else if (this.sortBy === "popularity") {
        return list.sort((a,b) => (b.sampleCorners + b.sampleCards) - (a.sampleCorners + a.sampleCards));
      }
      return list;
    },
    // challenges filtered for lobby: by selected tier and sport
    challengesFilteredLobby() {
      return this.lobbyChallenges.filter(c => c.tier === this.selectedTier);
    }
  },
  methods: {
    // quick helpers
    openCreateModal() { this.modals.create = true; this.createForm = { matchId: "", type: "winner", tier: this.selectedTier, maxPlayers: 3, note: "" }; },
    closeCreateModal() { this.modals.create = false; },

    openQuickCreateFromMatch(match) {
      this.createForm.matchId = match.id;
      this.createForm.tier = match.vip;
      this.createForm.type = match.marketLabel === "Winner + Goals" ? "winner_goals" : "winner";
      this.modals.create = true;
    },

    // Creates a challenge (adds to lobby & myChallenges)
    submitCreate() {
      if (!this.createForm.matchId) { alert("Pick a match"); return; }
      const m = this.allMatches.find(x => x.id === this.createForm.matchId);
      if (!m) { alert("Invalid match"); return; }
      const newCh = {
        id: Date.now(),
        match: `${m.home} vs ${m.away}`,
        type: this.createForm.type,
        tier: this.createForm.tier,
        players: [ this.auth.logged ? this.auth.user.name : "Guest" ],
        maxPlayers: this.createForm.maxPlayers || 3,
        initiator: this.auth.logged ? this.auth.user.name : "Guest",
      };
      this.lobbyChallenges.unshift(newCh);
      // mark as my challenge if logged
      if (this.auth.logged) {
        this.myChallenges.unshift({ ...newCh, initiator: true });
      } else {
        this.myChallenges.unshift({ ...newCh, initiator: true });
      }
      this.modals.create = false;
      alert("Challenge created successfully!");
    },

    // Join public challenge
    joinPublic(ch) {
      if (ch.players.length >= ch.maxPlayers) { alert("Challenge is full"); return; }
      const userName = this.auth.logged ? this.auth.user.name : "You";
      if (ch.players.includes(userName)) { alert("You already joined"); return; }
      ch.players.push(userName);
      // reflect in myChallenges as joined
      this.myChallenges.unshift({ id: ch.id, match: ch.match, type: ch.type, tier: ch.tier, players: ch.players, maxPlayers: ch.maxPlayers, initiator: false });
      alert(`Joined ${ch.match}`);
    },

    // View challenge (placeholder)
    viewChallenge(ch) {
      alert(`Viewing challenge: ${ch.match} (VIP ${ch.tier})`);
    },

    // apply match from search quick list
    applyMatch(m) {
      this.selectedSport = m.sport;
      this.searchQuery = `${m.home} vs ${m.away}`;
      this.searchResults = [];
    },

    // explore match
    exploreMatch(match) {
      alert(`Explore ${match.home} vs ${match.away}\nMarket: ${match.marketLabel}\nCorners: ${match.sampleCorners}\nCards: ${match.sampleCards}`);
    },

    // auth simulation
    openLogin() { this.modals.login = true; },
    openRegister() { this.modals.register = true; },

    login() {
      if (!this.authForm.phone || !this.authForm.password) { alert("Enter phone and password"); return; }
      this.auth = { logged: true, user: { name: "PlayerOne", phone: this.authForm.phone, balance: 5000 } };
      this.modals.login = false;
      this.authForm = { phone: "", password: "" };
      alert("Logged in as PlayerOne");
    },
    register() {
      if (!this.regForm.name || !this.regForm.phone || !this.regForm.password) { alert("Fill all fields"); return; }
      this.auth = { logged: true, user: { name: this.regForm.name, phone: this.regForm.phone, balance: 0 } };
      this.modals.register = false;
      this.regForm = { name: "", phone: "", password: "" };
      alert("Registered and logged in");
    },
    logout() { this.auth = { logged: false, user: null }; alert("Logged out"); },

    // join challenge
    joinChallenge(challenge) {
      if (challenge.players.length >= challenge.maxPlayers) { alert("Full"); return; }
      if (!this.auth.logged) { alert("Please login to join"); return; }
      challenge.players.push(this.auth.user.name);
      this.myChallenges.unshift({ ...challenge, initiator: false });
      alert("You joined challenge");
    },

    // search debounce
    debouncedSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        if (!this.searchQuery) { this.searchResults = []; return; }
        const q = this.searchQuery.toLowerCase();
        this.searchResults = this.allMatches.filter(m => m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q) || m.league.toLowerCase().includes(q));
      }, 300);
    },

    // quick simulate a result (for demo)
    quickSimulate() {
      if (!this.lobbyChallenges.length) { alert("No public challenges to simulate"); return; }
      const ch = this.lobbyChallenges[Math.floor(Math.random()*this.lobbyChallenges.length)];
      alert(`Simulated result for ${ch.match}. Winner: ${ch.players[Math.floor(Math.random()*ch.players.length)]}`);
    },
  },
  mounted() {
    // default filters
    this.selectedSport = 'football';
    this.selectedTier = 250;
  }
};
</script>

<style scoped>
/* small utilities and colors that complement Tailwind */
.bg-gray-850 { background-color: #0f1724; } /* slightly lighter than black for panels */
.bg-gray-900 { background-color: #0b1220; }
.bg-white-5 { background-color: rgba(255,255,255,0.05); }

/* custom scrollbar for side lists */
::-webkit-scrollbar { height: 6px; width: 8px; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 6px; }
</style>
