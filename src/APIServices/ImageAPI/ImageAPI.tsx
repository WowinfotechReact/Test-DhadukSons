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

export const GetAllImages = async (params: GetImageParams) => {
  const url = `${Base_URL}/image/getAllImages`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateImageAPI = async (params: AddBannerParams) => {
  const url = `${Base_URL}/image/addUpdateImage`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getImageByIDAPI = async (imageKeyID: String) => {
  const url = `${Base_URL}/image/getSingleImageByID?imageKeyID=${imageKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
