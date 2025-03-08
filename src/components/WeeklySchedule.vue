<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Course } from '@/types/course';

const props = defineProps<{ courses: Course[] }>();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Group courses by day
const schedule = computed(() => {
  const result: Record<string, Course[]> = {};
  daysOfWeek.forEach(day => (result[day] = []));
  props.courses.forEach(course => {
    course.schedule.forEach(session => {
      if (result[session.day]) {
        result[session.day].push(course);
      }
    });
  });
  return result;
});
</script>

<template>
  <div class="grid grid-cols-7 gap-2 p-4 border border-gray-300 rounded-lg">
    <div v-for="day in daysOfWeek" :key="day" class="border p-2 rounded-md bg-gray-100">
      <h3 class="text-center font-bold text-gray-700">{{ day }}</h3>
      <div v-for="course in schedule[day]" :key="course.code" class="mt-2 p-2 bg-green-200 text-green-900 rounded">
        <p class="text-sm font-semibold">{{ course.name }}</p>
        <p class="text-xs">{{ course.schedule.find(s => s.day === day)?.startTime }} - {{ course.schedule.find(s => s.day === day)?.endTime }}</p>
      </div>
    </div>
  </div>
</template>
