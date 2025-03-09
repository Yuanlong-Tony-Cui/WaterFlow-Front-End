import axios from 'axios';
import type { Course } from '@/types/course';

const ADMIN_API_URL = 'http://localhost:3000/admin/courses';
const STUDENT_API_URL = 'http://localhost:3000';

// Fetch all courses
export async function fetchCourses(): Promise<Course[]> {
  console.log('fetchCourses');
  const { data } = await axios.get(ADMIN_API_URL);
  return data;
}

// Create a new course (Admin)
export async function createCourse(course: Course): Promise<Course> {
  const { _id, ...courseData } = course;
  const { data } = await axios.post(ADMIN_API_URL, courseData);
  return data;
}

// Edit (partially update) a course (Admin)
export async function updateCourse(id: string, updatedData: Partial<Course>): Promise<Course> {
  const { data } = await axios.patch(`${ADMIN_API_URL}/${id}`, updatedData);
  return data;
}

// Delete a course (Admin)
export async function deleteCourse(id: string): Promise<void> {
  await axios.delete(`${ADMIN_API_URL}/${id}`);
}

// Register a student for a course
export async function registerCourse(courseId: string, studentId: string): Promise<Course> {
  const { data } = await axios.post(`${STUDENT_API_URL}/register/${courseId}`, { studentId });
  return data;
}

// Withdraw a student from a course
export async function withdrawCourse(courseId: string, studentId: string): Promise<Course> {
  const { data } = await axios.post(`${STUDENT_API_URL}/withdraw/${courseId}`, { studentId });
  return data;
}
