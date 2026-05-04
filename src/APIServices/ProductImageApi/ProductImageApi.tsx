import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces
interface GetImageParams {
  pageNo: number | null;
  pageSize: number | null;
  searchKeyWord?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}

interface AddBannerParams {
  bannerKeyID: string | null;
  bannerTitle: string;
  bannerSubTitle: string;
  bannerImage: string;
  status: string;
}



export const getAllProductImageByProductID = async (productKeyID: String) => {
  const url = `${Base_URL}/productImage/getAllProductImageByProductID?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const addUpdateProductImage = async (params: AddBannerParams) => {
  const url = `${Base_URL}/productImage/addUpdateProductImage`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getProductImage = async (productImageKeyID: String) => {
  const url = `${Base_URL}/productImage/getProductImage?productImageKeyID=${productImageKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
