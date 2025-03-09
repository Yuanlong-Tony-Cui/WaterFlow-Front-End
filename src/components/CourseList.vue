<script setup lang="ts">
import { useCourseStore } from '@/store/courses';

const store = useCourseStore();

const deleteCourse = (courseId: string) => {
  store.removeCourse(courseId);
};
</script>

<template>
  <div>
    <h2>Course List</h2>
    <ul>
      <li v-for="course in store.courses" :key="course.code">
        {{ course.code }} - {{ course.name }}
        <button @click="deleteCourse(course._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
