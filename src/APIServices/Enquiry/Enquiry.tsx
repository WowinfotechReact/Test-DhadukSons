import { Base_URL } from "../../components/Base_URL";
import { postApiWithoutAuthorization } from "../APIServices/APIServices";
import { EnquiryData } from "./EnquiryInteface";

export const addUpdateEnquiry = async (data: EnquiryData) => {
  const url = `${Base_URL}/enquiry/addUpdateEnquiryWeb`;
  const res = await postApiWithoutAuthorization(url, data);
  return res;
};
