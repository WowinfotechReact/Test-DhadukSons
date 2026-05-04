import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// interfaces






export const dashboardCount = async () => {
  const url = `${Base_URL}/dashboard/dashboardCount`;
  const res = await getApiWithAuthorization(url);

  return res;
};





