<script setup lang="ts">
import type { Course } from '@/types/course';
import { defineProps, defineEmits } from 'vue';

defineProps<{ course: Course }>();
const emit = defineEmits(["edit"]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
    <h2 class="text-lg font-semibold text-green-700">{{ course.name }}</h2>
    <p class="text-gray-600 font-medium">{{ course.code }}</p>
    <p class="text-sm text-gray-500">Instructor(s): {{ course.instructors?.join(', ') }}</p>
    <p class="text-gray-700 mt-2">{{ course.description }}</p>
    
    <div class="flex justify-between mt-4">
      <button 
        class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        @click="emit('edit', course)"
      >
        ✏️ Edit
      </button>
      <button 
        class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
        @click="$emit('delete', course.code)"
      >
        🗑 Delete
      </button>
    </div>
  </div>
</template>