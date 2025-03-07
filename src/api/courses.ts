import axios from 'axios';
import type { Course } from '@/types/course';

const API_URL = 'http://localhost:3000/admin/courses';

// Fetch all courses
export async function fetchCourses(): Promise<Course[]> {
  const { data } = await axios.get(API_URL);
  return data;
}

// Create a new course
export async function createCourse(course: Course): Promise<Course> {
  const { data } = await axios.post(API_URL, course);
  return data;
}

// Edit (partially update) a course
export async function updateCourse(id: string, updatedData: Partial<Course>): Promise<Course> {
  const { data } = await axios.patch(`${API_URL}/${id}`, updatedData);
  return data;
}

// Delete a course
export async function deleteCourse(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
