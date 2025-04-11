
import { apiClient } from "./client";
import { Student } from "./studentApi";

export interface Warden {
  id?: number;
  name: string;
  email: string;
  contactNumber: string;
}

export interface WardenAssignment {
  wardenId: number;
  hostelId: number;
}

export interface Room {
  number: string;
  type: string;
  capacity: number;
  hostelId: number;
}

// Admin API calls
export const adminApi = {
  // Add a new warden
  addWarden: async (wardenData: Warden) => {
    const response = await apiClient.post("/api/admin/wardens/add", wardenData);
    return response.data;
  },

  // Assign a warden to a hostel
  assignWarden: async (assignmentData: WardenAssignment) => {
    const response = await apiClient.post("/api/admin/warden/assign", assignmentData);
    return response.data;
  },

  // Add a new room
  addRoom: async (roomData: Room) => {
    const response = await apiClient.post("/api/admin/rooms/add", roomData);
    return response.data;
  },

  // Get all wardens
  getAllWardens: async () => {
    const response = await apiClient.get<Warden[]>("/api/admin/wardens");
    return response.data;
  },

  // Get all students
  getAllStudents: async () => {
    const response = await apiClient.get<Student[]>("/api/admin/students");
    return response.data;
  },
};
