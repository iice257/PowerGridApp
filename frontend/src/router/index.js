import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/ProfileView.vue';
import SettingsView from '../views/SettingsView.vue';
import CommunityView from '../views/CommunityView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/profile', name: 'profile', component: ProfileView },
  { path: '/settings', name: 'settings', component: SettingsView },
  { path: '/community', name: 'community', component: CommunityView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;