// TokenAuthorization.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { Base_URL } from "../../components/Base_URL";

interface ApiResponse<T = any> {
  statusCode?: number;
  message?: string;
  token?: string;
  [key: string]: any;
}

interface AuthUser {
  token: string;
  [key: string]: any;
}

// Helper function to extract token from localStorage
const getToken = (): string | null => {
  try {
    // try multiple possible keys for backward compatibility
    const storedAuth =
      JSON.parse(localStorage.getItem("authUser") || "null") ||
      JSON.parse(localStorage.getItem("Userlogin") || "null") ||
      JSON.parse(localStorage.getItem("login") || "null");

    return storedAuth?.responseData?.data?.token || storedAuth?.token || null;
  } catch (err) {
    return null;
  }
};

// Handle authorization errors
const handleAuthorizationError = async (
  error: AxiosError<any>
): Promise<AxiosError> => {
  if (error?.response?.data?.message === "Invalid credentials") {
    return error;
  }

  if (error.response?.status === 401) {
    localStorage.clear();
    window.location.replace("/login");
  }

  return error;
};

// POST API with Authorization
export const postApiWithAuthorization = async <T = any>(
  url: string,
  data: any
): Promise<T | AxiosError> => {
  try {
    const token = getToken();
    const response: AxiosResponse<T> = await axios.post(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// PATCH API with Authorization
export const patchApiWithAuthorization = async <T = any>(
  url: string,
  data: any
): Promise<T | AxiosError> => {
  try {
    const token = getToken();
    const response: AxiosResponse<T> = await axios.patch(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// POST API without Authorization
export const postApiWithoutAuthorization = async <T = any>(
  url: string,
  data: any
): Promise<T | AxiosError> => {
  try {
    const response: AxiosResponse<T> = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// GET API with Authorization
export const getApiWithAuthorization = async <T = any>(
  url: string
): Promise<T | AxiosError> => {
  try {
    const token = getToken();
    const response: AxiosResponse<T> = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// GET API without Authorization
export const getApiWithoutAuthorization = async <T = any>(
  url: string
): Promise<T | AxiosError> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// PUT API without Authorization
export const putApiWithoutAuthorization = async <T = any>(
  url: string,
  data: any
): Promise<T | AxiosError> => {
  try {
    const response: AxiosResponse<T> = await axios.put(url, data);
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};

// DELETE API without Authorization
export const deleteApiWithoutAuthorization = async <T = any>(
  url: string
): Promise<T | AxiosError> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    return handleAuthorizationError(error);
  }
};
