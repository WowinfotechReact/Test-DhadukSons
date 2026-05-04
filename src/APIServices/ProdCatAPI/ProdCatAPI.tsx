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
  productCatKeyID: string;
  productCatName: string;
  status: string;
}

export const GetAllProdCat = async (params: GetProdCatParams) => {
  const url = `${Base_URL}/productCat/getAllProductCat`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateProdCatAPI = async (params: AddProdCatParams) => {
  const url = `${Base_URL}/productCat/addUpdate-productCat`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getProdCatByIDAPI = async (productCatKeyID: String) => {
  const url = `${Base_URL}/productCat/getProductCatByID?productCatKeyID=${productCatKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
