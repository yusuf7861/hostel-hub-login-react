
import { apiClient } from "./client";

export interface Hostel {
  id: number;
  name: string;
  location: string;
  contactNumber: string;
}

// Public API calls (no auth required)
export const publicApi = {
  // Get all hostels
  getHostels: async () => {
    const response = await apiClient.get("/hostels");
    return response.data;
  },
};
