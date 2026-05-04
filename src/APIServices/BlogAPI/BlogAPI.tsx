import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  getApiWithoutAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces
interface GetBlogParams {
  pageNo: number | null;
  pageSize: number | null;
  searchKeyWord?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}

interface AddBlogParams {
  blogKeyID: string | null;
  title: string;
  featureImage: string;
  blogDescription: string;
  status: string;
}

export const GetAllBlogs = async (params: GetBlogParams) => {
  const url = `${Base_URL}/blog/getAllBlogData`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};
export const GetAllBlogsWeb = async (params: GetBlogParams) => {
  const url = `${Base_URL}/blog/getAllBlogDataWeb`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateBlogAPI = async (params: AddBlogParams) => {
  const url = `${Base_URL}/blog/addupdateBlog`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getBlogByIDAPI = async (blogKeyID: string | undefined) => {
  const url = `${Base_URL}/blog/getBlogByID?blogKeyID=${blogKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const getBlogByIDAPIWeb = async (blogKeyID: string | undefined) => {
  const url = `${Base_URL}/blog/getBlogByIDWeb?blogKeyID=${blogKeyID}`;
  const res = await getApiWithoutAuthorization(url);

  return res;
};
export const getBlogBySlugAPIWeb = async (slug: string | undefined) => {
  const url = `${Base_URL}/blog/get-blog-by-slug?slug=${slug}`;
  const res = await getApiWithoutAuthorization(url);

  return res;
};

export const changeBlogStatusAPI = async (blogKeyID: string | null) => {
  const url = `${Base_URL}/blog/changeBlogStatus?blogKeyID=${blogKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
