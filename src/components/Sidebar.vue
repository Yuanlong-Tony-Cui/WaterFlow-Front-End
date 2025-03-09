<script setup lang="ts">
import { HomeIcon, BookOpenIcon } from 'lucide-vue-next';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, route: '/admin' },
  { name: 'Courses', icon: BookOpenIcon, route: '/admin/courses' }
];
</script>

<template>
  <div class="h-screen w-64 bg-gray-800 text-white p-4 fixed">
    <h1 class="text-lg font-semibold mb-4">WaterFlow</h1>
    <h1 class="mb-4">Course Registration System</h1>
    <ul>
      <li class="mb-2">
        <router-link to="/admin" class="block p-2 rounded hover:bg-blue-500">Admin Dashboard</router-link>
      </li>
      <li>
        <router-link to="/student" class="block p-2 rounded hover:bg-blue-500">Student Dashboard</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  transition: background-color 0.3s;
}
</style>
