
import { apiClient } from "./client";
import { Student } from "./studentApi";

// Warden API calls
export const wardenApi = {
  // Get all students under warden's hostel
  getStudents: async () => {
    const response = await apiClient.get<Student[]>("/api/warden/students");
    return response.data;
  },
};
