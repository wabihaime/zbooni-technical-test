import { LoginFormValues } from "@/types/auth";
import apiClient from ".";

const CLIENT_ID = process.env.EXPO_PUBLIC_LOGIN_CLIENTID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_LOGIN_SECRET;

interface LoginRequest {
  username: string;
  password: string;
}

export const loginUser = async (userCredentials: LoginRequest) => {
  try {
    const response = await apiClient.post("/api/v1/oauth/token/", {
      ...userCredentials,
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("Login Error Response:", error.response.data);
    }

    return error.response;
  }
};
