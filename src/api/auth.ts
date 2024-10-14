import apiClient from ".";
import * as SecureStore from "expo-secure-store";

const CLIENT_ID = process.env.EXPO_PUBLIC_SIGNUP_CLIENTID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_SIGNUP_SECRET;

export const getBearerToken = async (): Promise<string> => {
  try {
    const response = await apiClient.post("api/v1/oauth/token/", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    });

    await SecureStore.setItemAsync("access_token", response?.data.access_token);
    return response.data.access_token;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Error Setting Up Request:", error.message);
    }
    throw new Error("Authentication failed. Please try again.");
  }
};
