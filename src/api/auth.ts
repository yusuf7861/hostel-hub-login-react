
import axios from "axios";
import { toast } from "sonner";

// Create axios instance with base URL
// In a real app, this would point to your backend API
export const api = axios.create({
  baseURL: "/api", // This is a placeholder, as we'll mock the API calls for now
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth types
export interface SignInData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

// Auth functions
export const signIn = async (data: SignInData): Promise<{ success: boolean }> => {
  // In a real app, this would make an actual API call
  // For now, we'll simulate a successful response after a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // For demo purposes, let's say any login succeeds
  toast.success("Signed in successfully!");
  return { success: true };
};

export const register = async (data: RegisterData): Promise<{ success: boolean }> => {
  // In a real app, this would make an actual API call
  // For now, we'll simulate a successful response after a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // For demo purposes, let's say any registration succeeds
  toast.success("Registered successfully!");
  return { success: true };
};
