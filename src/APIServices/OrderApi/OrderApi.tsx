import { Base_URL } from "../../components/Base_URL";
import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices";

// OrderApi.ts
export interface PlaceOrderParams {
  userKeyID: string;
  orderAddress: string;
  email?: string; // optional email field
  lastName?: string; // optional last name field
  firstName?: string; // optional first name field
  currency_code?: string;
  cartItems: {
    cartKeyID: string;
    userKeyID: string;
    ProductKeyID: string;
    productTitle: string;
    productSizeKeyID: string;
    ProductSize: string;
    productUnitKeyID: string;
    productUnitName: string;
    productPrice: string; // original price per unit (before discount)
    productDiscount: string; // discount percentage
    quantity: number;
    totalPrice: string; // total before discount (productPrice * quantity)
    totalDiscount: string; // total discount amount
    finalPrice: string; // total after discount
    productImage?: string; // image may be missing → optional
  }[];
  paymentMethod?: string;
  paypalOrderID?: string; // optional PayPal order ID

  // Razorpay
  paymentId?: string;
  orderId?: string;
  signature?: string;
}

// Place Order
export const placeOrder = async (params: PlaceOrderParams) => {
  const url = `${Base_URL}/order/placeOrder`;
  const res = await postApiWithAuthorization(url, params);
  return res;
};

// Get order list (with params)
export const getOrderList = async (params: {
  pageNo: number;
  pageSize: number;
  searchKeyWord: string | null;
}) => {
  const url = `${Base_URL}/order/getOrderList`;
  const res = await postApiWithAuthorization(url, params); // ✅ post with body
  return res;
};

// Change order status
export const changeOrderStatus = async (orderKeyID: string, status: string) => {
  const url = `${Base_URL}/order/changeOrderStatus`;
  const res = await postApiWithAuthorization(url, { orderKeyID, status }); // ✅ send body
  return res;
};

// Get order details by User Key
export const getOrderDetails = async (userKeyID: string) => {
  const url = `${Base_URL}/order/getOrderDetails?userKeyID=${userKeyID}`;
  const res = await getApiWithAuthorization(url);
  return res;
};

// Get order details by Order Key
export const getOrderDetailsByKeyID = async (orderKeyID: string) => {
  const url = `${Base_URL}/order/getOrderDetailsByKeyID?orderKeyID=${orderKeyID}`;
  const res = await getApiWithAuthorization(url);
  return res;
};
