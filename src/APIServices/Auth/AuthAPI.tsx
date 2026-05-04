import { Base_URL } from "../../components/Base_URL";
import { postApiWithoutAuthorization } from "../APIServices/APIServices";

// Define the expected shape of the login parameters
interface LoginParams {
  email: string;
  password: string;
}

export const LoginAPI = async (params: LoginParams) => {
  const url = `${Base_URL}/auth/login`;
  const res = await postApiWithoutAuthorization(url, params);
  return res;
};
