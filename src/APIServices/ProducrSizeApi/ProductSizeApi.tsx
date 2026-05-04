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
  productKeyID?: string | null; // 👈 Add this
  
}


interface AddAdminsParams {
  productSizeKeyID: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  phoneNo: string | null;
  status: string | null;
}

export const getAllProductSizes = async (params: GetAdminsParams) => {
  const url = `${Base_URL}/productSizes/getAllProductSizes`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateProductSize = async (params: AddAdminsParams) => {
  const url = `${Base_URL}/productSizes/addUpdateProductSize`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getProductSizeDetails = async (productSizeKeyID: string) => {
  const url = `${Base_URL}/productSizes/getProductSizeDetails?productSizeKeyID=${productSizeKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const changeProductSizeStatus = async (productSizeKeyID: string | null) => {
  const url = `${Base_URL}/productSizes/changeProductSizeStatus?productSizeKeyID=${productSizeKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const deleteProduct = async (productSizeKeyID: string | null) => {
  const url = `${Base_URL}/productSizes/deleteProduct?productSizeKeyID=${productSizeKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
