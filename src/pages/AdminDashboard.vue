<!-- AdminDashboard.vue -->
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
const showDeleteConfirm = ref(false);
const courseToDelete = ref<string | null>(null);

onMounted(async () => {
  try {
    await store.loadCourses();
  } catch (error) {
    console.error("Error loading courses:", error);
  }
});

const filteredCourses = () => {
  return store.courses.filter(course =>
    course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return dateStr.split("T")[0]; // extracts YYYY-MM-DD
};

const editCourse = (course: Course) => {
  console.log("editCourse() Editing course:", course);
  selectedCourse.value = {
    ...course,
    startDate: formatDate(course.startDate),
    endDate: formatDate(course.endDate),
    makeupLectures: course.makeupLectures?.map(lecture => ({
      ...lecture,
      date: formatDate(lecture.date)
    })),
    noClassDates: course.noClassDates?.map(formatDate)
  };
  showForm.value = true; // Open modal
};

const addCourse = () => {
  selectedCourse.value = {
    _id: '',
    code: '',
    name: '',
    description: '',
    instructor: '',
    location: '',
    startDate: '',
    endDate: '',
    schedule: [],
    capacity: 0,
    registeredStudents: []
  };
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  selectedCourse.value = null;
};

const saveCourse = async (updatedCourse: Course) => {
  try {
    await store.editCourse(updatedCourse._id, updatedCourse);
    await store.loadCourses(); // Reload courses after update
  } catch (error) {
    console.error("Error updating course:", error);
  }
  closeForm();
};

const confirmDeleteCourse = (courseCode: string) => {
  courseToDelete.value = courseCode;
  showDeleteConfirm.value = true;
};

const deleteCourse = async () => {
  if (courseToDelete.value) {
    try {
      await store.removeCourse(courseToDelete.value);
      await store.loadCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }
  showDeleteConfirm.value = false;
  courseToDelete.value = null;
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Course Management</h1>
    <div class="flex justify-between mb-4">
      <input 
        v-model="searchQuery" 
        placeholder="Search courses..." 
        class="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button @click="addCourse" class="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap">Add Course</button>
    </div>

    <!-- Course Form Modal -->
    <CourseForm v-if="showForm" :course="selectedCourse" @save="saveCourse" @close="closeForm" />

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold">Confirm Delete</h2>
          <p class="mt-2">Are you sure you want to delete this course?</p>
          <div class="flex justify-end gap-4 mt-4">
            <button @click="showDeleteConfirm = false" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button @click="deleteCourse" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
      </div>
    </Teleport>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard v-for="course in filteredCourses()" :key="course.code" :course="course" @edit="editCourse" @delete="confirmDeleteCourse" />
    </div>
  </div>
</template>
