
import { authApi, LoginCredentials, RegisterData } from "./authApi";
import { toast } from "sonner";

// Re-export the interfaces and auth functions
export { LoginCredentials, RegisterData };

// Auth functions that can be used throughout the app
export const signIn = async (data: LoginCredentials): Promise<{ success: boolean }> => {
  try {
    await authApi.login(data);
    toast.success("Signed in successfully!");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const register = async (data: RegisterData): Promise<{ success: boolean }> => {
  try {
    await authApi.register(data);
    toast.success("Registered successfully!");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const logout = async (): Promise<{ success: boolean }> => {
  try {
    await authApi.logout();
    toast.success("Logged out successfully!");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
