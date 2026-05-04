import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces
interface GetAdminsParams {
  pageNo: number | null;
  pageSize: number | null;
  searchKeyWord?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}

interface AddAdminsParams {
  adminKeyID: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  phoneNo: string | null;
  status: string | null;
}

export const GetAllAdmins = async (params: GetAdminsParams) => {
  const url = `${Base_URL}/admin/getAllAdmins`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateAdminAPI = async (params: AddAdminsParams) => {
  const url = `${Base_URL}/auth/register`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getAdminByIDAPI = async (adminKeyID: string) => {
  const url = `${Base_URL}/admin/getAdminByID?adminKeyID=${adminKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const changeAdminStatusAPI = async (adminKeyID: string | null) => {
  const url = `${Base_URL}/admin/changeAdminStatus?adminKeyID=${adminKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
