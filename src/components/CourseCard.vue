<script setup lang="ts">
import type { Course } from '@/types/course';
import { defineProps } from 'vue';

defineProps<{ course: Course }>();
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
    <h2 class="text-lg font-semibold text-green-700">{{ course.name }}</h2>
    <p class="text-gray-600">{{ course.code }}</p>
    <p class="text-sm text-gray-500">{{ course.instructors?.join(', ') }}</p>
    <p class="text-gray-700 mt-2">{{ course.description }}</p>
    <button class="mt-4 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">Edit</button>
  </div>
</template>
