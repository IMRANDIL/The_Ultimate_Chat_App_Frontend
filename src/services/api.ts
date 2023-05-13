import axios from "axios";

// Define your API base URL
const BASE_URL = "http://localhost:5000/api/v1/user";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Define your API endpoints and corresponding functions
export const login = (email: string, password: string) => {
  return axiosInstance.post("/login", { email, password });
};

export const register = (email: string, password: string, username: string) => {
  return axiosInstance.post("/signup", { email, password, username });
};

// You can add more API functions here as needed

export default axiosInstance;
