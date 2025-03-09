<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import type { Course } from '@/types/course';

const props = defineProps<{ courses: Course[] }>();
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const selectedWeek = ref<string>("2024-09-09"); // default week of interest

// Define 6 distinct colours
const courseColours = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-purple-200", "bg-pink-200", "bg-orange-200"];

// Function to get a color index for a course (hashing _id)
const getCourseColour = (courseId: string) => {
  const hash = [...courseId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return courseColours[hash % courseColours.length]; // Map to one of the 6 colors
};

// Filter courses that are active in the selected week
const filteredCourses = computed(() => {
  return props.courses.filter(course => {
    const courseStart = new Date(course.startDate);
    const courseEnd = new Date(course.endDate);
    const selectedDate = new Date(selectedWeek.value);
    return selectedDate >= courseStart && selectedDate <= courseEnd;
  });
});

// Group courses by day
const schedule = computed(() => {
  const result: Record<string, { name: string; startTime: string; endTime: string; colour: string }[]> = {};
  daysOfWeek.forEach(day => (result[day] = []));

  filteredCourses.value.forEach(course => {
    course.schedule.forEach(session => {
      if (result[session.day]) {
        result[session.day].push({
          name: course.name,
          startTime: session.startTime,
          endTime: session.endTime,
          colour: getCourseColour(course._id), // Assign color dynamically
        });
      }
    });
  });
  return result;
});
</script>

<template>
  <div>
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Select Week:</label>
      <input type="date" v-model="selectedWeek" class="p-2 border border-gray-300 rounded-lg" />
    </div>

    <div class="grid grid-cols-7 gap-2 p-4 border border-gray-300 rounded-lg">
      <div v-for="day in daysOfWeek" :key="day" class="border p-2 rounded-md bg-gray-100 min-h-[100px]">
        <h3 class="text-center font-bold text-gray-700">{{ day }}</h3>
        <div v-for="session in schedule[day]" :key="session.startTime" class="mt-2 p-2 bg-green-200 text-green-900 rounded text-center">
          <p class="text-sm font-semibold">{{ session.name }}</p>
          <p class="text-xs">{{ session.startTime }} - {{ session.endTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
