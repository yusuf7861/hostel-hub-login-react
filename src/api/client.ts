
import axios from "axios";
import { toast } from "sonner";

// Create axios instance with base URL
const API_BASE_URL = "http://localhost:8082"; // Update this to your actual API base URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);
