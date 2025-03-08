import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '@/pages/AdminDashboard.vue';

const routes = [
  { path: '/', redirect: '/admin/courses' },
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/courses', component: AdminDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
