
import { apiClient } from "./client";

export interface Student {
  id?: number;
  name: string;
  email: string;
  rollNumber: string;
  contactNumber: string;
  hostelId?: number;
  roomId?: number;
}

export interface StudentRegistration {
  name: string;
  email: string;
  password: string;
  rollNumber: string;
  contactNumber: string;
}

// Student API calls
export const studentApi = {
  // Update student information
  updateStudent: async (studentData: Partial<Student>) => {
    const response = await apiClient.put("/api/student/update", studentData);
    return response.data;
  },

  // Register a new student
  registerStudent: async (registrationData: StudentRegistration) => {
    const response = await apiClient.post("/api/student/register", registrationData);
    return response.data;
  },

  // Get all students
  getAllStudents: async () => {
    const response = await apiClient.get("/api/student/students");
    return response.data;
  },

  // Get student profile
  getStudentProfile: async () => {
    const response = await apiClient.get("/api/student/profile");
    return response.data;
  },
};
