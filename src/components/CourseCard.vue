<script setup lang="ts">
import type { Course } from '@/types/course';
import { defineProps, defineEmits, computed } from 'vue';
import { useUserStore } from '@/store/user';

const props = defineProps<{ course: Course }>();
const emit = defineEmits(["edit", "delete", "register", "withdraw"]);

const userStore = useUserStore();
const isRegistered = computed(() => userStore.registeredCourses.some(c => c._id === props.course._id));
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
    <h2 class="text-lg font-semibold text-green-700">{{ course.name }}</h2>
    <p class="text-gray-600 font-medium">{{ course.code }}</p>
    <p class="text-sm text-gray-500">Instructor: {{ course.instructor }}</p>
    <p class="text-gray-700 mt-2">{{ course.description }}</p>

    <div class="flex justify-between mt-4">
      <!-- Admin Actions -->
      <button v-if="$route.path.includes('admin')" class="text-white py-1 px-3 rounded bg-green-600 hover:bg-green-700" @click="emit('edit', course)">
        Edit
      </button>
      <button v-if="$route.path.includes('admin')" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700" @click="emit('delete', course._id)">
        Delete
      </button>

      <!-- Student Actions -->
      <button v-if="$route.path.includes('student')"
        :disabled="isRegistered"
        class="py-1 px-3 rounded text-white transition-colors"
        :class="isRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'"
        @click="emit('register', course._id)"
        :title="isRegistered ? 'Already registered for this course' : ''">
        Register
      </button>

      <button v-if="$route.path.includes('student')"
        :disabled="!isRegistered"
        class="py-1 px-3 rounded text-white transition-colors"
        :class="!isRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'"
        @click="emit('withdraw', course._id)"
        :title="!isRegistered ? 'Not registered for this course' : ''">
        Withdraw
      </button>
    </div>
  </div>
</template>
