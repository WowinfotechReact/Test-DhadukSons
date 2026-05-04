import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces
interface GetProdCatParams {
  pageNo: number | null;
  pageSize: number | null;
  searchKeyWord?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}

interface AddProdCatParams {
  productUnitKeyID: string;
  productCatName: string;
  status: string;
}

export const getAllProductUnit = async (params: GetProdCatParams) => {
  const url = `${Base_URL}/productUnit/getAllProductUnit`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateProductUnit = async (params: AddProdCatParams) => {
  const url = `${Base_URL}/productUnit/addUpdateProductUnit`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getProductUnitDetails = async (productUnitKeyID: String) => {
  const url = `${Base_URL}/productUnit/getProductUnitDetails?productUnitKeyID=${productUnitKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};


export const changeProductUnitStatus = async (productUnitKeyID: string | null) => {
  const url = `${Base_URL}/productUnit/changeProductUnitStatus?productUnitKeyID=${productUnitKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const deleteProductUnit = async (productUnitKeyID: string | null) => {
  const url = `${Base_URL}/productUnit/deleteProductUnit?productUnitKeyID=${productUnitKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const unitLookupList = async (productUnitKeyID: string | null) => {
  const url = `${Base_URL}/productUnit/unitLookupList?productUnitKeyID=${productUnitKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
