import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces
interface GetBannersParams {
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

export const GetAllBanners = async (params: GetBannersParams) => {
  const url = `${Base_URL}/banner/getAllBanner`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const GetAllBannersWeb = async (params: GetBannersParams) => {
  const url = `${Base_URL}/banner/getAllBannerWeb`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateBannerAPI = async (params: AddBannerParams) => {
  const url = `${Base_URL}/banner/addUpdateBannerData`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getBannerByIDAPI = async (bannerKeyID: String) => {
  const url = `${Base_URL}/banner/getSingleBannerByID?bannerKeyID=${bannerKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const changeBannerStatusAPI = async (bannerKeyID: string | null) => {
  const url = `${Base_URL}/banner/changeBannerStatus?bannerKeyID=${bannerKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
