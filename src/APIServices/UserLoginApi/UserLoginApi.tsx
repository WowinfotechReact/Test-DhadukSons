// src/APIServices/UserLoginApi/UserLoginApi.ts
import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// Interfaces
export interface LoginParams {
  phone: string;
  email: string;
  user_country: string;
}
export interface otp {
  phone: string;
  otp: string;
  email: string;
  user_country: string;
}

export interface ProfileParam {
  userKeyID: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  user_country: string;
}
export interface userKeyID {
  userKeyID: string;
}
// Login API
export const loginUser = async (params: LoginParams) => {
  const url = `${Base_URL}/user/loginUser`;
  return await postApiWithAuthorization(url, params);
};
export const verifyOtp = async (params: otp) => {
  const url = `${Base_URL}/user/verify-otp`;
  return await postApiWithAuthorization(url, params);
};
// Register API
export const addUpdateUserData = async (params: ProfileParam) => {
  const url = `${Base_URL}/user/addUpdateUser`;
  return await postApiWithAuthorization(url, params);
};
export const register = async (params: ProfileParam) => {
  const url = `${Base_URL}/user/register`;
  return await postApiWithAuthorization(url, params);
};

export const getUserProfile = async (userKeyID: userKeyID) => {
  const url = `${Base_URL}/user/getUserDetails?userKeyID=${userKeyID.userKeyID}`;
  return await getApiWithAuthorization(url);
};
