import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  placeOrder,
  PlaceOrderParams,
} from "../../APIServices/OrderApi/OrderApi";
import { getCartDetails } from "../../APIServices/AddToCart/AddToCartApi";
import axios from "axios";
import { Base_URL, RazorPayKey } from "../Base_URL";
import CustomSelect from "../select/CustomSelect";
import { handleProceedRemainingPayment } from "../RazorpayPaymentHelper";
import { useAuth, useLoader } from "../../Context/Context";
import SuccessPopUP from "../SuccessPopUp";
import MySelect, { OptionType } from "../ReactSelector";
import { Button, Collapse, Dropdown, Table } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getUserProfile } from "../../APIServices/UserLoginApi/UserLoginApi";
import { toast } from "react-toastify";

const CheckoutContent = () => {
  interface CartItem {
    cartKeyID: string;
    userKeyID: string;
    ProductKeyID: string;
    productTitle: string;
    productSizeKeyID: string;
    ProductSize: string;
    productUnitKeyID: string;
    productUnitName: string;
    productPrice: string;
    productPriceUSD: string;
    productDiscount: string;
    quantity: number;
    totalPrice: string;
    totalDiscount: string;
    finalPrice: string;
    productImage?: string;
  }
  interface CartSummary {
    totalAmount?: string;
    totalDiscountAmount?: string;
    totalDiscountAmountUSD?: string;
    finalPayableAmount?: string;
    finalPayableAmountUSD?: string;
    shippingCharge?: number;
  }

  const persons = [
    { value: 1, label: "India" },
    { value: 2, label: "United States" },
    { value: 3, label: "United Kingdom" },
    { value: 4, label: "Canada" },
  ];

  const location = useLocation();
  const { geoLocation } = useAuth();
  const [showTable, setShowTable] = useState(false);
  const [open, setOpen] = useState(false);
  const { setLoader } = useLoader();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>({});
  const [total, setTotal] = useState(0);
  // const [totalQuantity, setTotalQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const storedUser = localStorage.getItem("Userlogin");
  const navigate = useNavigate();
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    phoneNumber: "",
    email: "",
  });
  // ✅ Load checkout data
  useEffect(() => {
    const initCheckout = async () => {
      // debugger;
      if (location.state?.cartItems) {
        const { cartItems, total, shipping } = location.state;
        setCartItems(cartItems);
        setShippingCharges(shipping);
        setTotal(total);
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({ cartItems, total }),
        );
        // return;
      }

      const storedCheckout = localStorage.getItem("checkoutData");
      if (storedCheckout) {
        const parsed = JSON.parse(storedCheckout);
        setCartItems(parsed.cartItems || []);
        setTotal(parsed.total || 0);
        return;
      }

      if (userKeyID) {
        const res = await getCartDetails(userKeyID);
        if (res?.statusCode === 200 && res.responseData?.data) {
          const { cartItems, cartSummary } = res.responseData.data;
          setCartItems(cartItems);
          setCartSummary(cartSummary);
          setTotal(parseFloat(cartSummary?.finalPayableAmount || "0"));
          setDiscount(parseFloat(cartSummary?.totalDiscountAmount || "0"));
          setShippingCharges(
            geoLocation?.currency_code === "INR"
              ? parseFloat(cartSummary?.shippingCharge || "0")
              : 0,
          );
        }
      }
    };

    initCheckout();
  }, [location.state, userKeyID]);

  useEffect(() => {
    GetCardDetails();
  }, [location.state, userKeyID]);

  useEffect(() => {
    fetchProfile(userKeyID);
  }, [location.state, userKeyID]);

  // ✅ Capture order if redirected back from PayPal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paypalToken = params.get("token");
    const payerID = params.get("PayerID");

    if (paypalToken && payerID) {
      // ✅ Automatically capture order
      capturePayPalOrder(paypalToken);
    }
  }, [location.search]);

  const capturePayPalOrder = async (orderID: string) => {
    const savedCheckoutData = localStorage.getItem("checkoutData");
    const { userKeyID, cartItems, billingDetails } = savedCheckoutData
      ? JSON.parse(savedCheckoutData)
      : { userKeyID: "", cartItems: [], billingDetails: {} };
    try {
      const { data: captured } = await axios.post(
        `${Base_URL}/paypal/capture-order/${orderID}`,
      );

      console.log("✅ PayPal Payment Captured:", captured);

      // Here you save order to DB
      const payload: PlaceOrderParams = {
        orderAddress: "Customer billing address",
        userKeyID,
        cartItems,
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        email: billingDetails.email,
        currency_code: geoLocation?.currency_code,
        paymentMethod: "PayPal",
      };

      await placeOrder(payload);
      // setShowPopup(true);
      localStorage.removeItem("checkoutData"); // cleanup
      setShowPaymentSuccessPopup(true);

      // Clear query params from URL
      navigate("/checkout", { replace: true });
    } catch (error: any) {
      console.error("❌ PayPal Capture Failed:", error);
      alert("Payment capture failed. Please contact support.");
    }
  };

  const fetchProfile = async (id: string) => {
    try {
      const profile = await getUserProfile({ userKeyID: id }); // Pass ID to API
      if (profile?.statusCode === 200) {
        setBillingDetails((prev) => ({
          ...prev,
          firstName: profile.responseData.data.FirstName,
          lastName: profile.responseData.data.LastName,
          email: profile.responseData.data.Email,
          phoneNumber: profile.responseData.data.Phone,
          address: profile.responseData.data.Address,
        }));
      } else {
        toast.error(profile?.errorMessage || "Failed to load profile");
      }
    } catch (err) {
      toast.error("Something went wrong loading profile");
    }
  };

  const GetCardDetails = async () => {
    // debugger;
    try {
      const res = await getCartDetails(userKeyID);
      const AllCartItems = res.responseData.data.cartItems;
      const CartSummary = res.responseData.data.cartSummary;

      setCartSummary(CartSummary);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("cartSummary", cartSummary);

  const shipping = 0;
  const computedTotal =
    geoLocation?.currency_code === "INR"
      ? Number(cartSummary.finalPayableAmount) //Removed Shipping charges from here INR.
      : Number(cartSummary.finalPayableAmountUSD); //Removed Shipping charges from here.

  // ✅ Handle PayPal Payment via Backend API
  // const handlePayPalCheckout = async () => {
  //   // debugger;
  //   let isValid = false;
  //   if (
  //     billingDetails.firstName === null ||
  //     billingDetails.firstName === "" ||
  //     billingDetails.firstName === undefined ||
  //     billingDetails.lastName === null ||
  //     billingDetails.lastName === "" ||
  //     billingDetails.lastName === undefined ||
  //     billingDetails.address === null ||
  //     billingDetails.address === "" ||
  //     billingDetails.address === undefined ||
  //     billingDetails.state === null ||
  //     billingDetails.state === "" ||
  //     billingDetails.state === undefined ||
  //     billingDetails.city === null ||
  //     billingDetails.city === "" ||
  //     billingDetails.city === undefined ||
  //     billingDetails.postCode === null ||
  //     billingDetails.postCode === "" ||
  //     billingDetails.postCode === undefined ||
  //     billingDetails.email === null ||
  //     billingDetails.email === "" ||
  //     billingDetails.email === undefined
  //   ) {
  //     isValid = true;
  //     setError(true);
  //   } else if (billingDetails.email && !isValidEmail(billingDetails.email)) {
  //     isValid = true;
  //     setError(true);
  //   } else if (
  //     billingDetails.phoneNumber !== "" &&
  //     billingDetails.phoneNumber.length < 10
  //   ) {
  //     isValid = true;
  //     setError(true);
  //   }
  //   if (isValid) {
  //     return;
  //   }
  //   try {
  //     // 1. Create PayPal order
  //     const { data: order } = await axios.post(
  //       `${Base_URL}/paypal/create-order`,
  //       {
  //         amount: computedTotal.toFixed(2), // ✅ sending dynamic amount
  //       }
  //     );

  //     const orderID = order.id;
  //     console.log("🆕 PayPal Order Created:", orderID);

  //     // 2. Redirect user to PayPal approval page (before capture)
  //     const approveLink = order.links.find(
  //       (l: any) => l.rel === "approve"
  //     )?.href;
  //     if (approveLink) {
  //       window.location.href = approveLink; // ✅ redirect for approval
  //       return;
  //     }

  //     // (Optional) if you auto-capture without redirect:
  //     const { data: captured } = await axios.post(
  //       `${Base_URL}/paypal/capture-order/${orderID}`
  //     );
  //     console.log("✅ PayPal Order Captured:", captured);

  //     // 3. Save order in DB
  //     const orderAddress = "Customer billing address";
  //     const payload: PlaceOrderParams = {
  //       orderAddress,
  //       userKeyID,
  //       cartItems,
  //       firstName: billingDetails.firstName,
  //       lastName: billingDetails.lastName,
  //       email: billingDetails.email,
  //       paymentMethod: "PayPal",
  //     };

  //     await placeOrder(payload);
  //     setShowPopup(true);
  //   } catch (error: any) {
  //     console.error(
  //       "❌ PayPal Checkout Failed:",
  //       error.response?.data || error.message
  //     );
  //     alert("Payment failed. Please try again.");
  //   }
  // };

  const handlePayPalCheckout = async () => {
    let isValid = false;

    // 🔎 Validate billing details
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.address ||
      !billingDetails.state ||
      !billingDetails.city ||
      !billingDetails.postCode ||
      !billingDetails.email
    ) {
      isValid = true;
      setError(true);
    } else if (billingDetails.email && !isValidEmail(billingDetails.email)) {
      isValid = true;
      setError(true);
    } else if (
      billingDetails.phoneNumber !== "" &&
      billingDetails.phoneNumber.length < 10
    ) {
      isValid = true;
      setError(true);
    }

    if (isValid) return;

    try {
      // 1. Create PayPal order
      const { data: order } = await axios.post(
        `${Base_URL}/paypal/create-order`,
        { amount: computedTotal.toFixed(2) },
      );

      const orderID = order.id;
      console.log("🆕 PayPal Order Created:", orderID);

      // 2. Redirect user to PayPal approval page
      // const approveLink = order.links.find(
      //   (l: any) => l.rel === "approve"
      // )?.href;
      // if (approveLink) {
      //   window.location.href = approveLink;
      // }

      const approveLink = order.links.find(
        (l: any) => l.rel === "approve",
      )?.href;
      if (approveLink) {
        // Save important data before leaving the page
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            userKeyID,
            cartItems,
            billingDetails,
          }),
        );

        window.location.href = approveLink;
        return;
      }
    } catch (error: any) {
      console.error(
        "❌ PayPal Checkout Failed:",
        error.response?.data || error.message,
      );
      alert("Payment failed. Please try again.");
    }
  };

  const handleRazorpayPayment = async () => {
    // alert("Razorpay");
    let isValid = false;
    if (
      billingDetails.firstName === null ||
      billingDetails.firstName === "" ||
      billingDetails.firstName === undefined ||
      billingDetails.lastName === null ||
      billingDetails.lastName === "" ||
      billingDetails.lastName === undefined ||
      billingDetails.address === null ||
      billingDetails.address === "" ||
      billingDetails.address === undefined ||
      billingDetails.state === null ||
      billingDetails.state === "" ||
      billingDetails.state === undefined ||
      billingDetails.city === null ||
      billingDetails.city === "" ||
      billingDetails.city === undefined ||
      billingDetails.postCode === null ||
      billingDetails.postCode === "" ||
      billingDetails.postCode === undefined ||
      billingDetails.email === null ||
      billingDetails.email === "" ||
      billingDetails.email === undefined
    ) {
      isValid = true;
      setError(true);
    } else if (billingDetails.email && !isValidEmail(billingDetails.email)) {
      isValid = true;
      setError(true);
    } else if (
      billingDetails.phoneNumber !== "" &&
      billingDetails.phoneNumber.length < 10
    ) {
      isValid = true;
      setError(true);
    }
    if (isValid) {
      return;
    }
    try {
      // 1️⃣ Call backend to create an order
      // const { data } = await axios.post("http://localhost:5000/create-order", {
      //   amount: 500, // INR (₹500)
      // });
      const orderAddress = `${billingDetails.address}, ${billingDetails.city}, ${billingDetails.state}, ${billingDetails.postCode}`;

      const options = {
        key: RazorPayKey, // put test key from Razorpay dashboard
        amount: Math.round(computedTotal * 100),
        currency: "INR",
        name: "Dhaduk and Sons",
        description: "Test Transaction",
        // order_id: 1,
        handler: async function (response: any) {
          console.log("Payment Success:", response);

          // 2️⃣ Call your place order API after payment
          const payload: PlaceOrderParams = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            orderAddress: orderAddress,
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            email: billingDetails.email,
            currency_code: geoLocation?.currency_code,
            userKeyID,
            cartItems,
          };
          const res = await placeOrder(payload);
          if (res.statusCode === 200) {
            setShowPaymentSuccessPopup(true);
          } else alert("Order Failed");
        },
        // prefill: {
        //   name: "Saurabh",
        //   email: "test@example.com",
        //   contact: "9876543210",
        // },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
    }
  };

  const handlePaymentGateway = () => {
    // debugger;
    if (geoLocation?.currency_code === "INR") {
      handleRazorpayPayment();
    } else {
      handlePayPalCheckout();
    }
    // console.log(billingDetails.countryCode);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onHide = () => {
    setShowPaymentSuccessPopup(false);
    navigate("/");
  };

  // Total's

  const totalPrice = cartItems.reduce<number>(
    (acc, item) =>
      geoLocation?.currency_code === "INR"
        ? acc + Number(item.productPrice) * Number(item.quantity)
        : acc + Number(item.productPriceUSD) * Number(item.quantity),
    0,
  );

  const totalQuantity = cartItems.reduce<number>(
    (acc: number, item: CartItem) => acc + Number(item.quantity),
    0,
  );

  // Discount sum
  const totalDiscount = cartItems.reduce<number>(
    (acc, item) => acc + Number(item.productDiscount),
    0,
  );

  // Subtotal (before discount)
  const subtotal = cartItems.reduce<number>(
    (acc, item) => acc + Number(item.productPrice) * item.quantity,
    0,
  );

  const options: OptionType[] = [
    { value: 1, label: "India" },
    { value: 2, label: "United States" },
    { value: 3, label: "United Kingdom" },
    { value: 4, label: "Canada" },
  ];

  console.log("selectedOption", totalPrice);

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Order Placed Successfully!</h4>
            <p>Thank you for your purchase. We will contact you soon.</p>
            <button onClick={() => setShowPopup(false)} className="popup-btn">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="checkout-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="dropdown" style={{ marginBottom: "10px" }}>
                <button
                  className="dropdown-toggle d-flex justify-content-between align-items-center w-100"
                  onClick={() => setOpen(!open)}
                  aria-controls="table-collapse"
                  aria-expanded={open}
                >
                  <span>{open ? "Hide Products" : "Show Products"}</span>
                  {open ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              <Collapse in={open}>
                <div id="table-collapse" className="mt-3">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr style={{ whiteSpace: "nowrap" }}>
                        <th>Sr No.</th>
                        <th>Product Name</th>
                        <th>Product Size</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.productTitle}</td>
                          <td>
                            {item.ProductSize}
                            {item.productUnitName}
                          </td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Collapse>
              <div className=" main-form">
                <h3>Billing details</h3>
                {/* 📝 keep all your form fields (name, address, etc.) */}
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="first-name">First name *</label>
                      <input
                        className="form-control"
                        id="first-name"
                        name="first-name"
                        value={billingDetails.firstName}
                        type="text"
                        placeholder="Enter your first name"
                        autoComplete="off"
                        maxLength={50}
                        onChange={(e) => {
                          let input = e.target.value;

                          // prevent first space
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }

                          // allow only alphabets (A-Z, a-z)
                          input = input.replace(/[^A-Za-z]/g, "");

                          setBillingDetails((prev) => ({
                            ...prev,
                            firstName: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.firstName === undefined ||
                        billingDetails.firstName === null ||
                        billingDetails.firstName === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="last-name">Last name *</label>
                      <input
                        className="form-control"
                        id="last-name"
                        name="last-name"
                        type="text"
                        value={billingDetails.lastName}
                        placeholder="Enter your last name"
                        maxLength={50}
                        autoComplete="off"
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          input = input.replace(/[^A-Za-z]/g, "");
                          setBillingDetails((prev) => ({
                            ...prev,
                            lastName: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.lastName === undefined ||
                        billingDetails.lastName === null ||
                        billingDetails.lastName === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="country">Country / Region</label>
                      <CustomSelect
                        options={options}
                        selectValue={1}
                        onChange={setSelectedOption}
                      />
                      {/* <MySelect
                            options={options}
                            value={selectedOption}
                            onChange={setSelectedOption}
                            placeholder="Select Country"
                            classNamePrefix="react-select"
                          /> */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="st-address">Street address *</label>
                      <input
                        className="form-control"
                        id="st-address"
                        name="st-address"
                        type="text"
                        value={billingDetails.address}
                        placeholder="House number and street name"
                        autoComplete="off"
                        maxLength={250}
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          setBillingDetails((prev) => ({
                            ...prev,
                            address: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.address === undefined ||
                        billingDetails.address === null ||
                        billingDetails.address === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="st-country">State*</label>
                      <input
                        className="form-control"
                        id="st-country"
                        name="st-country"
                        type="text"
                        value={billingDetails.state}
                        placeholder="Enter your state"
                        maxLength={50}
                        autoComplete="off"
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          input = input.replace(/[^A-Za-z]/g, "");
                          setBillingDetails((prev) => ({
                            ...prev,
                            state: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.state === undefined ||
                        billingDetails.state === null ||
                        billingDetails.state === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="t-city">Town / City *</label>
                      <input
                        className="form-control"
                        id="t-city"
                        name="t-city"
                        type="text"
                        placeholder="Enter your city"
                        value={billingDetails.city}
                        maxLength={50}
                        autoComplete="off"
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          input = input.replace(/[^A-Za-z]/g, "");
                          setBillingDetails((prev) => ({
                            ...prev,
                            city: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.city === undefined ||
                        billingDetails.city === null ||
                        billingDetails.city === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="postcode">Postcode / ZIP *</label>
                      <input
                        className="form-control"
                        id="postcode"
                        name="postcode"
                        maxLength={6}
                        value={billingDetails.postCode}
                        type="text"
                        placeholder="Enter your postcode"
                        autoComplete="off"
                        onChange={(e) => {
                          let input = e.target.value;

                          // prevent first space
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }

                          // allow only digits
                          input = input.replace(/[^0-9]/g, "");

                          setBillingDetails((prev) => ({
                            ...prev,
                            postCode: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.postCode === undefined ||
                        billingDetails.postCode === null ||
                        billingDetails.postCode === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="phone">Phone (optional)</label>
                      <input
                        className="form-control"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter your phone number"
                        autoComplete="off"
                        value={billingDetails.phoneNumber}
                        maxLength={10}
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          input = input.replace(/[^0-9]/g, "");
                          setBillingDetails((prev) => ({
                            ...prev,
                            phoneNumber: input,
                          }));
                        }}
                      />
                      {error &&
                      billingDetails.phoneNumber &&
                      billingDetails.phoneNumber.length < 10 ? (
                        <span style={{ color: "red" }}>
                          Please enter valid phone number
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="email">Email address *</label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="text"
                        value={billingDetails.email}
                        placeholder="Enter your email address"
                        autoComplete="off"
                        maxLength={100}
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          setBillingDetails((prev) => ({
                            ...prev,
                            email: input,
                          }));
                        }}
                      />
                      {error &&
                      (billingDetails.email === undefined ||
                        billingDetails.email === null ||
                        billingDetails.email === "") ? (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      ) : billingDetails.email &&
                        !isValidEmail(billingDetails.email) ? (
                        <span style={{ color: "red" }}>
                          Please enter a valid email
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-4">
              <div className="shop-cart-totals mt-md-30 mt-xs-10">
                {/* <h2>Your order</h2> */}
                <div className="table-responsive table-bordered">
                  <table className="table">
                    {/* <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Subtotal</th>
                            </tr>
                          </thead> */}
                    <tbody>
                      <tr>
                        <th>Total Quantity</th>
                        <td>{totalQuantity}</td>
                      </tr>
                      <tr>
                        <th>Price</th>
                        <td>
                          {" "}
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {totalPrice.toFixed(2)}
                        </td>
                      </tr>
                      {Number(cartSummary.totalDiscountAmount) > 0 && (
                        <tr>
                          <th>Discount</th>
                          <td>
                            {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                            {geoLocation?.currency_code === "INR"
                              ? Number(cartSummary.totalDiscountAmount) > 0
                                ? `-${Number(
                                    cartSummary.totalDiscountAmount,
                                  ).toFixed(2)}`
                                : "0.00"
                              : Number(cartSummary.totalDiscountAmountUSD) > 0
                                ? `-${Number(
                                    cartSummary.totalDiscountAmountUSD,
                                  ).toFixed(2)}`
                                : "0.00"}
                          </td>
                        </tr>
                      )}

                      <tr>
                        <th>Subtotal</th>
                        <td>
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {geoLocation?.currency_code === "INR"
                            ? Number(cartSummary.finalPayableAmount).toFixed(2)
                            : Number(cartSummary.finalPayableAmountUSD).toFixed(
                                2,
                              )}
                        </td>
                      </tr>
                      <tr>
                        <th>Shipping Charges</th>
                        <td>
                          {" "}
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {shippingCharges.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>Grand Total</th>
                        <td>
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {geoLocation?.currency_code === "INR"
                            ? (
                                Number(cartSummary.finalPayableAmount) +
                                shippingCharges
                              ).toFixed(2)
                            : (
                                Number(cartSummary.finalPayableAmountUSD) +
                                shippingCharges
                              ).toFixed(2)}
                        </td>
                      </tr>
                      {/* {cartItems.map((item: CartItem) => (
                              <tr key={item.cartKeyID}>
                                <th>
                                  {item.productTitle} × {item.quantity}
                                </th>
                                <td>
                                  ₹
                                  {(
                                    parseFloat(item.productPrice) *
                                    item.quantity
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            ))} */}
                      {/* <tr>
                              <th>Shipping</th>
                              <td>{shippingCharges}</td>
                            </tr>
                            <tr>
                              <th>Discount</th>
                              <td>- ₹{discount.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <th>Total</th>
                              <td>₹{computedTotal.toFixed(2)}</td>
                            </tr> */}
                    </tbody>
                  </table>

                  {/* ✅ Replaced PayPal Button with custom checkout button */}
                  <button
                    type="button"
                    className="custom-button mt-3"
                    onClick={handlePaymentGateway}
                  >
                    Pay Now
                  </button>
                  {/* <button
                          type="button"
                          className=" custom-button w-100 mt-3"
                          onClick={handlePayPalCheckout}
                        >
                          Pay with PayPal
                        </button>
                        <button
                          type="button"
                          className="custom-button w-100 mt-3"
                          onClick={handleRazorpayPayment}
                        >
                          Pay with Razorpay
                        </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <SuccessPopUP
          show={showPaymentSuccessPopup}
          onHide={onHide}
          message="Payment Successful"
        />
      </div>
    </>
  );
};

export default CheckoutContent;
