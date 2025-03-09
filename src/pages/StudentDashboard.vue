<!-- StudentDashboard.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '@/store/courses';
import { useUserStore } from '@/store/user';
import CourseCard from '@/components/CourseCard.vue';
import WeeklySchedule from '@/components/WeeklySchedule.vue';
import type { Course } from '@/types/course';

const store = useCourseStore();
const userStore = useUserStore();
const searchQuery = ref('');
const showRegisterConfirm = ref(false);
const courseToRegister = ref<string | null>(null);
const showConflictWarning = ref(false);
const conflictingCourses = ref<Course[]>([]);

onMounted(async () => {
  try {
    await store.loadCourses();
    await userStore.loadRegisteredCourses();
  } catch (error) {
    console.error("Error loading courses or user data:", error);
  }
});

const filteredCourses = () => {
  return store.courses.filter(course =>
    !userStore.registeredCourses.some(registered => registered.code === course.code) && // excludes registered courses
    (
      course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
};

const confirmRegisterCourse = (courseId: string) => {
  courseToRegister.value = courseId;
  showRegisterConfirm.value = true;
};

const registerForCourse = async () => {
  if (courseToRegister.value) {
    try {
      const response = await userStore.register(courseToRegister.value);
      if (response?.warning) {
        // If conflict warning is received from backend, show warning modal
        showConflictWarning.value = true;
        conflictingCourses.value = response.conflictingCourses;
      } else {
        // If no conflict, refresh data
        await store.loadCourses();
        await userStore.loadRegisteredCourses();
      }
    } catch (error) {
      console.error("Error registering for course:", error);
    }
  }
  showRegisterConfirm.value = false;
  courseToRegister.value = null;
};

const withdrawFromCourse = async (courseId: string) => {
  try {
    await userStore.withdraw(courseId);
    await store.loadCourses();
    await userStore.loadRegisteredCourses();
  } catch (error) {
    console.error("Error withdrawing from course:", error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Student Dashboard</h1>
    <div class="flex justify-between mb-4">
      <input 
        v-model="searchQuery" 
        placeholder="Search courses" 
        class="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    <h2 class="text-xl font-semibold mb-2">Available Courses</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard v-for="course in filteredCourses()" :key="course.code" :course="course" @register="confirmRegisterCourse" />
    </div>

    <h2 class="text-xl font-semibold mt-6 mb-2">Registered Courses</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard v-for="course in userStore.registeredCourses" :key="course.code" :course="course" @withdraw="withdrawFromCourse" />
    </div>
    
    <h2 class="text-xl font-semibold mt-6 mb-2">Weekly Schedule</h2>
    <WeeklySchedule :courses="userStore.registeredCourses" />
  </div>

  <!-- Register Confirmation Modal -->
  <Teleport to="body">
    <div v-if="showRegisterConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold">Confirm Registration</h2>
        <p class="mt-2">Are you sure you want to register for this course?</p>
        <div class="flex justify-end gap-4 mt-4">
          <button @click="showRegisterConfirm = false" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button @click="registerForCourse" class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">Register</button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Schedule Conflict Warning Modal -->
  <Teleport to="body">
    <div v-if="showConflictWarning" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 class="text-lg font-semibold text-yellow-600">Schedule Conflict</h2>
        <p class="mt-2 text-gray-700">You cannot register for this course due to a time conflict with:</p>
        <ul class="list-disc pl-5 mt-2 text-sm text-gray-700">
          <li v-for="conflict in conflictingCourses" :key="conflict._id">
            {{ conflict.name }} ({{ conflict.code }})
          </li>
        </ul>
        <p class="mt-2 text-gray-600">Please withdraw from conflicting courses before registering.</p>
        <div class="flex justify-end mt-4">
          <button @click="showConflictWarning = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
