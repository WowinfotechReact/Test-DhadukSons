import { getApiWithAuthorization } from "../APIServices/APIServices/APIServices";
import { Base_URL } from "../components/Base_URL";

export const GetOrderListByUser = async (userKeyID: string) => {
  const url = `${Base_URL}/order/getOrderDetails?userKeyID=${userKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
