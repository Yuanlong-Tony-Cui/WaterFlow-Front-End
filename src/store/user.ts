import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchRegisteredCourses, registerForCourse, withdrawFromCourse } from '@/api/users';
import type { User } from '@/types/user';
import type { Course } from '@/types/course';

// Mock Student Data
const mockStudent: User = {
    _id: '67ccfd4c028d9d90a51d8e85',
    role: 'student',
    name: 'Test Student',
    email: 'test.student@example.com',
    registeredCourses: [],
  };

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User>(mockStudent);
    const registeredCourses = ref<Course[]>([]); // stores full Course objects

    // Load registered courses
    async function loadRegisteredCourses() {
        if (!user.value) return;
        try {
            const data = await fetchRegisteredCourses(user.value._id);
            console.log("Registered courses:", data);
            registeredCourses.value = data;
        } catch (error) {
            console.error("Error fetching registered courses:", error);
        }
    }

    // Register for a course
    async function register(courseId: string) {
        if (!user.value) return;
        try {
            const response = await registerForCourse(user.value._id, courseId);

            if (response.warning) {
                return response; // propagates the warning to UI
            }

            await loadRegisteredCourses();
        } catch (error) {
            console.error("Error registering for course:", error);
        }
    }

    // Withdraw from a course
    async function withdraw(courseId: string) {
        if (!user.value) return;
        try {
            await withdrawFromCourse(user.value._id, courseId);
            await loadRegisteredCourses();
        } catch (error) {
            console.error("Error withdrawing from course:", error);
        }
    }

    return { user, registeredCourses, loadRegisteredCourses, register, withdraw };
});
