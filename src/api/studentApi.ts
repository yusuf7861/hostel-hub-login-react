import { apiClient } from "./client";

export interface Student {
  id?: number;
  name: string;
  guardianName: string;
  guardianContactNumber: string;
  gender: string;
  phone: string; // validated to be 10 digits
  department: string;
  collegeName: string;
  address: string;
}

export interface StudentRegistration {
  "name": string,
  "guardianName": string,
  "guardianContactNumber": string,
  "gender": string,
  "phone": string, // Changed from number to string to match usage
  "department": string,
  "collegeName": string,
  "address": string
}

export interface UpdateStudent {
  "guardianContactNumber": string,
  "phone": string,
  "address": string,
}

// Student API calls
export const studentApi = {
  // Update student information
  updateStudent: async (updateData: UpdateStudent) => {
    const response = await apiClient.put("/api/student/update", updateData);
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
