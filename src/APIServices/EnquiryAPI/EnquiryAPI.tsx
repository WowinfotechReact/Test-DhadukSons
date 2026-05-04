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

interface AddEnquiryParams {
  enquiryKeyID: null;
  firstName: "";
  lastName: "";
  phoneNumber: "";
  email: "";
  message: "";
}

export const GetAllEnquiriesAPI = async (params: GetAdminsParams) => {
  const url = `${Base_URL}/enquiry/getAllEnquiries`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const addUpdateEnquiryAPI = async (params: AddEnquiryParams) => {
  const url = `${Base_URL}/enquiry/addUpdateEnquiry`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};

export const getEnquiryByIDAPI = async (enquiryKeyID: string) => {
  const url = `${Base_URL}/enquiry/getSingleEnquiry?enquiryKeyID=${enquiryKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};

export const changeEnquiryStatusAPI = async (enquiryKeyID: string | null) => {
  const url = `${Base_URL}/enquiry/changeEnquiryStatus?enquiryKeyID=${enquiryKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
