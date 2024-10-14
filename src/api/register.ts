// src/api/register.ts

import apiClient from ".";
import { getBearerToken } from "./auth";

// Define the structure of your registration request
interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export const registerUser = async (userData: RegisterRequest) => {
  try {
    const token = await getBearerToken();

    const response = await apiClient.post("/api/v1/users/", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE API", response);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("Registration Error Response api:", error.response.data);
    }

    return error.response;
  }
};
