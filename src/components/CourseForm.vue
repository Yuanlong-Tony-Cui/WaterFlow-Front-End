<!-- CourseForm.vue -->
<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import type { Course } from '@/types/course';

const emit = defineEmits(['save', 'close']);
const props = defineProps<{ course: Course | null }>();

const form = ref<Course | null>(null);
const isVisible = ref(false);

// Ensure a fresh copy of the course is used to prevent reactivity issues
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      form.value = { ...newCourse };
      isVisible.value = true; // Ensure modal opens when course is passed
      console.log("Modal opened with course:", form.value);
    } else {
      isVisible.value = false;
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (form.value) {
    emit('save', { ...form.value });
  }
  closeModal();
};

const closeModal = () => {
  isVisible.value = false;
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-green-500 relative">
        <!-- Close Button -->
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg">
          ✖
        </button>

        <h2 class="text-lg font-semibold mb-4 text-green-700">{{ props.course ? 'Edit Course' : 'Add Course' }}</h2>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block font-medium text-green-700">Course Code:</label>
            <input v-model="form.code" required class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">Course Name:</label>
            <input v-model="form.name" required class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">Location:</label>
            <input v-model="form.location" class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">Start Date:</label>
            <input type="date" v-model="form.startDate" required class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">End Date:</label>
            <input type="date" v-model="form.endDate" required class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">Capacity:</label>
            <input type="number" v-model="form.capacity" required class="w-full p-2 border border-green-300 rounded-lg" />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button @click="closeModal" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button @click="handleSubmit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
