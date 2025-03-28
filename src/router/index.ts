import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import StudentDashboard from '@/pages/StudentDashboard.vue';

const routes = [
  { path: '/', redirect: '/admin' },
  
  // Admin routes
  {
    path: '/admin',
    children: [
      { path: '', component: AdminDashboard },
    ]
  },

  // Student routes
  {
    path: '/student',
    children: [
      { path: '', component: StudentDashboard },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
