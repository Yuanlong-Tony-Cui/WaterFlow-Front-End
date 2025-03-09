import axios from 'axios';
import type { User } from '@/types/user';

const API_URL = 'http://localhost:3000/student';

// Fetch user details by ID
export async function fetchUser(userId: string): Promise<User> {
  const { data } = await axios.get(`${API_URL}/${userId}`);
  return data;
}

// Fetch courses a student is registered in
export async function fetchRegisteredCourses(studentId: string): Promise<User> {
  const { data } = await axios.get(`${API_URL}/${studentId}/courses`);
  return data;
}

// Register for a course (Student)
export async function registerForCourse(studentId: string, courseId: string): Promise<{ warning?: string; conflictingCourses?: Course[] }> {
  const { data } = await axios.post(`${API_URL}/register/${courseId}`, { studentId });
  return data; // returns warning on time conflicts
}

// Withdraw from a course (Student)
export async function withdrawFromCourse(studentId: string, courseId: string): Promise<void> {
  await axios.post(`${API_URL}/withdraw/${courseId}`, { studentId });
}
