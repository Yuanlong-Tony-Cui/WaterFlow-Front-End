<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>

<!-- <template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 p-6 bg-gray-100">
      <router-view />
    </div>
  </div>
</template> -->

<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-6 w-full">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
