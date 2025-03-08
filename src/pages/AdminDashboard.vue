<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '@/store/courses';
import CourseCard from '@/components/CourseCard.vue';
import CourseForm from '@/components/CourseForm.vue';
import type { Course } from '@/types/course';

const store = useCourseStore();
const searchQuery = ref('');
const showForm = ref(false);
const selectedCourse = ref<Course | null>(null);

onMounted(async () => {
  try {
    await store.loadCourses();
  } catch (error) {
    console.error("Error loading courses:", error);
  }
});

// Filter courses based on search
const filteredCourses = () => {
  return store.courses.filter(course =>
    course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.instructors?.some(instr => instr.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

// Open form in "add" mode
// Open form in "add" mode
const openFormForNewCourse = () => {
  selectedCourse.value = {
    code: '',
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    schedule: [],
    capacity: 0,
    instructors: [],
    description: ''
  };
  showForm.value = true;
};

// Open form in "edit" mode
const editCourse = (course: Course) => {
  selectedCourse.value = { ...course }; // create a copy
  showForm.value = true;
};

// Called after user saves or cancels
const closeForm = () => {
  showForm.value = false;
  selectedCourse.value = null;
};

// Save or update course
const saveCourse = async (updatedCourse: Course) => {
  try {
    // If selectedCourse was non-null, we are editing; otherwise, add a new course
    if (selectedCourse.value) {
      // Edit existing
      await store.editCourse(updatedCourse.code, updatedCourse);
    } else {
      // Add new
      await store.addCourse(updatedCourse);
    }
    // Refresh list
    await store.loadCourses();
  } catch (error) {
    console.error("Error saving course:", error);
  }
  closeForm();
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Course Management</h1>

    <!-- Search Input -->
    <input 
      v-model="searchQuery" 
      placeholder="Search courses..." 
      class="w-full p-2 border border-gray-300 rounded-lg mb-4"
    />

    <!-- "Add Course" Button -->
    <button
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      @click="openFormForNewCourse"
    >
      Add Course
    </button>

    <!-- Course Form (Modal) -->
    <CourseForm
      v-if="showForm"
      :course="selectedCourse"
      @save="saveCourse"
      @close="closeForm"
    />

    <!-- Course List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard
        v-for="course in filteredCourses()"
        :key="course.code"
        :course="course"
        @edit="editCourse"
      />
    </div>
  </div>
</template>
