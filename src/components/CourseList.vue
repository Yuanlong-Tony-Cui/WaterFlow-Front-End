<script setup lang="ts">
import { useCourseStore } from '@/store/courses';

const store = useCourseStore();

const deleteCourse = (code: string) => {
  store.removeCourse(code);
};
</script>

<template>
  <div>
    <h2>Course List</h2>
    <ul>
      <li v-for="course in store.courses" :key="course.code">
        {{ course.code }} - {{ course.name }}
        <button @click="deleteCourse(course.code)">Delete</button>
      </li>
    </ul>
  </div>
</template>
