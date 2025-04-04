<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Course } from '@/types/course';

const props = defineProps<{ courses: Course[] }>();
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const selectedWeek = ref<string>("2024-09-09"); // default week of interest

const courseColors = [
  "bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-purple-200",
  "bg-pink-200", "bg-blue-200", "bg-teal-200", "bg-red-200"
]; // 8 distinct colours for courses

const assignedColors = new Map<string, string>(); // maps course ID to a colour

// getCourseColor(): assigns a unique color to each course
const getCourseColor = (courseId: string): string => {
  if (assignedColors.has(courseId)) {
    return assignedColors.get(courseId)!;
  }

  // Assign a unique color from the pool
  const usedColors = Array.from(assignedColors.values());
  const availableColors = courseColors.filter(color => !usedColors.includes(color));

  let color = availableColors.length > 0 ? availableColors[0] : courseColors[assignedColors.size % courseColors.length];

  assignedColors.set(courseId, color);
  return color;
};

// filteredCourses(): filters courses that are active in the selected week
const filteredCourses = computed(() => {
  return props.courses.filter(course => {
    const courseStart = new Date(course.startDate);
    const courseEnd = new Date(course.endDate);
    const selectedDate = new Date(selectedWeek.value);
    return selectedDate >= courseStart && selectedDate <= courseEnd;
  });
});

// schedule: maps a day to an array of sessions
const schedule = computed(() => {
  const result: Record<string, { name: string; startTime: string; endTime: string; color: string }[]> = {};
  daysOfWeek.forEach(day => (result[day] = []));

  filteredCourses.value.forEach(course => {
    course.schedule.forEach(session => {
      if (result[session.day]) {
        result[session.day].push({
          name: course.name,
          startTime: session.startTime,
          endTime: session.endTime,
          color: getCourseColor(course._id), // assigns colour dynamically
        });
      }
    });
  });

  // Sort sessions by startTime for each day
  for (const day of daysOfWeek) {
    result[day].sort((a, b) => {
      const timeToMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      };
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
  }

  return result;
});
</script>

<template>
  <div>
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Select Week:</label>
      <input type="date" v-model="selectedWeek" class="p-2 border border-gray-300 rounded" />
    </div>

    <div class="grid grid-cols-7 gap-2 p-4 border border-gray-300 rounded-lg">
      <div v-for="day in daysOfWeek" :key="day" class="border p-2 rounded-md bg-gray-100 min-h-[100px]">
        <h3 class="text-center font-bold text-gray-700">{{ day }}</h3>

        <!-- Sessions by `day` -->
        <div v-for="session in schedule[day]" 
          :key="session.startTime" 
          class="mt-2 p-2 text-gray-900 rounded text-center shadow-md"
          :class="session.color" 
        >
          <p class="text-sm font-semibold">{{ session.name }}</p>
          <p class="text-xs">{{ session.startTime }} - {{ session.endTime }}</p>
        </div>

      </div>
    </div>
  </div>
</template>
