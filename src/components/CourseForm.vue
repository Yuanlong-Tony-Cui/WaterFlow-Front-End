<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import type { Course } from '@/types/course';

const emit = defineEmits(['save', 'close']);
const props = defineProps<{ course: Course | null }>();

// Default course structure to prevent null errors
const defaultCourse: Course = {
  code: '',
  name: '',
  description: '',
  instructors: [],
  location: '',
  startDate: '',
  endDate: '',
  schedule: [],
  makeupLectures: [],
  noClassDates: [],
  capacity: 0,
  registeredStudents: []
};

const form = ref<Course>({ ...defaultCourse });
const isVisible = ref(false);

// Ensure a fresh copy of the course is used to prevent reactivity issues
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      form.value = { ...newCourse };
    } else {
      form.value = { ...defaultCourse };
    }
    isVisible.value = !!newCourse;
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('save', { ...form.value });
  closeModal();
};

const closeModal = () => {
  isVisible.value = false;
  emit('close');
};

// Ensure schedule is always an array before adding new entries
const addSchedule = () => {
  if (!form.value.schedule) {
    form.value.schedule = [];
  }
  form.value.schedule.push({ day: '', startTime: '', endTime: '' });
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 overflow-auto">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-green-500 relative max-h-[90vh] overflow-y-auto scrollbar-left">
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
            <label class="block font-medium text-green-700">Description:</label>
            <textarea v-model="form.description" class="w-full p-2 border border-green-300 rounded-lg"></textarea>
          </div>

          <div>
            <label class="block font-medium text-green-700">Instructors:</label>
            <input v-model="form.instructors" class="w-full p-2 border border-green-300 rounded-lg" />
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

          <div>
            <label class="block font-medium text-green-700">Makeup Lectures:</label>
            <div v-for="(lecture, index) in form.makeupLectures" :key="index" class="flex gap-2">
              <input type="date" v-model="lecture.date" class="w-1/3 p-2 border border-green-300 rounded-lg" />
              <input type="time" v-model="lecture.startTime" class="w-1/3 p-2 border border-green-300 rounded-lg" />
              <input type="time" v-model="lecture.endTime" class="w-1/3 p-2 border border-green-300 rounded-lg" />
            </div>
            <button @click="form.makeupLectures?.push({ date: '', startTime: '', endTime: '' })" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Makeup Lecture</button>
          </div>

          <div>
            <label class="block font-medium text-green-700">No Class Dates:</label>
            <input type="date" v-model="form.noClassDates" multiple class="w-full p-2 border border-green-300 rounded-lg" />
          </div>

          <div>
            <label class="block font-medium text-green-700">Schedule:</label>
            <div v-for="(session, index) in form.schedule" :key="index" class="flex gap-2">
              <select v-model="session.day" class="w-1/3 p-2 border border-green-300 rounded-lg">
                <option v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :key="day" :value="day">{{ day }}</option>
              </select>
              <input type="time" v-model="session.startTime" class="w-1/3 p-2 border border-green-300 rounded-lg" />
              <input type="time" v-model="session.endTime" class="w-1/3 p-2 border border-green-300 rounded-lg" />
            </div>
            <button @click="form.schedule.push({ day: '', startTime: '', endTime: '' })" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Schedule</button>
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

<style>
.scrollbar-left::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-left::-webkit-scrollbar-thumb {
  background-color: #A0A0A0;
  border-radius: 4px;
}

.scrollbar-left::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollbar-left {
  direction: rtl;
}

.scrollbar-left > * {
  direction: ltr;
}
</style>
