import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCartDetails,
  deleteCartProduct,
  AddCartParams,
  addToCartApi,
} from "../../APIServices/AddToCart/AddToCartApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useAuth } from "../../Context/Context";
import { NavItem } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
// import _default from './../../../node_modules/@paypal/react-paypal-js/dist/cjs/stories/venmo/VenmoButton.stories.d';

interface OrderItem {
  cartKeyID?: string;
  userKeyID: string;
  ProductKeyID: string;
  productTitle: string;
  ProductSizeKeyID: string;
  ProductSize: string;
  productUnitName: string;
  quantity: number;
  productPrice: string; // original price
  productPriceUSD: string; // original price
  productDiscount?: string; // percentage
  productDiscountUSD?: string; // percentage
  totalPrice?: string; // before discount
  totalDiscount?: string; // discount amount
  finalPrice?: string; // after discount
  productImage?: string;
}

const CartPageContent = () => {
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [colSpan, setColSpan] = useState(9);

  const storedUser = localStorage.getItem("Userlogin");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const { setIsAddUpdateCartDone, geoLocation } = useAuth();
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleCheckout = (e: any) => {
    debugger;
    e.preventDefault();

    const updatedOrderItems = orderItems.map((item) => ({
      ...item,
      finalPrice: Number(totalPrice - totalDiscountAmount) + Number(shipping), // replace the key you want
    }));

    const checkoutData = {
      cartItems: updatedOrderItems,
      subtotal, // already from API
      shipping, // already from API
      total, // already from API
      totalQuantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
    };

    // Save in localStorage
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Navigate with state
    navigate("/checkout", {
      state: checkoutData,
    });
  };

  const fetchOrderDetails = async () => {
    try {
      if (!userKeyID) {
        toast.error("User not logged in");
        return;
      }

      const res = await getCartDetails(userKeyID);

      if (res?.statusCode === 200 && res.responseData?.data?.cartItems) {
        const { cartItems, cartSummary } = res.responseData.data;
        setOrderItems(cartItems);
        setSubtotal(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.finalPayableAmount || "0")
            : parseFloat(cartSummary?.finalPayableAmountUSD || "0")
        );
        // setSubtotal(parseFloat(cartSummary?.finalPayableAmount || "0"));
        setTotalPrice(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.totalAmount || "0")
            : parseFloat(cartSummary?.totalAmountUSD || "0")
        );
        setTotalDiscountAmount(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.totalDiscountAmount || "0")
            : parseFloat(cartSummary?.totalDiscountAmountUSD || "0")
        );
        // setTotal(parseFloat(cartSummary?.finalPayableAmount || "0"));
        setTotal(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.totalDiscountAmount || "0")
            : parseFloat(cartSummary?.totalDiscountAmountUSD || "0")
        );
        setShipping(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.shippingCharge || "0")
            : 0
        );

        const productCount = cartItems.reduce(
          (sum: number, item: OrderItem) => sum + item.quantity,
          0
        );
        localStorage.setItem("cartCount", productCount.toString());
      } else {
        toast.error(res?.errorMessage || "Failed to fetch order details");
        localStorage.setItem("cartCount", "0");
      }
    } catch {
      toast.error("Something went wrong while fetching orders");
      localStorage.setItem("cartCount", "0");
    }
  };

  const handleQuantityChange = async (item: OrderItem, newQty: number) => {
    // debugger;
    if (newQty <= 0) {
      await handleDelete(item.cartKeyID ?? "");
      return;
    }

    // Update quantity locally
    setOrderItems((prev) =>
      prev.map((i) =>
        i.cartKeyID === item.cartKeyID ? { ...i, quantity: newQty } : i
      )
    );

    try {
      if (!userKeyID) {
        toast.error("User not logged in");
        return;
      }

      const payload: AddCartParams = {
        cartKeyID: item.cartKeyID ?? null,
        userKeyID: userKeyID,
        productKeyID: item.ProductKeyID,
        productSizeKeyID: item.ProductSizeKeyID,
        quantity: newQty,
      };

      const res = await addToCartApi(payload);

      if (res?.statusCode === 200) {
        dispatch(
          addToCart({
            id: Number(item.ProductKeyID),
            title: item.productTitle,
            price: parseFloat(item.finalPrice ?? item.productPrice),
            thumb: item.productImage || "/assets/img/products/default.png",
            quantity: newQty,
          })
        );
        setIsAddUpdateCartDone(true);
        toast.success("Cart updated");
        fetchOrderDetails();

        // ❌ Remove fetchOrderDetails() here
      } else {
        toast.error(res?.errorMessage || "Failed to update quantity");
      }
    } catch {
      toast.error("Error updating quantity");
    }
  };

  const handleDelete = async (cartKeyID?: string) => {
    if (!cartKeyID) return;
    try {
      const res = await deleteCartProduct(cartKeyID);
      if (res?.statusCode === 200) {
        toast.success("Product removed");
        setIsAddUpdateCartDone(true);

        setOrderItems((prev) =>
          prev.filter((item) => item.cartKeyID !== cartKeyID)
        );

        const updatedCount = orderItems
          .filter((item) => item.cartKeyID !== cartKeyID)
          .reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", updatedCount.toString());

        fetchOrderDetails();
      } else {
        toast.error(res?.message || "Failed to remove product");
      }
    } catch {
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    const updateColSpan = () => {
      setColSpan(window.innerWidth <= 768 ? 1 : 9); // mobile ≤768px
    };

    updateColSpan(); // set on mount
    window.addEventListener("resize", updateColSpan);

    return () => window.removeEventListener("resize", updateColSpan);
  }, []);

  return (
    <>
      <Helmet>
        <script>
          {`
      if (window.fbq && ${orderItems?.length > 0}) {
        fbq('track', 'AddToCart', {
          content_ids: ${JSON.stringify(orderItems?.map(item => item.ProductKeyID))},
          content_name: 'Cart Items',
          content_type: 'product',
          value: ${orderItems?.reduce(
            (sum, item) => sum + Number(item.finalPrice || 0),
            0
          )},
          currency: 'INR',
          contents: ${JSON.stringify(
            orderItems?.map(item => ({
              id: item.ProductKeyID,
              quantity: item.quantity,
              item_price: Number(item.productPrice)
            }))
          )}
        });
      }
    `}
        </script>
      </Helmet>

      <div className="cart-page default-padding overflow-hidden">
        <div className="container">
          {orderItems.length === 0 ? (
            <div className="text-center my-5">
              <p>Your cart is empty.</p>
              <button className="" onClick={() => navigate("/products")}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items Table */}
              <div className="col-lg-9">
                <div className="shop-cart-info">
                  <form className="woocommerce-cart-form">
                    <div className="table-responsive">
                      <table className="shop-cart-table table table-bordered">
                        <thead>
                          <tr style={{ fontSize: "15px", whiteSpace: "nowrap" }}>
                            <th className="text-center">Sr.no</th>
                            <th className="text-center">Product Image</th>
                            <th className="text-center">Product Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Discounted Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Product Size</th>
                            <th className="text-center">Subtotal</th>
                            <th className="text-center">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={item.cartKeyID ?? index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={
                                    item.productImage ||
                                    `/assets/img/products/default.jpg`
                                  }
                                  alt={item.productTitle}
                                  style={{ width: "50px" }}
                                />
                              </td>
                              <td>{item.productTitle}</td>
                              <td>
                                {geoLocation?.currency_code === "INR"
                                  ? `₹${item.productPrice}`
                                  : `$${item.productPriceUSD}`}
                              </td>
                              {/* <td>{(item.productPrice)-(item.productPrice*(item.productDiscount/100)}</td> */}
                              <td>
                                {geoLocation?.currency_code === "INR"
                                  ? `₹${(
                                    Number(item.productPrice) -
                                    (Number(item.productPrice) *
                                      Number(item.productDiscount)) /
                                    100
                                  ).toFixed(2)}`
                                  : `$${(
                                    Number(item.productPriceUSD) -
                                    (Number(item.productPriceUSD) *
                                      Number(item.productDiscountUSD)) /
                                    100
                                  ).toFixed(2)}`}
                              </td>

                              <td className="product-quantity">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item,
                                        item.quantity - 1
                                      )
                                    }
                                    style={{
                                      padding: "5px 10px",
                                      border: "1px solid #ccc",
                                      background: "#f0f0f0",
                                      cursor: "pointer",
                                    }}
                                  >
                                    –
                                  </button>
                                  <span
                                    style={{
                                      minWidth: "30px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item,
                                        item.quantity + 1
                                      )
                                    }
                                    style={{
                                      padding: "5px 10px",
                                      border: "1px solid #ccc",
                                      background: "#f0f0f0",
                                      cursor: "pointer",
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>
                                {item.ProductSize} {item.productUnitName}
                              </td>
                              {/* <td>
                            {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                            {Number(totalPrice - totalDiscountAmount).toFixed(
                              2
                            )}
                          </td> */}
                              <td>
                                {geoLocation?.currency_code === "INR"
                                  ? `₹${(
                                    (Number(item.productPrice) -
                                      (Number(item.productPrice) *
                                        Number(item.productDiscount)) /
                                      100) *
                                    item.quantity
                                  ).toFixed(2)}`
                                  : `$${(
                                    (Number(item.productPriceUSD) -
                                      (Number(item.productPriceUSD) *
                                        Number(item.productDiscountUSD)) /
                                      100) *
                                    item.quantity
                                  ).toFixed(2)}`}
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "none",
                                }}
                              >
                                <Link
                                  to="#"
                                  className="remove"
                                  onClick={() => handleDelete(item.cartKeyID)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={colSpan} className="text-end">
                              <button
                                onClick={handleCheckout}
                                style={{
                                  padding: "10px 30px",
                                  marginLeft: "20px",

                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                Checkout
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>

              {/* Cart Totals Table */}
              <div className="col-lg-3">
                <div className="shop-cart-totals">
                  {/* <h2>Cart Total</h2> */}
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Total Quantity</th>
                        <td>
                          {orderItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Price</th>
                        <td>
                          {" "}
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {totalPrice.toFixed(2)}
                        </td>
                      </tr>
                      {totalDiscountAmount > 0 && (
                        <tr>
                          <th>Discount</th>
                          <td>
                            {totalDiscountAmount > 0
                              ? `-${geoLocation?.currency_code === "INR" ? "₹" : "$"
                              }${totalDiscountAmount.toFixed(2)}`
                              : totalDiscountAmount.toFixed(2)}
                          </td>
                        </tr>
                      )}

                      <tr>
                        <th>Subtotal</th>
                        <td>
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {Number(totalPrice - totalDiscountAmount).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>Shipping Charges</th>
                        <td>
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {shipping.toFixed(2)}
                        </td>
                      </tr>

                      <tr>
                        <th>Grand Total</th>
                        <td>
                          {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                          {(
                            Number(totalPrice - totalDiscountAmount) +
                            Number(shipping)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPageContent;
