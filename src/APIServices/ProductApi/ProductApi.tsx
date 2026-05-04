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
  productKeyID: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  phoneNo: string | null;
  status: string | null;
}

export const getAllProducts = async (params: GetAdminsParams) => {
  const url = `${Base_URL}/product/getAllProducts`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateProduct = async (params: AddAdminsParams) => {
  const url = `${Base_URL}/product/addUpdateProduct`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getProductDetails = async (productKeyID: string) => {
  const url = `${Base_URL}/product/getProductDetails?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const changeProductStatus = async (productKeyID: string | null) => {
  const url = `${Base_URL}/product/changeProductStatus?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const deleteProduct = async (productKeyID: string | null) => {
  const url = `${Base_URL}/product/deleteProduct?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const getProductLookupList = async (productKeyID: string | null) => {
  const url = `${Base_URL}/product/getProductLookupList?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
