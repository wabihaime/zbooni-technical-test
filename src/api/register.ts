// src/api/register.ts

import apiClient from ".";
import { getBearerToken } from "./auth";

// Define the structure of your registration request
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
}

export const registerUser = async (userData: RegisterRequest) => {
  try {
    const token = await getBearerToken();

    const response = await apiClient.post(
      "/api/v1/users/",
      {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone_number: userData.countryCode + userData.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("Registration Error Response:", error.response.data);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Error Setting Up Request:", error.message);
    }
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};
