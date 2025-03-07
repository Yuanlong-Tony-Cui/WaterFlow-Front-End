import axios from 'axios';
import type { Course } from '@/types/course';

const API_URL = 'http://localhost:3000/admin/courses';

export async function fetchCourses(): Promise<Course[]> {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createCourse(course: Course): Promise<Course> {
  const { data } = await axios.post(API_URL, course);
  return data;
}

export async function updateCourse(course: Course): Promise<void> {
  await axios.put(`${API_URL}/${course.code}`, course);
}

export async function deleteCourse(courseCode: string): Promise<void> {
  await axios.delete(`${API_URL}/${courseCode}`);
}
