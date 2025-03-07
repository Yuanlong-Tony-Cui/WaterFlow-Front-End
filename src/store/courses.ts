import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '@/api/courses';
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
        const index = courses.value.findIndex(c => c.code === updatedCourse.code);
        if (index !== -1) {
            courses.value[index] = updatedCourse;
        }
    }

    async function removeCourse(courseCode: string) {
        await deleteCourse(courseCode);
        courses.value = courses.value.filter(c => c.code !== courseCode);
    }

    return {
        courses, loadCourses, addCourse, editCourse, removeCourse
    };
});
