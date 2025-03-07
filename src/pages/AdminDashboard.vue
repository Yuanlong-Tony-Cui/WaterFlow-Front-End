<!-- AdminDashboard.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '@/store/courses';
import CourseCard from '@/components/CourseCard.vue';

const store = useCourseStore();
const searchQuery = ref('');

onMounted(() => store.loadCourses());

const filteredCourses = () => {
  return store.courses.filter(course =>
    course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.instructors?.some(instr => instr.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Course Management</h1>
    <input 
      v-model="searchQuery" 
      placeholder="Search courses..." 
      class="w-full p-2 border border-gray-300 rounded-lg mb-4"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard v-for="course in filteredCourses()" :key="course.code" :course="course" />
    </div>
  </div>
</template>
