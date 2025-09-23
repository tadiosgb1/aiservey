import { createRouter, createWebHistory } from "vue-router";

// ✅ Opened routes
import Home from '../views/opened/landing/Landing.vue';
import Login from '../views/opened/auth/login.vue';
import Registration from '../views/opened/auth/login.vue';
import ForgotPassword from '../views/opened/auth/forgotPassword.vue';
import Reset from '../views/opened/auth/reset.vue';
import AccessDenied from "../views/opened/auth/accessDenied.vue";

// ✅ Closed routes (only necessary ones)
import dashboard from '../views/closed/dashboard.vue';
import first_dash from '../views/closed/first_dash.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresGuest: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: "/register",
    name: "register",
    component: Registration,
    meta: { requiresGuest: true }
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    meta: { requiresGuest: true }
  },
  {
    path: "/reset/:token",
    name: "reset",
    component: Reset,
    meta: { requiresGuest: true }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "first-dash",
        name: "first-dash",
        component: first_dash,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "accessDenied",
    component: AccessDenied,
    meta: { requiresGuest: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresGuest && isAuthenticated) {
    next("/dashboard"); // redirect logged-in users to dashboard
  } else {
    next();
  }
});

export default router;
