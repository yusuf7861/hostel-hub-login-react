
import { apiClient } from "./client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

// Auth API calls
export const authApi = {
  // Register a new user (admin, warden)
  register: async (userData: RegisterData) => {
    const response = await apiClient.post("/register", userData);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await apiClient.post("/login?logout=true");
    return response.data;
  },
};
