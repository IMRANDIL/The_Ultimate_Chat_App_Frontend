import axios from "axios";
import { useCookies } from "react-cookie";
// Define your API base URL
const BASE_URL = "http://localhost:5000/api/v1/user";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await axiosInstance.post("/signup", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

// You can add more API functions here as needed

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/forgot-password", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const resetPassword = async (
  newPassword: string,
  resetToken: string
) => {
  try {
    const response = await axiosInstance.post(`/reset-password`, {
      newPassword,
      resetToken,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const getAllUser = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get(`/allUser`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};
export default axiosInstance;
