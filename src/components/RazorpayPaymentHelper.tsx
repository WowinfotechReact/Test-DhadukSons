import axios from "axios";
// import {
//   BaseUrl,
//   RazorPayKey,
//   RazorPayName,
//   RazorPaySecretKey,
// } from "../../BaseUrl/BaseUrl";
import { Base_URL, RazorPaySecretKey, RazorPayKey } from "./Base_URL";
import Mylogo from "../../assets/images/new/newLogo.jpg";

// ---- Types ----
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface VerifyPaymentParams extends RazorpayResponse {
  userID: string | null;
  orderID: string;
  amount: number;
}

interface VerifyPaymentResult {
  status: number;
  razorpay_payment_id?: string;
}

// Razorpay window type
declare global {
  interface Window {
    Razorpay: any;
  }
}

const getUserId = (): string | null => localStorage.getItem("userID");

const generateReceiptId = (): string => `rcpt_${new Date().getTime()}`;

const createRazorpayOrder = async (
  amount: number,
  receiptID: string
): Promise<string> => {
  const response = await axios.post(`${Base_URL}/razorpay/create-Dev-order`, {
    amount,
    receipt: receiptID,
  });
  return response?.data?.orderId as string;
};

const verifyRazorpayPayment = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  userID,
  orderID,
  amount,
}: VerifyPaymentParams): Promise<VerifyPaymentResult> => {
  try {
    const res = await axios.post(`${Base_URL}/razorpay/verify-Dev-payment`, {
      USER_ID: userID,
      ORDER_ID: orderID,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      paymentAmount: amount,
    });

    return res.data.status === "success"
      ? { status: 1, razorpay_payment_id }
      : { status: 0 };
  } catch (error) {
    console.error("Payment verification error", error);
    throw error;
  }
};

const openRazorpayPopup = (options: any): void => {
  const rzp = new window.Razorpay(options);
  rzp.open();
};

export const handleProceedRemainingPayment = async (
  Remaining_Amount: number
): Promise<VerifyPaymentResult> => {
  const userID = getUserId();

  if (Remaining_Amount === 0) {
    alert("All the amount already paid");
    return { status: 0 };
  }

  const receiptID = generateReceiptId();
  const orderID = await createRazorpayOrder(Remaining_Amount, receiptID);

  return new Promise((resolve) => {
    const options: any = {
      key: RazorPayKey,
      key_secret: RazorPaySecretKey,
      amount: Remaining_Amount * 100,
      currency: "INR",
      name: "RazorPayName",
      description: "Remaining Payment",
      image: Mylogo,
      order_id: orderID,
      handler: async function (response: RazorpayResponse) {
        const result = await verifyRazorpayPayment({
          ...response,
          userID,
          orderID,
          amount: Remaining_Amount,
        });
        resolve(result);
      },
      modal: {
        ondismiss: () => {
          console.warn("User closed Razorpay modal");
          resolve({ status: 0 });
        },
      },
      theme: {
        color: "#ff416c",
      },
    };

    openRazorpayPopup(options);
  });
};
