// api.ts
import axios, {AxiosResponse, AxiosError} from 'axios';
import {
  ApiActionTypes,
  ApiAction,
  ApiSuccessAction,
  ApiFailureAction,
  ApiError,
} from './apiTypes';

const BASE_URL = 'https://api.example.com'; // Replace with your API base URL

// Utility function to create Axios instance with default configurations
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Adjust the timeout according to your needs
  });

  return instance;
};

// Dispatch API request action
const apiRequest = (): ApiAction<undefined> => ({
  type: ApiActionTypes.REQUEST,
});

// Dispatch API success action
const apiSuccess = <T>(
  data: T,
  status: number,
  statusText: string,
): ApiSuccessAction<T> => ({
  type: ApiActionTypes.SUCCESS,
  payload: {
    data,
    status,
    statusText,
  },
});

// Dispatch API failure action
const apiFailure = (error: ApiError): ApiFailureAction => ({
  type: ApiActionTypes.FAILURE,
  payload: error,
});

// Handle Axios response
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

// Handle Axios error
const handleError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.message,
    };
  } else if (error.request) {
    return {
      status: 0,
      statusText: 'Network Error',
      message: 'Network Error',
    };
  } else {
    return {
      status: -1,
      statusText: 'Unknown Error',
      message: 'Unknown Error',
    };
  }
};

// Make an API request
export const makeApiRequest = <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
) => {
  return async (dispatch: (action: ApiAction<T>) => void) => {
    dispatch(apiRequest());

    const instance = createAxiosInstance();

    try {
      const response = await instance.request<T>({
        url,
        method,
        data,
      });

      const responseData = handleResponse<T>(response);
      dispatch(
        apiSuccess<T>(responseData, response.status, response.statusText),
      );
    } catch (error) {
      const apiError = handleError(error);
      dispatch(apiFailure(apiError));
    }
  };
};
