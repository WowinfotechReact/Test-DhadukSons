import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// OrderApi.ts
export interface AddCartParams {
  cartKeyID: string | null;
  userKeyID: string;
  productKeyID: string;
  productSizeKeyID: string;
  quantity: number;
}

export const addToCartApi = async (params: AddCartParams) => {
  const url = `${Base_URL}/cart/addToCart`;
  return await postApiWithAuthorization(url, params);
};


export const deleteCartProduct = async (cartKeyID: string) => {
  const url = `${Base_URL}/cart/deleteCartProduct?cartKeyID=${cartKeyID}`;
  const res = await getApiWithAuthorization(url);
  return res;
};



export const getCartDetails = async (userKeyID: string) => {
  const url = `${Base_URL}/cart/getCartDetails?userKeyID=${userKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};



