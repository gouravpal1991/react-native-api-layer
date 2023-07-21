import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {ApiRequest, ApiResponse} from './types';

const BASE_URL = 'https://api.example.com'; // Replace with your API base URL

// Create an instance of Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a reasonable timeout for API calls
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you might need (e.g., authentication tokens)
  },
});

// Define API endpoints
const endpoints = {
  EXAMPLE_ENDPOINT: '/example', // Replace this with your actual API endpoint
};

// Define API functions
export const api = {
  // Example API function to fetch data
  fetchData: async (): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.get(
        endpoints.EXAMPLE_ENDPOINT,
      );
      return response.data;
    } catch (error) {
      // Handle error here or throw it to be caught by the caller
      throw error;
    }
  },

  // Example API function to send data
  sendData: async (data: ApiRequest): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.post(
        endpoints.EXAMPLE_ENDPOINT,
        data,
      );
      return response.data;
    } catch (error) {
      // Handle error here or throw it to be caught by the caller
      throw error;
    }
  },
};
