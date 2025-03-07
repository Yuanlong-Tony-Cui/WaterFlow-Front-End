<script setup lang="ts">
import { ref } from 'vue';
import type { Course } from '@/types/course';

const props = defineProps<{ course?: Course }>();
const emit = defineEmits(['submit']);

const form = ref<Course>(
  props.course || {
    code: '',
    name: '',
    description: '',
    instructors: [],
    location: '',
    startDate: '',
    endDate: '',
    schedule: [],
    capacity: 0,
    registeredStudents: []
  }
);

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>Course Code:</label>
    <input v-model="form.code" required />

    <label>Course Name:</label>
    <input v-model="form.name" required />

    <label>Location:</label>
    <input v-model="form.location" />

    <label>Start Date:</label>
    <input type="date" v-model="form.startDate" required />

    <label>End Date:</label>
    <input type="date" v-model="form.endDate" required />

    <label>Capacity:</label>
    <input type="number" v-model="form.capacity" required />

    <button type="submit">Save Course</button>
  </form>
</template>
