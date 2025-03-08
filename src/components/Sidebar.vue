<script setup lang="ts">
import { HomeIcon, BookOpenIcon } from 'lucide-vue-next';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, route: '/admin' },
  { name: 'Courses', icon: BookOpenIcon, route: '/admin/courses' }
];
</script>

<template>
  <div class="w-64 bg-green-600 text-white h-full p-4">
    <h2 class="text-lg font-semibold mb-6">Admin Panel</h2>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.name" class="mb-2">
          <router-link :to="item.route" class="flex items-center p-3 rounded hover:bg-green-700">
            <component :is="item.icon" class="w-5 h-5 mr-2" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
a {
  transition: background-color 0.3s;
}
</style>
