import axios from "axios";
// Define your API base URL
const BASE_URL = "http://localhost:5000/api/v1";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
  file: string
) => {
  try {
    const response = await axiosInstance.post("/user/signup", {
      email,
      password,
      username,
      file,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

// You can add more API functions here as needed

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/user/forgot-password", {
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
    const response = await axiosInstance.post(`/user/reset-password`, {
      newPassword,
      resetToken,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const getAllUser = async (search: string) => {
  try {
    const response = await axiosInstance.get(`/user/allUser?search=${search}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const userLogout = async () => {
  try {
    const response = await axiosInstance.get(`/user/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const getAccessToken = async () => {
  try {
    const response = await axiosInstance.post(`/user/access-token`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const createChat = async (participantId: string) => {
  try {
    const response = await axiosInstance.post(
      `/chats`,
      { participantId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const fetchChats = async () => {
  try {
    const response = await axiosInstance.get(`/chats`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const createGroupChat = async (name: string, participants: []) => {
  try {
    const response = await axiosInstance.post(
      `/chats/group`,
      {
        name: name,
        participants: JSON.stringify(
          participants.map((participant) => participant._id)
        ),
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const renameGroupChat = async (chatId: string, chatName: string) => {
  try {
    const response = await axiosInstance.put(
      `/chats/rename-group`,
      {
        chatId,
        chatName,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const addToGroupChat = async (chatId: string, participantId: string) => {
  try {
    const response = await axiosInstance.post(
      `/chats/add-to-group`,
      {
        chatId,
        participantId,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const removeToGroupChat = async (
  chatId: string,
  participantId: string
) => {
  try {
    const response = await axiosInstance.post(
      `/chats/remove-from-group`,
      {
        chatId,
        participantId,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const sendMessage = async (chatId: string, content: string) => {
  try {
    const response = await axiosInstance.post(
      `/messages`,
      {
        chatId,
        content,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export const fetchAllMessage = async (chatId: string) => {
  try {
    const response = await axiosInstance.get(
      `/messages/${chatId}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

export default axiosInstance;
