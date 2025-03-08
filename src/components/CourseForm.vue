<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import type { Course, Timeslot } from '@/types/course';

const emit = defineEmits(['save', 'close']);
const props = defineProps<{ course: Course | null }>();

const form = ref<Course | null>(null);
const isVisible = ref(false);

// Watch for incoming course data
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      // Clone so we don't mutate props directly
      form.value = {
        ...newCourse,
        // Ensure schedule is at least an empty array so v-for doesn't break
        schedule: newCourse.schedule ? [...newCourse.schedule] : [],
      };
      isVisible.value = true;
    } else {
      isVisible.value = false;
    }
  },
  { immediate: true }
);

// Add a new, empty timeslot
const addTimeslot = () => {
  if (form.value) {
    // If schedule is undefined, initialize it
    if (!form.value.schedule) {
      form.value.schedule = [];
    }
    form.value.schedule.push({
      day: '',
      startTime: '',
      endTime: '',
    });
  }
};

// Remove a timeslot
const removeTimeslot = (index: number) => {
  if (form.value?.schedule) {
    form.value.schedule.splice(index, 1);
  }
};

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
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-green-500 relative">
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg">
        ✖
      </button>

      <h2 class="text-lg font-semibold mb-4 text-green-700">
        {{ props.course ? 'Edit Course' : 'Add Course' }}
      </h2>

      <div class="grid grid-cols-1 gap-4">
        <!-- Course Code -->
        <div>
          <label class="block font-medium text-green-700">Course Code:</label>
          <input v-model="form.code" required class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- Course Name -->
        <div>
          <label class="block font-medium text-green-700">Course Name:</label>
          <input v-model="form.name" required class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- Location -->
        <div>
          <label class="block font-medium text-green-700">Location:</label>
          <input v-model="form.location" class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- Start Date -->
        <div>
          <label class="block font-medium text-green-700">Start Date:</label>
          <input type="date" v-model="form.startDate" required class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- End Date -->
        <div>
          <label class="block font-medium text-green-700">End Date:</label>
          <input type="date" v-model="form.endDate" required class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- Capacity -->
        <div>
          <label class="block font-medium text-green-700">Capacity:</label>
          <input type="number" v-model="form.capacity" required class="w-full p-2 border border-green-300 rounded-lg" />
        </div>

        <!-- SCHEDULE (timeslots) -->
        <div>
          <label class="block font-medium text-green-700 mb-2">Schedule:</label>
          <!-- Render each timeslot -->
          <div v-for="(timeslot, index) in form.schedule" :key="index" class="mb-2 border p-2 rounded">
            <label class="block mb-1 text-green-700">Day:</label>
            <select v-model="timeslot.day" class="mb-2 w-full p-2 border border-green-300 rounded-lg">
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>

            <label class="block mb-1 text-green-700">Start Time:</label>
            <input
              type="time"
              v-model="timeslot.startTime"
              class="mb-2 w-full p-2 border border-green-300 rounded-lg"
            />

            <label class="block mb-1 text-green-700">End Time:</label>
            <input
              type="time"
              v-model="timeslot.endTime"
              class="mb-2 w-full p-2 border border-green-300 rounded-lg"
            />

            <!-- Remove timeslot -->
            <button
              class="bg-red-500 text-white px-2 py-1 rounded text-sm"
              @click="removeTimeslot(index)"
            >
              Remove
            </button>
          </div>

          <!-- Add timeslot -->
          <button
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            @click="addTimeslot"
          >
            + Add Timeslot
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 mt-6">
        <button @click="closeModal" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        <button @click="handleSubmit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
