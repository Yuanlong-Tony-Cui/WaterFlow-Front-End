import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchCourses, createCourse, updateCourse, deleteCourse, registerCourse, withdrawCourse } from '@/api/courses';
import type { Course } from '@/types/course';

export const useCourseStore = defineStore('courseStore', () => {
    const courses = ref<Course[]>([]);

    async function loadCourses() {
        courses.value = await fetchCourses();
    }

    async function addCourse(course: Course) {
        const newCourse = await createCourse(course);
        courses.value.push(newCourse);
    }

    async function editCourse(id: string, updatedCourse: Course) {
        await updateCourse(id, updatedCourse);
        const index = courses.value.findIndex(c => c._id === updatedCourse._id);
        if (index !== -1) {
            courses.value[index] = updatedCourse;
        }
    }

    async function removeCourse(courseId: string) {
        await deleteCourse(courseId);
        courses.value = courses.value.filter(c => c._id !== courseId);
    }

    async function registerForCourse(courseId: string, studentId: string) {
        await registerCourse(courseId, studentId);
        await loadCourses(); // refreshes course list
    }

    async function withdrawFromCourse(courseId: string, studentId: string) {
        await withdrawCourse(courseId, studentId);
        await loadCourses(); // refreshes course list
    }

    return {
        courses,
        loadCourses,
        addCourse,
        editCourse,
        removeCourse,
        registerForCourse,
        withdrawFromCourse,
    };
});
